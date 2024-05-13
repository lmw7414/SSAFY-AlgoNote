import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from './writenote.module.scss'
import { getSubmissionList, registNote } from '@/apis/regist-noteAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'
import SubmitList from '@/components/commons/SubmitList'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import Tabs from '@/components/commons/Tabs'
import useNoteStore from '@/stores/note-store'

interface SubmissionHistory {
  code: string
  language: string
  length: number
  memorySize: number
  result: string
  runningTime: number
  submissionId: number
  submissionTime: string
}

const WriteNote = () => {
  const router = useRouter()
  const { id } = router.query // 쿼리에서 id(선택한 문제 번호)를 추출
  const currentDate = new Date()
  const [chatBotState, setChatBotState] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false) // 자연스럽게 챗봇 창 띄우기 위해
  const [submissionList, setSubmissionList] = useState<SubmissionHistory[]>([]) // 제출 이력
  const [isCollapsed, setIsCollapsed] = useState(false) // 좌측 상단 토글 클릭 여부

  const { tabs, setTabs, curSelectedIdx } = useNoteStore()

  useEffect(() => {
    const fetchData = async () => {
      const list = await getSubmissionList(Number(id))
      setSubmissionList(() => list)

      // 노트, 탭 초기화
      setTabs([
        {
          title: '',
          content: '',
        },
      ])
    }
    fetchData()
  }, [id, setTabs])

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined
    if (chatBotState) {
      timer = setTimeout(() => {
        setShowChatBot(true)
      }, 300)
    } else {
      setShowChatBot(false)
    }

    return () => clearTimeout(timer) // 컴포넌트가 언마운트 되거나 chatBotState가 바뀌기 전에 타이머를 정리
  }, [chatBotState])

  const buttonClickHandler = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleClickButton = () => {
    const { title } = tabs[curSelectedIdx]
    const { content } = tabs[curSelectedIdx]
    registNote(1012, title, content)
  }

  // UI 관련 스타일
  let resultColor = ''
  const [correctColor, incorrectColor] = ['#3c87fe', '#fb4444']
  const rightStyle = isCollapsed ? { flex: 30 } : { flex: 3 }

  const gptSectionStyle = chatBotState
    ? { flex: 1, padding: '2rem' }
    : { flex: 0, padding: 0 }

  const leftStyle = isCollapsed
    ? { justifyContent: 'center', paddingLeft: 0, paddingRight: 0 }
    : { justifyContent: 'space-between', paddingLeft: '1rem' }

  const buttonSecStyle = isCollapsed
    ? chatBotState
      ? { width: '47.5%' }
      : { width: '96.65%' }
    : chatBotState
      ? { width: '36.8%' }
      : { width: '75.15%' }

  const gptButtonStyle = chatBotState
    ? { right: '3.6rem', top: '15.7%' }
    : { right: '1.6rem' }

  return (
    <div className={s.pageWrapper}>
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.submitWrapper}>
            <div className={s.submitTitleBox} style={leftStyle}>
              {!isCollapsed && <span>제출 이력</span>}
              <button
                className={s.button}
                onClick={buttonClickHandler}
                type="button"
              >
                <Image
                  src="/images/rectangle.png"
                  alt="rectangle"
                  width={20}
                  height={20}
                  layout="fixed"
                />
              </button>
            </div>
            {/* 화면 축소 버튼 누르지 않았을 때 제출 이력을 보여줌 */}
            {!isCollapsed && (
              <div className={s.submitListBox}>
                <div className={s.submitListTitle}>
                  <SubmitListTitle />
                </div>
                <div className={s.submitList}>
                  {submissionList.map((sb) => {
                    const timeDiff =
                      currentDate.getTime() -
                      new Date(sb.submissionTime).getTime()

                    const seconds = Math.floor(timeDiff / 1000)
                    const minutes = Math.floor(seconds / 60)
                    const hours = Math.floor(minutes / 60)
                    const days = Math.floor(hours / 24)
                    const months = Math.floor(days / 30)

                    // 제출 시간 설정
                    let submissionTime
                    if (days > 30) {
                      submissionTime = `${months}달 전`
                    } else if (days > 0) {
                      submissionTime = `${days}일 전`
                    } else if (hours > 0) {
                      submissionTime = `${hours}시간 전`
                    } else if (minutes > 0) {
                      submissionTime = `${minutes}분 전`
                    } else {
                      submissionTime = '방금 전'
                    }

                    // result 색상 설정
                    resultColor =
                      sb.result === '맞았습니다!!'
                        ? correctColor
                        : incorrectColor

                    return (
                      <SubmitList
                        key={sb.submissionId}
                        number={sb.submissionId}
                        result={sb.result}
                        lang={sb.language}
                        codeLength={sb.length}
                        submitTime={submissionTime}
                        resultColor={resultColor}
                        code={sb.code}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={s.right} style={rightStyle}>
          <Tabs
            gptSectionStyle={gptSectionStyle}
            chatBotState={chatBotState}
            showChatBotState={showChatBot}
          />
          <div className={s.buttonSection} style={buttonSecStyle}>
            <Link href="/">
              <div className={s.exitButtonSec}>
                <Image
                  src="/images/back.png"
                  alt="logo"
                  width={28}
                  height={28}
                />
                <button className={s.exitButton} type="button">
                  나가기
                </button>
              </div>
            </Link>
            <div className={s.saveButtonSection}>
              <SimpleButton
                text="임시저장"
                onClick={handleClickButton}
                style={{
                  paddingRight: '1rem',
                  fontSize: '1.1rem',
                  fontFamily: 'Pretendard',
                  background: 'white',
                  border: 'none',
                  color: '#3c87fe',
                  width: '6.5rem',
                  height: '2.3rem',
                  fontWeight: '600',
                }}
              />
              <SimpleButton
                text="저장하기"
                onClick={handleClickButton}
                style={{
                  fontSize: '1.1rem',
                  fontFamily: 'Pretendard',
                  width: '6.2rem',
                  height: '2.3rem',
                  borderRadius: '5px',
                  fontWeight: '600',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={s.chatGpt} style={gptButtonStyle}>
        {!chatBotState ? (
          <button type="button">
            <Image
              src="/images/gptbutton.png"
              alt="chatGPTButton"
              width={50}
              height={50}
              layout="fixed"
              onClick={() => setChatBotState(!chatBotState)}
            />
          </button>
        ) : (
          <button type="button">
            <Image
              src="/images/closegptbutton.png"
              alt="chatGPTButton"
              width={12}
              height={12}
              layout="fixed"
              onClick={() => setChatBotState(!chatBotState)}
            />
          </button>
        )}
      </div>
    </div>
  )
}

export default WriteNote
