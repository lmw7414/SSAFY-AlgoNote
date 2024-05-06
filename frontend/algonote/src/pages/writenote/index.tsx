import { useState } from 'react'
import Image from 'next/image'
import s from './writenote.module.scss'
import SubmitList from '@/components/commons/SubmitList'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import Tabs from '@/components/commons/Tabs'

const WriteNote = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const buttonClickHandler = () => {
    setIsCollapsed(!isCollapsed)
    console.log('버튼을 클릭했습니다.')
  }

  const rightStyle = isCollapsed ? { flex: 21 } : { flex: 3 } // 예시 너비, 실제 조건에 맞게 조절
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.submitWrapper}>
          <div className={s.submitTitleBox}>
            {!isCollapsed && <span>제출 이력</span>}
            <button
              className={s.button}
              onClick={buttonClickHandler}
              type="button"
            >
              <Image
                src="/images/rectangle.png"
                alt="rectangle"
                width={20}
                height={20}
                layout="fixed"
              />
            </button>
          </div>
          {/* isCollapsed가 false일 때만 내용을 보여줍니다. */}
          {!isCollapsed && (
            <div className={s.submitListBox}>
              <div className={s.submitListTitle}>
                <SubmitListTitle />
              </div>
              <div className={s.submitList}>
                <SubmitList
                  number="1"
                  result="맞았습니다!"
                  lang="python3"
                  codeLength="641B"
                  submitTime="3분 전"
                />
                <SubmitList
                  number="2"
                  result="맞았습니다!"
                  lang="python3"
                  codeLength="681B"
                  submitTime="19분 전"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={s.right} style={rightStyle}>
        <Tabs />
      </div>
    </div>
  )
}

export default WriteNote
