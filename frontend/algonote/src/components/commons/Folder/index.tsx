import s from './Folder.module.scss'
import TextCarousel from './TextCarousel'
import { Bronze, Silver, Gold, Platinum, Diamond, Ruby } from './Tiers'

interface FolderProps {
  tier: string
  problemId: number
  problemTitle: string
  notes: Array<string>
}
const Folder = ({ tier, problemId, problemTitle, notes }: FolderProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.tierContainer}>
        {tier[0] === 'B' ? (
          <>
            <p className={s.tier}>{tier}</p>
            <Bronze />
          </>
        ) : tier[0] === 'S' ? (
          <>
            <p className={s.tier}>{tier}</p>
            <Silver />
          </>
        ) : tier[0] === 'G' ? (
          <>
            <p className={s.tierBlack}>{tier}</p>
            <Gold />
          </>
        ) : tier[0] === 'P' ? (
          <>
            <p className={s.tierBlack}>{tier}</p>
            <Platinum />
          </>
        ) : tier[0] === 'D' ? (
          <>
            <p className={s.tier}>{tier}</p>
            <Diamond />
          </>
        ) : tier[0] === 'R' ? (
          <>
            <p className={s.tier}>{tier}</p>
            <Ruby />
          </>
        ) : null}
      </div>
      <div className={s.container}>
        <div className={s.top}>
          <p className={s.problemId}>백준 {problemId}</p>
          <p className={s.problemTitle}>{problemTitle}</p>
        </div>
        <div className={s.carouselContainer}>
          <TextCarousel notes={notes} />
        </div>
      </div>
    </div>
  )
}

export default Folder
