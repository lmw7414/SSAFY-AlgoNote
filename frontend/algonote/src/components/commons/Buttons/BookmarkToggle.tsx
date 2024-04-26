import BookMarkSVG from '@public/images/bookmark.svg'
import BookMarkOffSVG from '@public/images/bookmark_off.svg'
import ToggleButton from './ToggleButton'

interface BookmarkProps {
  isOff: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const BookmarkToggle = ({ isOff, onClick }: BookmarkProps) => {
  const imageSrc = isOff ? BookMarkOffSVG : BookMarkSVG
  return <ToggleButton imageSrc={imageSrc} onClick={onClick} />
}

export default BookmarkToggle
