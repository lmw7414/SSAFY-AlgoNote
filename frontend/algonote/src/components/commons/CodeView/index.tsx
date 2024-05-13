import React from 'react'
import { SimpleButton } from '../Buttons/Button'
import style from './Compare.module.scss'
import useCodeInfo from '@/stores/code-store'

interface Props {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
  code: string
  index: number
}

const CodeView = ({ setIsModalOpened, code, index }: Props) => {
  const setUpdateIndex = useCodeInfo((state) => state.setUpdateIndex)

  return (
    <div>
      <div className={style.codeview}>{code}</div>
      <div>
        <SimpleButton
          text="코드 업로드"
          onClick={() => {
            setIsModalOpened(true)
            setUpdateIndex(index)
          }}
        />
      </div>
    </div>
  )
}

export default CodeView
