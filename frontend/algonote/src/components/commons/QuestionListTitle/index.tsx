import styles from './QuestionListTitle.module.scss'

const QuestionListTitle = () => {
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
        <div className={styles.type}>
          <p>유형</p>
        </div>
        <div className={styles.summitDate}>
          <p>제출 일시</p>
        </div>
        <div className={styles.writeNote}>
          <p>노트 작성</p>
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionListTitle
