import { useEffect, useState } from 'react'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import Popup from '../Popup/Popup'
import { getCookie } from '@/utils/cookie'

interface Notification {
  // id: string
  content: string
}

const SSE = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState('')

  const accessToken = getCookie('access_token')

  const handleNewNotification = (content: string) => {
    const newNotification: Notification = {
      // id: new Date().toISOString(), // 임시로 ID를 생성
      content,
    }
    setNotifications([newNotification, ...notifications])
    setPopupContent(content)
    if (content.substring(0, 5) !== 'Event') {
      setShowPopup(true)
    }
  }

  const EventSource = EventSourcePolyfill || NativeEventSource

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Connection: 'keep-alive',
          Accept: 'text/event-stream',
        },
        heartbeatTimeout: 3600000,
      },
    )

    eventSource.addEventListener('sse', (event) => {
      const messageEvent = event as MessageEvent
      const { data, lastEventId } = messageEvent
      handleNewNotification(data)
      console.log(lastEventId)
    })

    return () => {
      eventSource.close()
    }
  }, [accessToken])

  return (
    <div>
      {showPopup && (
        <Popup content={popupContent} onClose={() => setShowPopup(false)} />
      )}
    </div>
  )
}

export default SSE
