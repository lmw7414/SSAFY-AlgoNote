import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Notification from '../Notification'
import styles from './NavBar.module.scss'
import { getNotificationsApi } from '@/apis/notificationAxios'
import myInfo from '@/apis/user-infoAxios'
import useUserInfo from '@/stores/user-store'
import { eraseCookie, getCookie } from '@/utils/cookie'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { deleteUserInfo } = useUserInfo()
  const [userProfile, setUserProfile] = useState('/images/basicprofileimg.png')
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isNotReadNoti, setIsNotReadNoti] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoggedIn) {
      const getNoti = async () => {
        const notis = await getNotificationsApi()
        if (!notis) {
          setIsNotReadNoti(false)
        } else if (notis.length >= 1) {
          setIsNotReadNoti(true)
        }
      }
      getNoti()
    }
    setIsProfileDropdownOpen(false)
  }, [isLoggedIn])

  const router = useRouter()
  const url = router.pathname

  useEffect(() => {
    myInfo()
      .then((res) => {
        if (res.status === 200) {
          setUserProfile(res.data.profileImg)
        } else {
          console.log('유저 정보 불러오기 실패')
        }
      })
      .catch((e) => {
        console.log('API 통신 오류')
        console.log(e)
      })
  }, [isImageLoaded])

  useEffect(() => {
    const checkLogin = async () => {
      const accessToken = getCookie('access_token')
      setIsLoggedIn(!!accessToken)
    }
    checkLogin()

    if (isNotificationOpen) {
      setIsNotificationOpen(false)
    }
  }, [url])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsProfileDropdownOpen])

  const logout = async () => {
    await eraseCookie('access_token')
    await eraseCookie('memberId')
    deleteUserInfo()
    router.replace('/')
  }

  const handleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      toggleProfileDropdown()
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        <div className={styles.logoSec}>
          <Link href={isLoggedIn ? '/' : '/landing'}>
            <Image src="/images/logo.png" alt="logo" width={112} height={20} />
          </Link>
        </div>
        <div className={styles.menuSec}>
          <Link href="/solvedproblems">
            <p>노트 작성</p>
          </Link>

          <Link href="/mynote">
            <p>내 노트</p>
          </Link>

          <Link href="/recommend">
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
              className={styles.icon}
            />
          </Link>
          <Link href="/bookmark">
            <Image
              src="/images/save.png"
              alt="saveIcon"
              width={21}
              height={21}
              className={styles.icon}
            />
          </Link>
          <div className={styles.notiCont}>
            {isNotReadNoti ? <div className={styles.redDot} /> : null}
            <Image
              src="/images/alarm.png"
              alt="alarmIcon"
              width={21}
              height={21}
              onClick={handleNotification}
              className={styles.icon}
            />
          </div>
        </div>
        {isLoggedIn ? (
          <div className={styles.profileSec}>
            <div
              className={styles.profileImageWrapper}
              onClick={toggleProfileDropdown}
              onKeyDown={handleKeyPress}
              tabIndex={0}
              role="button"
            >
              <Image
                src={isImageLoaded ? userProfile : '/images/logo.png'}
                alt="Img"
                width={30}
                height={30}
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </div>
            {isProfileDropdownOpen && (
              <div className={styles.profileDropdown} ref={modalRef}>
                <Link href="/member">
                  <p>마이페이지</p>
                </Link>
                <button type="button" onClick={logout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.loginSec}>
            <Link href="/login">
              <p>로그인</p>
            </Link>
          </div>
        )}
      </div>
      {isNotificationOpen ? (
        <Notification
          setIsNotReadNoti={setIsNotReadNoti}
          setIsNotificationOpen={setIsNotificationOpen}
        />
      ) : null}
    </div>
  )
}

export default NavBar
