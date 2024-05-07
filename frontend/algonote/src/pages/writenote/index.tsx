import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import s from './writenote.module.scss'
import SubmitList from '@/components/commons/SubmitList'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import Tabs from '@/components/commons/Tabs'
import { SimpleButton } from '@/components/commons/Buttons/Button'

const WriteNote = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const buttonClickHandler = () => {
    setIsCollapsed(!isCollapsed)
    console.log('버튼을 클릭했습니다.')
  }

  const handleClickButton = () => {
    console.log('버튼 클릭')
  }

  const rightStyle = isCollapsed ? { flex: 21 } : { flex: 3 }
  const buttonSecStyle = isCollapsed ? { width: '47.5%' } : { width: '37.5%' }
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
        <div className={s.buttonSection} style={buttonSecStyle}>
          <Link href="/">
            <div className={s.exitButtonSec}>
              <Image src="/images/back.png" alt="logo" width={25} height={25} />
              <button className={s.exitButton} type="button">
                나가기
              </button>
            </div>
          </Link>

          <SimpleButton
            text="저장하기"
            onClick={handleClickButton}
            style={{
              width: '6.5rem',
              height: '2.4rem',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default WriteNote
