import styles from './QuestionListRecTitle.module.scss'

const QuestionListRecTitle = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.level}>
          <p>난이도</p>
        </div>
        <div className={styles.questionNumber}>
          <p>번호</p>
        </div>
        <div className={styles.title}>
          <p>제목</p>
        </div>
        <div className={styles.acceptedUserCount}>
          <p>푼 사람 수</p>
        </div>
        <div className={styles.averageTries}>
          <p>평균 시도</p>
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionListRecTitle
