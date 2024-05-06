import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './TextCarousel.module.scss'

interface Notes {
  noteId: number
  noteTitle: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

const TextCarousel = ({ notes }: { notes: Notes[] }) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
  }
  return (
    <div>
      {notes.length === 1 ? (
        <div className={s.noteTitleCon}>
          <p className={s.noteTitle}>{notes[0].noteTitle}</p>
        </div>
      ) : (
        <Slider {...settings}>
          {notes.map((note) => (
            <div key={note.noteId} className={s.noteTitleCon}>
              <p className={s.noteTitle}>{note.noteTitle}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default TextCarousel
