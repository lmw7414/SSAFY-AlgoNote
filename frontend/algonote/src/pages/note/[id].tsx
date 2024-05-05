import { useRouter } from 'next/router'
import style from '@/pages/note/note.module.scss'

const Note = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div className={style.frame}>
      <p>도착{id}</p>
    </div>
  )
}

export default Note
