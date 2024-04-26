import BookMarkSVG from '@public/images/bookmark.svg'
import BooMarkOffSVG from '@public/images/bookmark_off.svg'
import ToggleButton from './ToggleButton'

interface BookmarkProps {
  isOff: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const BookmarkToggle = ({ isOff, onClick }: BookmarkProps) => {
  /* eslint-disable no-console */
  console.log(isOff)
  const imageSrc = isOff ? BooMarkOffSVG : BookMarkSVG
  return <ToggleButton imageSrc={imageSrc} onClick={onClick} />
}

export default BookmarkToggle
