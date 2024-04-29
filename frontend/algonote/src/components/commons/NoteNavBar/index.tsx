import Image from 'next/image'
import Link from 'next/link'
import styles from './NoteNavBar.module.scss'

const NoteNavBar = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Link href="/test">
          <Image
            src="/images/logoinnote.png" // 이미지 경로
            alt="logo"
            width={20}
            height={15}
          />
        </Link>
      </div>
      <div className={styles.myCategory}>
        <Link href="/test">
          <span>내가 푼 문제</span>
        </Link>
      </div>
      <div>
        <Image
          className={styles.greaterImage}
          src="/images/greaterwhite.png" // 이미지 경로
          alt="logo"
          width={20}
          height={20}
        />
      </div>
      <div className={styles.questionName}>
        <Link href="/test">
          <span>성현이의 5만원</span>
        </Link>
      </div>
    </div>
  )
}

export default NoteNavBar
