import React, { useState } from 'react'
import styles from './Heart.module.scss'

const HeartButton = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      type="button"
      className={`${styles.heartBtn} ${isActive ? styles.active : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      .
    </button>
  )
}

export default HeartButton
