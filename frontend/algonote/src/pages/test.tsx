import QuestionList from '@/components/commons/QuestionList'
import QuestionListTitle from '@/components/commons/QuestionListTitle'

const Test = () => {
  return (
    <div>
      <div>
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
    </div>
  )
}

export default Test
