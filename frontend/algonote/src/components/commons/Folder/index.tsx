import s from './Folder.module.scss'
import TextCarousel from './TextCarousel'
import { Bronze, Silver, Gold, Platinum, Diamond, Ruby } from './Tiers'

interface Notes {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

interface FolderProps {
  tier: string
  problemId: number
  problemTitle: string
  notes: Notes[]
}
const Folder = ({ tier, problemId, problemTitle, notes }: FolderProps) => {
  const newTier = parseInt(tier, 10)
  return (
    <div className={s.wrapper}>
      <div className={s.tierContainer}>
        {newTier <= 5 ? (
          <>
            <p className={s.tier}>{`BRONZE${6 - newTier}`}</p>
            <Bronze />
          </>
        ) : newTier <= 10 ? (
          <>
            <p className={s.tier}>{`SILVER${11 - newTier}`}</p>
            <Silver />
          </>
        ) : newTier <= 15 ? (
          <>
            <p className={s.tierBlack}>{`GOLD${16 - newTier}`}</p>
            <Gold />
          </>
        ) : newTier <= 20 ? (
          <>
            <p className={s.tierBlack}>{`Platinum${21 - newTier}`}</p>
            <Platinum />
          </>
        ) : newTier <= 25 ? (
          <>
            <p className={s.tier}>{`Diamond${26 - newTier}`}</p>
            <Diamond />
          </>
        ) : newTier <= 30 ? (
          <>
            <p className={s.tier}>{`Ruby${31 - newTier}`}</p>
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
