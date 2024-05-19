import s from './SubmitListTitle.module.scss'

const SubmitListTitle = () => {
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.number}>
          <p>번호</p>
        </div>
        <div className={s.result}>
          <p>결과</p>
        </div>
        <div className={s.lang}>
          <p>언어</p>
        </div>
        <div className={s.codeLength}>
          <p>코드길이</p>
        </div>
        <div className={s.submitTime}>
          <p>시간</p>
        </div>
      </div>
      <hr className={s.bottomHr} />
    </div>
  )
}

export default SubmitListTitle
