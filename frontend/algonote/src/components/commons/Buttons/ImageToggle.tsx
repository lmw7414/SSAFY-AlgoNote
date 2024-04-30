import { StaticImageData } from 'next/image'
import ToggleButton from './ToggleButton'

interface BookmarkProps {
  isOff: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  offImg: StaticImageData
  onImg: StaticImageData
}

const ImageToggle = ({ isOff, onClick, offImg, onImg }: BookmarkProps) => {
  const imageSrc = isOff ? offImg : onImg
  return <ToggleButton imageSrc={imageSrc} onClick={onClick} />
}

export default ImageToggle
