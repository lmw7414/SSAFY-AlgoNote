import React from 'react'
import style from './Compare.module.scss'

interface Props {
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const CodeView = ({ setIsModalOpened }: Props) => {
  return (
    <div>
      <div className={style.codeview}>코드 보이는 창</div>
      <div>
        <button type="button" onClick={() => setIsModalOpened(true)}>
          코드 업로드
        </button>
      </div>
    </div>
  )
}

export default CodeView
