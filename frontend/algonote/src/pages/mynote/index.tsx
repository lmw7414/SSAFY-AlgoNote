import s from './mynote.module.scss'
import Folder from '@/components/commons/Folder'
import NavBar from '@/components/commons/NavBar/index'

const MyNote = () => {
  const problems = [
    {
      tier: 'GOLD4',
      id: 1001,
      title: '성현이의 슬릭백',
      notes: ['개쩌는 풀이', '엄청난 풀이', '맛있는 풀이'],
    },
    {
      tier: 'PLATINUM3',
      id: 1321,
      title: '안녕하세요구르트',
      notes: ['설레는 풀이'],
    },
    {
      tier: 'SILVER2',
      id: 14301,
      title: '성현이의 슬리퍼',
      notes: [
        '동해물과 백두산이 마르고 닳도록 하는미이 보오ㅜ하나사',
        '엄청난 풀이',
      ],
    },
    {
      tier: 'RUBY2',
      id: 14301,
      title: '성현이의 슬리퍼',
      notes: ['힘을내요 슈퍼파워', '엄청난 풀이'],
    },
    {
      tier: 'BRONZE4',
      id: 14301,
      title: '성현이의 슬리퍼',
      notes: ['오지는 풀이', '엄청난 풀이', 'asd'],
    },
    {
      tier: 'DIAMOND4',
      id: 14301,
      title: '성현이의 슬리퍼',
      notes: ['빢치는 풀이'],
    },
  ]
  return (
    <>
      <NavBar />
      <div className={s.test}>
        <div className={s.container}>
          <div className={s.folderContainer}>
            {problems.map((problem) => (
              <Folder
                key={problem.id}
                tier={problem.tier}
                problemId={problem.id}
                problemTitle={problem.title}
                notes={problem.notes}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNote
