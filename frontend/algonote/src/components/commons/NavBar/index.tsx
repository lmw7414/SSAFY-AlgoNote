import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SimpleButton } from '../Buttons/Button'
import styles from './NavBar.module.scss'
import useUserInfo from '@/stores/user-store'
import { eraseCookie, getCookie } from '@/utils/cookie'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { userInfo, deleteUserInfo } = useUserInfo()

  const router = useRouter()

  const url = router.pathname

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = getCookie('access_token')
      setIsLoggedIn(!!accessToken)
    }
    checkLogin()
  }, [url])

  const logout = async () => {
    await eraseCookie('access_token')
    await eraseCookie('memberId')
    deleteUserInfo()
    router.replace('/')
  }

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
                src={userInfo.profileImg}
                alt="profileImage"
                width={30}
                height={30}
              />
            </Link>
            <SimpleButton
              text="로그아웃"
              style={{
                width: '4rem',
                height: '2rem',
                fontSize: '0.8rem',
                padding: '0',
              }}
              onClick={logout}
            />
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
