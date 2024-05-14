import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import s from './Notification.module.scss'
import {
  checkReadNotificationApi,
  getNotificationsApi,
} from '@/apis/notificationAxios'

interface NotificationType {
  id: number
  type: string
  content: string
  relatedId: number
  provider: ProviderType
  isRead: boolean
  createdAt: string
}

interface ProviderType {
  memberId: number
  nickname: string
  profileImg: string
}

interface NotificationProps {
  setIsNotReadNoti: (value: boolean) => void
  setIsNotificationOpen: (value: boolean) => void
}

const Notification = ({
  setIsNotReadNoti,
  setIsNotificationOpen,
}: NotificationProps) => {
  const [notifications, setNotifications] = useState<Array<NotificationType>>(
    [],
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNotificationsApi()
      // console.log('알림:', response)
      setNotifications(response)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (notifications.length === 0) {
      setIsNotReadNoti(false)
    } else {
      setIsNotReadNoti(true)
    }
  }, [notifications])
  const router = useRouter()

  const clickNotification = async (
    type: string,
    notificationId: number,
    noteId: number,
  ) => {
    // 알림 읽음 처리
    await checkReadNotificationApi(notificationId)
    console.log('clicked', type, notificationId, noteId)
    // 클릭시 알림 내용으로 이동
    if (type === 'HEART' || type === 'BOOKMARK' || type === 'REVIEW') {
      router.push(`/note/${noteId}`)
    } else if (type === 'NOTE') {
      router.push('/solvedproblems')
    } else if (type === 'REC') {
      router.push('/recommend')
    }

    setIsNotificationOpen(false)
  }

  const formatDate = (inputDateStr: string) => {
    const inputDate = new Date(inputDateStr)

    // 원하는 날짜 및 시간 포맷 설정
    const year = inputDate.getFullYear() // 연도(4자리)
    const month = String(inputDate.getMonth() + 1).padStart(2, '0') // 월(2자리, 0으로 패딩)
    const day = String(inputDate.getDate()).padStart(2, '0') // 일(2자리, 0으로 패딩)
    const hours = String(inputDate.getHours()).padStart(2, '0') // 시(2자리, 0으로 패딩)
    const minutes = String(inputDate.getMinutes()).padStart(2, '0') // 분(2자리, 0으로 패딩)

    // 포맷팅된 문자열 반환
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
  }

  return (
    <div className={s.container}>
      <p className={s.title}>알림</p>
      {notifications.map((noti) => (
        <div key={noti.createdAt}>
          {noti.isRead ? null : (
            <>
              <button
                className={s.notiCont}
                onClick={() =>
                  clickNotification(noti.type, noti.id, noti.relatedId)
                }
                type="button"
              >
                <div className={s.redDot} />
                <p className={s.content}>{noti.content}</p>
                <p className={s.date}>{formatDate(noti.createdAt)}</p>
              </button>
              <hr className={s.divide} />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Notification
