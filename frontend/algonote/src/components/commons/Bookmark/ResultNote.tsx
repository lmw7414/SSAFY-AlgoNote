import useSearchResult from '@/stores/search-store'
import styles from './Note.module.scss'
import TierImg from '@/components/commons/Tier'

const ResultNote = () => {
  const { searchResult } = useSearchResult()

  return (
    <div className={styles.frame}>
      {searchResult.notes.map((it, index:number)=>{
        return(
            <div key={it.noteId}>
            <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <TierImg tier={it.problemTier} />
                </div>
                <div className={styles.problemTitle}>{it.problemTitle}</div>
              </div>
              <div className={styles.note_title}>{it.noteTitle}</div>
              <div className={styles.details}>
                <div className={styles.countNickname}>
                  <div>{it.heartCnt}</div>
                  <div className={styles.nickname}>{it.memberNickname}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultNote
