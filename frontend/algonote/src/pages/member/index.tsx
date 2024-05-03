import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import style from './member.module.scss'
import myInfo from '@/apis/userInfoAxios'
import useUserInfo from '@/stores/user-store'

interface UserInfo {
  memberId: number
  email: string
  nickname: string
  profileImg: string
}

const User = () => {
  const { userInfo } = useUserInfo()
  // useState를 null 가능한 UserInfo 타입으로 설정합니다. 초기 상태를 null로 설정합니다.
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null)

  useEffect(() => {
    const fetchMyInfo = async () => {
      if (userInfo.memberId) {
        try {
          const response = await myInfo(userInfo.memberId)
          // API 응답을 상태에 저장하기 전에 형식이 맞는지 확인합니다.
          if (response && typeof response === 'object') {
            setUserDetails(response.data)
          }
        } catch (error) {
          console.error('내 정보 가져오기 실패:', error)
        }
      }
    }

    fetchMyInfo()
  }, [])

  if (!userDetails) {
    return <div>Loading...</div>
  }

  console.log(userDetails.profileImg)

  // 사용자 정보 렌더링 로직
  return (
    <div className={style.info}>
      <p>이메일: {userDetails.email}</p>
      <p>닉네임: {userDetails.nickname}</p>
      <Image
        src={userDetails.profileImg}
        alt="프로필 이미지"
        width={100}
        height={100}
      />
    </div>
  )
}

export default User
