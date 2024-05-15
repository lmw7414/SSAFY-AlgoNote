import { useRouter } from 'next/router'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './TextCarousel.module.scss'
import {
  handleDetailNote,
  handleKeyPress,
} from '@/components/commons/Bookmark/Note'

interface Notes {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

const TextCarousel = ({ notes }: { notes: Notes[] }) => {
  const router = useRouter()
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  }
  return (
    <div>
      {notes.length === 1 ? (
        <div className={s.noteTitleCon} onClick={() => handleDetailNote(notes[0].noteId, router)} onKeyDown={(e) => handleKeyPress(e, notes[0].noteId, router)}>
          <p className={s.noteTitle}>{notes[0].noteTitle}</p>
        </div>
      ) : (
        <Slider {...settings}>
          {notes.map((note) => (
            <div
              key={note.noteId}
              className={s.noteTitleCon}
              onClick={() => handleDetailNote(note.noteId, router)}
              onKeyDown={(e) => handleKeyPress(e, note.noteId, router)}
              tabIndex={0}
              role="button"
            >
              <p className={s.noteTitle}>{note.noteTitle}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default TextCarousel
