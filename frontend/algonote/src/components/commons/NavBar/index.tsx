import Image from 'next/image'
import styles from './NavBar.module.scss'

const NavBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        <div className={styles.logoSec}>
          <Image
            src="/images/logo.png" // 이미지 경로
            alt="logo"
            width={120}
            height={15}
          />
        </div>
        <div className={styles.menuSec}>
          <p>새노트 작성</p>
          <p>내 노트</p>
          <p>문제 추천</p>
          <p>코드 비교</p>
        </div>
        <div className={styles.blank} />
        <div className={styles.buttonSec}>
          <Image
            src="/images/search.png" // 이미지 경로
            alt="searchIcon"
            width={16}
            height={10}
          />
          <Image
            src="/images/save.png" // 이미지 경로
            alt="saveIcon"
            width={16}
            height={10}
          />
          <Image
            src="/images/alarm.png" // 이미지 경로
            alt="alarmIcon"
            width={16}
            height={10}
          />
        </div>
        <div className={styles.profileSec}>
          <Image
            src="/images/profileImage.png" // 이미지 경로
            alt="profileImage"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  )
}

export default NavBar
