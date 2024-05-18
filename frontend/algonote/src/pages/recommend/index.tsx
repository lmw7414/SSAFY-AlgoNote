import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Category from './Category'
import s from './recommend.module.scss'

const Recommend = () => {
  const categories = [
    'math_theory',
    'graph_theory',
    'data_structure',
    'optimization',
    'implementation',
    'string',
  ]

  const router = useRouter()

  useEffect(() => {
    const fetchData = () => {
      const { queryData } = router.query
      if (typeof queryData === 'string') {
        const handleScrollToElement = () => {
          const element = document.getElementById(queryData)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
        handleScrollToElement()
      }
    }
    fetchData()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.headerSentence}>
          <p className={s.headerBold}>유형별 추천 문제를 알려드릴게요</p>
        </div>
        <div className={s.headerSentence}>
          <p className={s.contentLight} id="math_theory">
            부족한 유형, 많이 틀린 유형을 집중적으로 공부해보세요. 해결한 문제는
            오답노트에서 확인할 수 있어요.
          </p>
        </div>
      </div>
      <div className={s.content}>
        {categories.map((category) => (
          <div key={category}>
            <Category categoryName={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommend
