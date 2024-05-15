import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { SimpleButton } from '../Buttons/Button'
import NoteModal from '../Modal/NoteModal'
import s from './SubmitList.module.scss'
import useNoteStore from '@/stores/note-store'

interface SubmitListProps {
  number: number
  result: string
  lang: string
  codeLength: number
  submitTime: string
  resultColor: string
  code: string
}

const SubmitList = ({
  number,
  result,
  lang,
  codeLength,
  submitTime,
  resultColor,
  code,
}: SubmitListProps) => {
  const { curSelectedIdx, tabs, updateTab } = useNoteStore()

  const submissionCode = `\`\`\`${lang} ${code}\n\`\`\``

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  const handleSubmissionButtonClick = () => {
    setIsModalOpen(() => true)

    console.log(code)
    updateTab(curSelectedIdx, {
      title: tabs[curSelectedIdx].title,
      content: tabs[curSelectedIdx] + submissionCode,
    })
    console.log('업뎃 후 현재 content: ', tabs[curSelectedIdx])
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('코드가 복사되었어요!')
      onClose()
    } catch (err) {
      console.log('클립보드 복사에 실패했습니다.', err)
    }
  }

  return (
    <div>
      <button
        className={s.submissionButton}
        type="button"
        onClick={handleSubmissionButtonClick}
      >
        <div className={s.wrapper}>
          <div className={s.number}>
            <p>{number}</p>
          </div>
          <div className={s.result} style={{ color: resultColor }}>
            <p>{result}</p>
          </div>
          <div className={s.lang}>
            <p>{lang}</p>
          </div>
          <div className={s.codeLength}>
            <p>{codeLength}</p>
          </div>
          <div className={s.submitTime}>
            <p>{submitTime}</p>
          </div>
        </div>
      </button>
      <hr className={s.bottomHr} />
      {isModalOpen && (
        <NoteModal code={code}>
          <div className={s.mySubmission}>
            <p>내 제출 코드</p>
          </div>
          <div className={s.mySubmissionDetail}>
            <p>코드를 복사해서 내 노트의 코드 블럭에 붙여넣어 보세요</p>
          </div>
          <div className={s.codeSection}>
            <ReactMarkdown>{`\`\`\` ${lang} \n${code} \n \`\`\``}</ReactMarkdown>
          </div>
          <div className={s.closeButtonSection}>
            <SimpleButton
              text="복사"
              style={{
                fontWeight: '500',
                width: '4rem',
                height: '2rem',
                fontFamily: 'Pretendard',
                marginRight: '0.5rem', // 버튼 간격 조정
              }}
              onClick={() => copyToClipboard(code ?? '')}
            />
            <SimpleButton
              text="닫기"
              style={{
                background: '#ffffff',
                color: '#3c87fe',
                border: '1.5px solid #3c87fe',
                fontWeight: '500',
                width: '4rem',
                height: '2rem',
                fontFamily: 'Pretendard',
              }}
              onClick={onClose}
            />
          </div>
        </NoteModal>
      )}
    </div>
  )
}

export default SubmitList
