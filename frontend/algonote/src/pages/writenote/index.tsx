import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from './writenote.module.scss'
import {
  getSubmissionList,
  getTempSavedNote,
  registNote,
  tempRegistNote,
} from '@/apis/regist-noteAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'
import SubmitList from '@/components/commons/SubmitList'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import Tabs from '@/components/commons/Tabs'
import useNoteStore from '@/stores/note-store'
import 'react-toastify/dist/ReactToastify.css'

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

interface Member {
  memberId: number
  nickname: string
  profileImg: string
}

interface Problem {
  acceptUserCount: number
  averageTries: number
  id: number
  tags: string[]
  tier: number
  title: string
}

interface TempSavedNote {
  content: string
  createdAt: string
  member: Member
  modifiedAt: string
  noteTitle: string
  problem: Problem
  tempNoteId: number
}

const WriteNote = () => {
  const router = useRouter()
  const { id } = router.query // 쿼리에서 id(선택한 문제 번호)를 추출
  const currentDate = new Date()
  const [chatBotState, setChatBotState] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false) // 자연스럽게 챗봇 창 띄우기 위해
  const [submissionList, setSubmissionList] = useState<SubmissionHistory[]>([]) // 제출 이력
  const [tempSavedList, setTempSavedList] = useState<TempSavedNote[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false) // 좌측 단 토글 클릭 여부
  const { tabs, setTabs, curSelectedIdx, updateTab } = useNoteStore()
  const [flag, setFlag] = useState(false)

  let title = ''
  let content = ''

  if (tabs[curSelectedIdx]) {
    title = tabs[curSelectedIdx].title
    content = tabs[curSelectedIdx].content
  }

  useEffect(() => {
    const fetchData = async () => {
      const list = await getTempSavedNote(Number(id))
      setTempSavedList(() => list)
      console.log('리스트임', list)
    }
    fetchData()
  }, [id])

  useEffect(() => {}, [flag])

  useEffect(() => {
    const fetchData = async () => {
      const list = await getSubmissionList(Number(id))
      setSubmissionList(() => list)
      await getTempSavedNote(Number(id))

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

    return () => clearTimeout(timer)
  }, [chatBotState])

  const buttonClickHandler = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleClickButton = () => {
    registNote(Number(id), title, content)
  }

  const handleTempSave = () => {
    tempRegistNote(Number(id), title, content)
    alert('임시저장 되었습니다.')
  }

  const handleClickTempNote = (tit: string, con: string) => {
    console.log('임시 저장된 노트 클릭')
    console.log('Clicked note title:', tit)
    console.log('Clicked note content:', con)
    updateTab(curSelectedIdx, { title: tit, content: con })
    setFlag(() => !flag)
    console.log(flag)
  }

  // UI 관련 스타일
  let resultColor = ''
  const [correctColor, incorrectColor] = ['#3c87fe', '#fb4444']
  const rightStyle = isCollapsed ? { flex: 30 } : { flex: 3 }

  const gptSectionStyle = chatBotState
    ? { flex: 1, padding: '1rem', paddingRight: '0.5rem' }
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
    ? { right: '2rem', top: '14%' }
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
                <div className={s.tempNoteListBox}>
                  <div className={s.tempNoteTitleBox}>임시 저장된 노트</div>
                  <div className={s.tempNoteList}>
                    {tempSavedList.map((temp) => {
                      const timeDiff =
                        currentDate.getTime() -
                        new Date(temp.createdAt).getTime()

                      const seconds = Math.floor(timeDiff / 1000)
                      const minutes = Math.floor(seconds / 60)
                      const hours = Math.floor(minutes / 60)
                      const days = Math.floor(hours / 24)
                      const months = Math.floor(days / 30)

                      // 제출 시간 설정
                      let savedTime
                      if (days > 30) {
                        savedTime = `${months}달 전`
                      } else if (days > 0) {
                        savedTime = `${days}일 전`
                      } else if (hours > 0) {
                        savedTime = `${hours}시간 전`
                      } else if (minutes > 0) {
                        savedTime = `${minutes}분 전`
                      } else {
                        savedTime = '방금 전'
                      }
                      return (
                        <button
                          key={temp.tempNoteId}
                          type="button"
                          onClick={() =>
                            handleClickTempNote(temp.noteTitle, temp.content)
                          }
                        >
                          <div className={s.tempNoteItem}>
                            <span>{temp.noteTitle}</span>
                            <span>{savedTime}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
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
                onClick={handleTempSave}
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
