import Image from 'next/image'
import s from './NoteList.module.scss'

interface NoteListProps {
  idx: number
  title: string
  date: string
  heartCnt: number
}

const NoteList = ({ idx, title, date, heartCnt }: NoteListProps) => {
  const formatDate = (inputDateStr: string) => {
    const inputDate = new Date(inputDateStr)

    // 원하는 날짜 및 시간 포맷 설정
    const year = inputDate.getFullYear() // 연도(4자리)
    const month = String(inputDate.getMonth() + 1).padStart(2, '0') // 월(2자리, 0으로 패딩)
    const day = String(inputDate.getDate()).padStart(2, '0') // 일(2자리, 0으로 패딩)
    const hours = String(inputDate.getHours()).padStart(2, '0') // 시(2자리, 0으로 패딩)
    const minutes = String(inputDate.getMinutes()).padStart(2, '0') // 분(2자리, 0으로 패딩)

    // 포맷팅된 문자열 반환
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`
  }

  return (
    <>
      <div className={s.container}>
        <div>
          <p className={s.idx}>{idx + 1}</p>
          <p className={s.title}>{title}</p>
        </div>
        <div>
          <div className={s.heartCont}>
            <Image
              width={16}
              height={16}
              src="/images/redHeart.svg"
              alt="heart"
            />
            <p className={s.heartCnt}>{heartCnt}</p>
          </div>
          <div className={s.dateCont}>
            <p className={s.date}>{formatDate(date)}</p>
          </div>
        </div>
      </div>
      {/* <hr className={s.divide} /> */}
    </>
  )
}

export default NoteList
