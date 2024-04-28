import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './TextCarousel.module.scss'

const TextCarousel = ({ notes }: { notes: Array<string> }) => {
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
          <p className={s.noteTitle}>{notes[0]}</p>
        </div>
      ) : (
        <Slider {...settings}>
          {notes.map((noteTitle, index) => (
            <div key={index} className={s.noteTitleCon}>
              <p className={s.noteTitle}>{noteTitle}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default TextCarousel
