import useSearchResult from '@/stores/search-store'
import styles from './Note.module.scss'

const ResultNote = () => {
  const { searchResult } = useSearchResult()

  return (
    <div className={styles.frame}>
      {searchResult.notes.map((it, index:number)=>{
        return(
            <div key={it.problemId}>
    <div className={styles.content}>
              <div className={styles.problem}>
                <div className={styles.tierImage}>
                  <TierImg tier={1} />
                </div>
                <div className={styles.problemTitle}>{it.problemTitle}</div>
              </div>
              <div className={styles.note_title}>{it.note.title}</div>
              <div className={styles.details}>
                {/* <ImageToggle
                  isOff={heartIsOff[index]}
                  onClick={() => handleHeartState(index, it.note.id)}
                  offImg={HeartOffSVG}
                  onImg={HeartSVG}
                  width="1.6rem"
                  height="1.6rem"
                /> */}
                <div className={styles.countNickname}>
                  {/* <div>{it.note.heartCnt}</div> */}
                  <div className={styles.nickname}>{it.member.nickname}</div>
                </div>
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
