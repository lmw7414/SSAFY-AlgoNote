import styles from '@/components/commons/Button.module.scss'

interface Props {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  className: string
}

const Button = ({ text, onClick, className }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles[className] || ''}`}
    >
      {text}
    </button>
  )
}

export default Button
