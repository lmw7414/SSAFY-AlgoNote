import { useState, useEffect } from 'react'
import styles from './Wave.module.scss'

interface WaveProps {
  score: number
  type: string
}
const Wave = ({ score, type }: WaveProps) => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
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

  return (
    <div className={styles.box}>
      <div className={styles.type}>{type}</div>
      <div
        className={styles.water}
        style={{ transform: `translate(0, ${100 - percent}%)` }}
      >
        <svg
          viewBox="0 0 560 20"
          className={`${styles.water_wave} ${styles.water_wave_back}`}
        >
          <use xlinkHref="#wave" />
        </svg>
        <svg
          viewBox="0 0 560 20"
          className={`${styles.water_wave} ${styles.water_wave_front}`}
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
  )
}

export default Wave
