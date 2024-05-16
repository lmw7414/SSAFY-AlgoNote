import { useEffect, useState } from 'react'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './Popup.module.scss'

interface Provider {
  memberId: number
  nickname: string
  profileImg: string
}

interface ParsedContent {
  id: number
  type: string
  content: string
  relatedId: number | null
  provider: Provider
  isRead: boolean
  createdAt: string
  relatedTag: string | null
}

interface PopupProps {
  content: string
  onClose: () => void
}
const Popup = ({ content, onClose }: PopupProps) => {
  const [parsedContent, setParsedContent] = useState<ParsedContent | null>(null)
  const [messageType, setMessageType] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (content.substring(0, 5) !== 'Event') {
      console.log(content)
      setParsedContent(JSON.parse(content))
      setMessageType(JSON.parse(content).type)
    }

    const timeout = setTimeout(() => {
      onClose() // 5초 후에 알림 팝업을 자동으로 닫기 위해 onClose 함수 호출
    }, 6000)

    return () => {
      clearTimeout(timeout) // 컴포넌트가 언마운트될 때 타임아웃 해제
    }
  }, [])
  console.log('메세지 객체:', parsedContent)
  console.log('타입:', messageType)

  const handleClick = (
    type: string | undefined,
    noteId: number | null | undefined,
    tag: string | null | undefined,
  ) => {
    if (type === 'HEART' || type === 'BOOKMARK' || type === 'REVIEW') {
      router.push(`/note/${noteId}`)
    } else if (type === 'SUBMISSION') {
      router.push('/solvedproblems')
    } else if (type === 'TAG') {
      router.push({
        pathname: '/recommend',
        query: { tag },
      })
    }
    onClose()
  }

  const haha = () => {
    console.log('haha')
  }

  return (
    <div
      className={s.container}
      onClick={() =>
        handleClick(
          parsedContent?.type,
          parsedContent?.relatedId,
          parsedContent?.relatedTag,
        )
      }
      onKeyDown={haha}
      role="presentation"
    >
      <div className={s.profileCont}>
        <div className={s.imgCont}>
          <img
            src={parsedContent?.provider.profileImg}
            alt="profileImg"
            className={s.profileImg}
          />
        </div>
        <p className={s.nickname}>{parsedContent?.provider.nickname}</p>
      </div>
      <div className={s.content}>
        <p>{parsedContent?.content}</p>
      </div>
      <p className={s.click}>클릭해서 이동하기</p>
    </div>
  )
}
export default Popup
