import styles from '@/components/commons/Buttons/Button.module.scss'

interface ButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const Button = ({ text, onClick, className }: ButtonProps) => {
  const buttonClass = `${styles.button} ${className ? styles[className] : ''}`

  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  className: '',
}

export default Button
