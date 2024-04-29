import styles from './QuestionList.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const QuestionList = ({ title, category, tier, src, type, time }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.level}>
          <Image
            src={`/images/tier/${category}/${tier}.png`} // 이미지 경로
            alt="logo"
            width={20}
            height={16}
          />
        </div>
        <div className={styles.questionNumber}>
          <p>1333</p>
        </div>
        <div className={styles.title}>
          <Link href={`/${src}`}>
            <p>{title}</p>
          </Link>
        </div>
        <div className={styles.type}>
          <p>{type}</p>
        </div>
        <div className={styles.summitDate}>
          <p>{time}</p>
        </div>
        <div className={styles.writeNote}>
          <Image
            src="/images/checked.png" // 이미지 경로
            alt="checked-button"
            width={16}
            height={16}
          />
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionList
