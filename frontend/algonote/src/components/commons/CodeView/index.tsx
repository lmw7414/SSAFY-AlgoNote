import React from 'react'
import style from './Compare.module.scss'
import useCodeInfo from '@/stores/code-store'

interface Props {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const CodeView = ({ setIsModalOpened }: Props) => {
  const { code } = useCodeInfo()

  return (
    <div>
      <div className={style.codeview}>{code}</div>
      <div>
        <button type="button" onClick={() => setIsModalOpened(true)}>
          코드 업로드
        </button>
      </div>
    </div>
  )
}

export default CodeView
