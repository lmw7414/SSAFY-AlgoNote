import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './NavBar.module.scss'
import { getCookie } from '@/utils/cookie'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = getCookie('access_token')
      setIsLoggedIn(!!accessToken)
    }
    checkLogin()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        <div className={styles.logoSec}>
          <Link href="/">
            <Image src="/images/logo.png" alt="logo" width={112} height={20} />
          </Link>
        </div>
        <div className={styles.menuSec}>
          <Link href="/writenote">
            <p>새 노트 작성</p>
          </Link>

          <Link href="/mynote">
            <p>내 노트</p>
          </Link>

          <Link href="/recommand">
            <p>문제 추천</p>
          </Link>

          <Link href="/compare">
            <p>코드 비교</p>
          </Link>
        </div>
        <div className={styles.blank} />
        <div className={styles.buttonSec}>
          <Link href="/search">
            <Image
              src="/images/search2.png"
              alt="searchIcon"
              width={21}
              height={21}
            />
          </Link>
          <Link href="/bookmark">
            <Image
              src="/images/save.png"
              alt="saveIcon"
              width={21}
              height={21}
            />
          </Link>
          <Link href="/alarm">
            <Image
              src="/images/alarm.png"
              alt="alarmIcon"
              width={21}
              height={21}
            />
          </Link>
        </div>
        {isLoggedIn ? (
          <div className={styles.profileSec}>
            <Link href="/member">
              <Image
                src="/images/profileImage.png"
                alt="profileImage"
                width={30}
                height={30}
              />
            </Link>
          </div>
        ) : (
          <div className={styles.loginSec}>
            <Link href="/login">
              <p>로그인</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
