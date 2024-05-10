import Link from 'next/link'
import { useRouter } from 'next/router'
import { SimpleButton } from '../Buttons/Button'
import TierImg from '../Tier'
import styles from './QuestionList.module.scss'

interface QuestionListProps {
  id: number
  title: string
  tier: number
  tags: string[]
  complete: string
  time: string
}

const QuestionList = ({
  id,
  title,
  tier,
  tags,
  complete,
  time,
}: QuestionListProps) => {
  const router = useRouter()
  const handleWriteNote = () => {
    const problemId = id
    router.push({
      pathname: '/writenote',
      query: { id: problemId },
    })
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.level}>
          <TierImg tier={tier} />
        </div>
        <div className={styles.questionNumber}>
          <p>{id}</p>
        </div>
        <div className={styles.title}>
          <Link href={`/${title}`}>
            <p>{title}</p>
          </Link>
        </div>
        <div className={styles.type}>
          <p>#{tags.join(' #')}</p>
        </div>
        <div className={styles.summitDate}>
          <p>{time}</p>
        </div>
        <div className={styles.writeNote}>
          {complete === 'NOT_YET' ? (
            <SimpleButton
              text="노트 작성하기"
              onClick={handleWriteNote}
              style={{
                background: '#ffffff',
                border: '1.3px solid #3c87fe',
                color: '#3c87fe',
                fontSize: '0.9rem',
                fontFamily: 'Pretendard',
                width: '6.7rem',
                height: '2.2rem',
                borderRadius: '8px',
                fontWeight: '500',
              }}
            />
          ) : (
            <SimpleButton
              text="노트 보러가기"
              onClick={handleWriteNote}
              style={{
                border: 'none',
                fontSize: '0.9rem',
                fontFamily: 'Pretendard',
                width: '6.7rem',
                height: '2.2rem',
                borderRadius: '8px',
                fontWeight: '500',
              }}
            />
          )}
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionList
