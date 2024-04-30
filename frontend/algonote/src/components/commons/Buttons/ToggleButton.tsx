import Image, { StaticImageData } from 'next/image'

export interface ToggleButtonProps {
  imageSrc: StaticImageData
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  width?: string
  height?: string
}

const ToggleButton = ({
  imageSrc,
  onClick,
  width,
  height,
}: ToggleButtonProps) => {
  const buttonStyle = {
    width: width || '100%',
    height: height || '3rem',
  }

  return (
    <button type="button" onClick={onClick} style={buttonStyle}>
      <Image src={imageSrc} alt="토글버튼" />
    </button>
  )
}

export default ToggleButton
