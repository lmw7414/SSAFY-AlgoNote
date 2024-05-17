import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './NoteNavBar.module.scss'

const NoteNavBar = () => {
  const router = useRouter()
  const { title } = router.query // 쿼리에서 id(선택한 문제 번호)를 추출
  return (
    <div className={styles.wrapper}>
      <div>
        <Link href="/">
          <Image
            src="/images/logoinnote.png" // 이미지 경로
            alt="logo"
            width={20}
            height={15}
          />
        </Link>
      </div>
      <div className={styles.myCategory}>
        <Link href="/solvedproblems">
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
        <Link href="/solvedproblems">
          <span>{title}</span>
        </Link>
      </div>
    </div>
  )
}

export default NoteNavBar
