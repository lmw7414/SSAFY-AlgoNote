'use client'

import { useState } from 'react'
import styles from '@/components/commons/Buttons/Button.module.scss'

export interface SimpleButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  width?: string
  height?: string
}

const SimpleButton = ({
  text,
  onClick,
  className,
  width,
  height,
}: SimpleButtonProps) => {
  const buttonClass = `${styles.button} ${className ? styles[className] : ' '}`

  const buttonStyle = {
    width: width || '100%',
    height: height || '3rem',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClass}
      style={buttonStyle}
    >
      {text}
    </button>
  )
}

const FilterButton = ({
  text,
  onClick,
  className,
  width,
  height,
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
      width={width}
      height={height}
    />
  )
}

export { SimpleButton, FilterButton }
