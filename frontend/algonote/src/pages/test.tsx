import NavBar from '@/components/commons/NavBar/index'
import NoteNavBar from '@/components/commons/NoteNavBar'
import Pagination from '@/components/commons/Pagination'
import QuestionListTitle from '@/components/commons/QuestionListTitle'
import styles from './test.module.scss'
import QuestionList from '@/components/commons/QuestionList'

const Test = () => {
  return (
    <>
      <NavBar />
      <NoteNavBar />
      <Pagination />
      <div className={styles.questionListTitleWrapper}>
        <QuestionListTitle />
        <QuestionList
          title="성현이의 5만원"
          category="gold"
          tier="gold1"
          type="#DFS #DP"
          time="3분 전"
          src="test"
        />
        <QuestionList
          title="성현이와 Javascript AccessToken"
          category="platinum"
          tier="platinum3"
          type="#완전탐색"
          time="10분 전"
          src="test"
        />
      </div>
    </>
  )
}

export default Test
