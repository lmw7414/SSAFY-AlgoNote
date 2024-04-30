import { useState } from 'react'
import HeartOffSVG from '@public/images/heart.svg'
import HeartSVG from '@public/images/redHeart.svg'
import Tier from '@public/images/tier.svg'
import Image from 'next/image'
import styles from './Note.module.scss'
import ImageToggle from '@/components/commons/Buttons/ImageToggle'

const dummy = {
  bookmarks: [
    {
      note: {
        title: 'DP를 이용한 기초 문제 풀이',
        heartCnt: 0,
      },
      problem: {
        title: '최소 경로 찾기',
        tier: 1,
      },
      member: {
        nickname: '닉네임1',
      },
    },
    {
      note: {
        title: '그리디 알고리즘으로 최적 해법 탐색',
        heartCnt: 12,
      },
      problem: {
        title: '최대 수익 계산하기',
        tier: 1,
      },
      member: {
        nickname: '닉네임1',
      },
    },
    {
      note: {
        title: '분할 정복을 활용한 복잡한 문제 해결',
        heartCnt: 2,
      },
      problem: {
        title: '배열 합병 정렬',
        tier: 2,
      },
      member: {
        nickname: '닉네임2',
      },
    },
    {
      note: {
        title: '백트래킹으로 순열과 조합 완전 탐색',
        heartCnt: 5,
      },
      problem: {
        title: '가능한 모든 문자열 조합 찾기',
        tier: 3,
      },
      member: {
        nickname: '닉네임3',
      },
    },
    {
      note: {
        title: '그래프 이론을 사용한 최단 경로 문제',
        heartCnt: 3,
      },
      problem: {
        title: '다익스트라 알고리즘 적용',
        tier: 2,
      },
      member: {
        nickname: '닉네임4',
      },
    },
    {
      note: {
        title: '동적 프로그래밍으로 복잡한 동전 교환 문제 해결',
        heartCnt: 1,
      },
      problem: {
        title: '최소 동전으로 금액 맞추기',
        tier: 4,
      },
      member: {
        nickname: '닉네임5',
      },
    },
    {
      note: {
        title: '동적 프로그래밍으로 복잡한 동전 교환 문제 해결',
        heartCnt: 1,
      },
      problem: {
        title: '최소 동전으로 금액 맞추기',
        tier: 4,
      },
      member: {
        nickname: '닉네임5',
      },
    },
  ],
}

const Note = () => {
  const [heartIsOff, setHeartIsOff] = useState(dummy.bookmarks.map(() => true))

  const handleHeartState = (index: number) => {
    const newHeartState = [...heartIsOff]
    newHeartState[index] = !heartIsOff[index]
    setHeartIsOff(newHeartState)
  }

  return (
    <div className={styles.frame}>
      {dummy.bookmarks.map((it, index) => {
        let key = 1
        key += 1

        return (
          <div key={key} className={styles.note}>
            <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <Image src={Tier} alt="티어" />
                </div>
                <div className={styles.problemTitle}>{it.problem.title}</div>
              </div>
              <div className={styles.note_title}>{it.note.title}</div>
              <div className={styles.details}>
                <ImageToggle
                  isOff={heartIsOff[index]}
                  onClick={() => handleHeartState(index)}
                  offImg={HeartOffSVG}
                  onImg={HeartSVG}
                  width="1.6rem"
                  height="1.6rem"
                />
                <div className={styles.countNickname}>
                  <div>{it.note.heartCnt}</div>
                  <div className={styles.nickname}>{it.member.nickname}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Note
