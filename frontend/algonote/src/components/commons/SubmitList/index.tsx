import s from './SubmitList.module.scss'

interface SubmitListProps {
  number: string
  result: string
  lang: string
  codeLength: string
  submitTime: string
}

const SubmitList = ({
  number,
  result,
  lang,
  codeLength,
  submitTime,
}: SubmitListProps) => {
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.number}>
          <p>{number}</p>
        </div>
        <div className={s.result}>
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
      <hr className={s.bottomHr} />
    </div>
  )
}

export default SubmitList
