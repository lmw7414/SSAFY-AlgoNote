import React from 'react'
import Image from 'next/image'
import useCodeInfo from '@/stores/code-store'

interface Props {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  index: number
}

const CodeSelectButton = ({ setIsModalOpened, index }: Props) => {
  const setUpdateIndex = useCodeInfo((state) => state.setUpdateIndex)

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsModalOpened(true)
          setUpdateIndex(index)
        }}
      >
        <Image
          src="/images/upload_white.svg"
          alt="토글버튼"
          width={40}
          height={50}
          objectFit="contain"
        />
      </button>
    </div>
  )
}

export default CodeSelectButton
