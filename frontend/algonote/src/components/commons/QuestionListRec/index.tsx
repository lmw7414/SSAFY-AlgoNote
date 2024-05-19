import TierImg from '../Tier'
import styles from './QuestionListRec.module.scss'

interface QuestionListProps {
  id: number
  title: string
  tier: number
  acceptedUserCount: number
  averageTries: number
}

const QuestionListRec = ({
  id,
  title,
  tier,
  acceptedUserCount,
  averageTries,
}: QuestionListProps) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.level}>
          <div className={styles.blank} />
          <TierImg tier={tier} />
        </div>
        <div className={styles.questionNumber}>
          <p>{id}</p>
        </div>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.acceptedUserCount}>
          <p>{acceptedUserCount}</p>
        </div>
        <div className={styles.averageTries}>
          <p>{averageTries}</p>
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionListRec
