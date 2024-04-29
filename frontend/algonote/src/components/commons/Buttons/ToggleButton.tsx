import Image, { StaticImageData } from 'next/image'

interface ToggleButtonProps {
  imageSrc: StaticImageData
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ToggleButton = ({ imageSrc, onClick }: ToggleButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      <Image src={imageSrc} alt="토글버튼" />
    </button>
  )
}

export default ToggleButton
