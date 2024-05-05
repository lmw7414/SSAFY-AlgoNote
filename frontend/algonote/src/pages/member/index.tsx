import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { LuPencil } from 'react-icons/lu'
import style from './member.module.scss'
import { nameChange, ImageChange } from '@/apis/info-changeAxios'
import myInfo from '@/apis/user-infoAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'

interface UserInfo {
  memberId: number
  email: string
  nickname: string
  profileImg: string
}

const User = () => {
  // useState를 null 가능한 UserInfo 타입으로 설정합니다. 초기 상태를 null로 설정합니다.
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null)

  const [isChangeClicked, setIsChangeClicked] = useState<boolean>(false)
  const [nickname, setNickName] = useState<string>('')

  const handleNameChange = async () => {
    try {
      const response = await nameChange(nickname)
      if (response.status === 200) {
        setIsChangeClicked(false)
        setUserDetails((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              nickname,
            }
          }
          return prevState
        })
      }
    } catch (error) {
      console.log('닉네임 변경 실패', error)
    }
  }

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await myInfo()
        // API 응답을 상태에 저장하기 전에 형식이 맞는지 확인
        if (response && typeof response === 'object') {
          setUserDetails(response.data)
        }
      } catch (error) {
        console.error('내 정보 가져오기 실패:', error)
      }
    }

    fetchMyInfo()
  }, [])

  if (!userDetails) {
    return <div>Loading...</div>
  }

  // 사용자 정보 렌더링 로직
  return (
    <div className={style.info}>
      <p>이메일: {userDetails.email}</p>
      <div className={style.nickname}>
        <p>닉네임: {userDetails.nickname}</p>

        {isChangeClicked ? (
          <>
            <input
              type="text"
              defaultValue={userDetails.nickname}
              onChange={(e) => setNickName(e.target.value)}
            />
            <SimpleButton
              text="변경"
              onClick={() => {
                handleNameChange()
              }}
            />
          </>
        ) : (
          <LuPencil onClick={() => setIsChangeClicked(true)} />
        )}
      </div>

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
