import s from './WrapperComponent.module.scss'

interface CodeListProps {
  number: number
  result: string
  lang: string
  codeLength: number
  submitTime: string
  resultColor: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>
}

const WrapperComponent = ({
  number,
  result,
  lang,
  codeLength,
  submitTime,
  resultColor,
  onClick,
  onKeyDown,
}: CodeListProps) => {
  return (
    <div>
      <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
        <div className={s.wrapper}>
          <div className={s.number}>
            <p>{number}</p>
          </div>
          <div className={s.result} style={{ color: resultColor }}>
            <p>{result}</p>
          </div>
          <div className={s.lang}>
            <p>{lang}</p>
          </div>
          <div className={s.codeLength}>
            <p>{codeLength}</p>
          </div>
          <div className={s.submitTime}>
            <p>{submitTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WrapperComponent
