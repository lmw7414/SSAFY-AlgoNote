'use client'

import React, { useState } from 'react'
import styles from '@/components/commons/Buttons/Button.module.scss'

export interface SimpleButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties
  isDisabled?: boolean
}

const SimpleButton = ({
  text,
  onClick,
  className,
  style = {},
  isDisabled,
}: SimpleButtonProps) => {
  const buttonClass = `${styles.button} ${className ? styles[className] : ' '}`

  console.log('버튼 응답', isDisabled)

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClass}
      style={style}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}

const FilterButton = ({
  text,
  onClick,
  className,
  style,
}: SimpleButtonProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(!isClicked)
    onClick(e)
  }

  return (
    <SimpleButton
      text={text}
      onClick={handleClick}
      className={className}
      style={style}
    />
  )
}

export { SimpleButton, FilterButton }
