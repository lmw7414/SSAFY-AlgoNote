import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SimpleButton } from '../Buttons/Button'
import Notification from '../Notification'
import SSE from '../Notification/SSE'
import styles from './NavBar.module.scss'
import { getNotificationsApi } from '@/apis/notificationAxios'
import myInfo from '@/apis/user-infoAxios'
import useUserInfo from '@/stores/user-store'
import { eraseCookie, getCookie } from '@/utils/cookie'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { deleteUserInfo } = useUserInfo()
  const [userProfile, setUserProfile] = useState('/images/basicprofileimg')
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isNotReadNoti, setIsNotReadNoti] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      const getNoti = async () => {
        const notis = await getNotificationsApi()
        if (notis.length !== 0) {
          setIsNotReadNoti(true)
        } else {
          setIsNotReadNoti(false)
        }
      }
      getNoti()
    }
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
  }, [isImageLoaded]) // Removed userProfile dependency to avoid unnecessary re-fetching

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

  const logout = async () => {
    await eraseCookie('access_token')
    await eraseCookie('memberId')
    deleteUserInfo()
    router.replace('/')
  }

  const handleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
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
            {isLoggedIn ? <SSE /> : null}
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
            <Link href="/member">
              <Image
                src={isImageLoaded ? userProfile : '/images/logo.png'}
                alt="Img"
                width={30}
                height={30}
                onLoadingComplete={() => setIsImageLoaded(true)}
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
