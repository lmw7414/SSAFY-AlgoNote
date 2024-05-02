import Image from 'next/image'
import s from './writenote.module.scss'
import SubmitList from '@/components/commons/SubmitList'
import SubmitListTitle from '@/components/commons/SubmitListTitle'
import Tabs from '@/components/commons/Tabs'

const WriteNote = () => {
  const buttonClickHanlder = () => {
    console.log('버튼을 클릭했습니다.')
  }
  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <div className={s.submitWrapper}>
          <div className={s.submitTitleBox}>
            <span>제출 이력</span>
            <button
              className={s.button}
              onClick={buttonClickHanlder}
              type="button"
            >
              <Image
                src="/images/rectangle.png" // public 폴더 안의 이미지 경로
                alt="rectangle"
                width={20}
                height={20}
                layout="fixed" // 이미지 레이아웃 설정 (fixed, responsive, fill 등)
              />
            </button>
          </div>
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
        </div>
      </div>
      <div className={s.right}>
        <Tabs />
      </div>
    </div>
  )
}

export default WriteNote
