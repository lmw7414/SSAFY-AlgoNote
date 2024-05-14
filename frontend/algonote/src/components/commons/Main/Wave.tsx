import { useState, useEffect } from 'react'
import { differenceInDays } from 'date-fns'
import Link from 'next/link'
import styles from './Wave.module.scss'

interface WaveProps {
  type: string
  date: string
}

const typeTextMap: Record<string, string> = {
  math_theory: '수학',
  graph_theory: '그래프',
  data_structure: '자료구조',
  optimization: '최적화',
  implementation: '구현',
  string: '문자열',
  test: '테스트',
}

const Wave = ({ type, date }: WaveProps) => {
  const [percent, setPercent] = useState(0)
  const [dateDif, setDateDif] = useState(0)

  useEffect(() => {
    // 현재 날짜 구하기 (yyyy-mm-dd 형식)
    const currentDate = new Date().toISOString().slice(0, 10)

    // 날짜 차이 계산 (일 수)
    const dateDiff = differenceInDays(new Date(currentDate), new Date(date))
    // console.log(type, dateDiff)
    setDateDif(dateDiff)
    // score 계산
    let score = 0
    if (dateDiff === 0) {
      score = 96
    } else if (dateDiff >= 30) {
      score = 0
    } else {
      // 날짜 차이가 1일부터 29일 사이일 때, 점점 감소하도록 설정 (예시)
      score = 96 - dateDiff * 3 // 날짜 차이가 클수록 score가 감소
      score = Math.max(score, 0) // score가 음수가 되지 않도록 보정
    }

    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 1
        if (newPercent >= score) {
          clearInterval(interval)
        }
        return newPercent
      })
    }, 60)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const typeName = typeTextMap[type] || ''

  return (
    <Link href="/recommend">
      <div className={styles.box}>
        <div className={styles.type}>{typeName}</div>
        {dateDif === 19855 ? (
          <p className={styles.validation}>푼 적이 없어요</p>
        ) : dateDif > 15 ? (
          <div className={styles.validation}>
            <p>안 푼지</p>
            <p className={styles.validationStrong}>{dateDif}</p>
            <p>일째</p>
          </div>
        ) : dateDif === 0 ? (
          <div className={styles.validation}>
            <p className={`${styles.blue} ${styles.validationStrong}`}>
              오늘 풀었어요!
            </p>
          </div>
        ) : (
          <div className={styles.validation}>
            <p className={styles.black}>안 푼지</p>
            <p className={`${styles.black} ${styles.validationStrong}`}>
              {dateDif}
            </p>
            <p className={styles.black}>일째</p>
          </div>
        )}

        <p className={styles.validationBottom}>문제 풀러가기</p>
        <div
          className={
            dateDif > 20
              ? styles.waterLow
              : dateDif > 10 && dateDif <= 20
                ? styles.waterMid
                : styles.water
          }
          style={{ transform: `translate(0, ${100 - percent}%)` }}
        >
          <svg
            viewBox="0 0 560 20"
            // className={`${styles.water_wave} ${styles.water_wave_back}`}
            className={
              dateDif > 20
                ? `${styles.waterLow_wave} ${styles.waterLow_wave_back}`
                : dateDif > 10 && dateDif <= 20
                  ? `${styles.waterMid_wave} ${styles.waterMid_wave_back}`
                  : `${styles.water_wave} ${styles.water_wave_back}`
            }
          >
            <use xlinkHref="#wave" />
          </svg>
          <svg
            viewBox="0 0 560 20"
            // className={`${styles.water_wave} ${styles.water_wave_front}`}
            className={
              dateDif > 20
                ? `${styles.waterLow_wave} ${styles.waterLow_wave_front}`
                : dateDif > 10 && dateDif <= 20
                  ? `${styles.waterMid_wave} ${styles.waterMid_wave_front}`
                  : `${styles.water_wave} ${styles.water_wave_front}`
            }
          >
            <use xlinkHref="#wave" />
          </svg>
        </div>
        <svg style={{ display: 'none' }}>
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" />
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" />
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" />
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" />
          </symbol>
        </svg>
      </div>
    </Link>
  )
}

export default Wave
