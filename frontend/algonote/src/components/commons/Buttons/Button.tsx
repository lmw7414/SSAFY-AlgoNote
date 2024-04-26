'use client'

import { useState } from 'react'
import styles from '@/components/commons/Buttons/Button.module.scss'

interface SimpleButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const SimpleButton = ({ text, onClick, className }: SimpleButtonProps) => {
  const buttonClass = `${styles.button} ${className ? styles[className] : ''}`

  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      {text}
    </button>
  )
}

SimpleButton.defaultProps = {
  className: '',
  initialClicked: false,
}

const FilterButton = ({
  text,
  onClick,
  className,
  initialClicked = false,
}: SimpleButtonProps & { initialClicked?: boolean }) => {
  const [isClicked, setIsClicked] = useState(initialClicked)
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const buttonClass = `${styles[className]} ${isClicked ? styles.clicked : ''}`

  return (
    <SimpleButton
      text={text}
      onClick={() => {
        handleClick()
        onClick()
      }}
      className={buttonClass}
    />
  )
}

export { SimpleButton, FilterButton }
