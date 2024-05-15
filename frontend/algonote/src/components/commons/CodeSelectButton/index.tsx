import React from 'react'
import { SimpleButton } from '../Buttons/Button'
import useCodeInfo from '@/stores/code-store'

interface Props {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  index: number
}

const CodeSelectButton = ({ setIsModalOpened, index }: Props) => {
  const setUpdateIndex = useCodeInfo((state) => state.setUpdateIndex)

  return (
    <div>
      <SimpleButton
        text="코드 업로드"
        className="back"
        onClick={() => {
          setIsModalOpened(true)
          setUpdateIndex(index)
        }}
      />
    </div>
  )
}

export default CodeSelectButton
