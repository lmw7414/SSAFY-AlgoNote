import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from '../Modal'
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

  const closeModal = () => setIsModalOpen(false)

  const handleSubmissionButtonClick = () => {
    setIsModalOpen(() => true)

    console.log(code)
    updateTab(curSelectedIdx, {
      title: tabs[curSelectedIdx].title,
      content: tabs[curSelectedIdx] + submissionCode,
    })
    console.log('업뎃 후 현재 content: ', tabs[curSelectedIdx])
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
        <Modal onClose={closeModal} code={code}>
          <div className={s.codeSection}>
            <ReactMarkdown>{`\`\`\` ${lang} \n${code} \n \`\`\``}</ReactMarkdown>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SubmitList
