import { useEffect, useState } from 'react'
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill'
import { getCookie } from '@/utils/cookie'

const SSE = () => {
  const [content, setContent] = useState('')
  const [eventId, setEventId] = useState('')

  const accessToken = getCookie('access_token')

  const EventSource = EventSourcePolyfill || NativeEventSource

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Connection: 'keep-alive',
          // Accept: 'text/event-stream',
        },
        heartbeatTimeout: 3600000,
      },
    )

    // 'sse' 이벤트 리스너를 추가
    eventSource.addEventListener('sse', (event) => {
      // CustomEventMap에 따라 event 타입을 지정
      const messageEvent = event as MessageEvent
      const { data, lastEventId } = messageEvent
      console.log(data)
      console.log(lastEventId)

      // data를 content 상태로 업데이트
      setContent(data || '')
      setEventId(lastEventId || '')

      // 특정 조건에 따른 처리
      // if (!data.includes('EventStream Created')) {
      //   console.log('SSE 실패');
      // }
    })

    return () => {
      eventSource.close()
    }
  }, [accessToken])
  return <div />
}

export default SSE
