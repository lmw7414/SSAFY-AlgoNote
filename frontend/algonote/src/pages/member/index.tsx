import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { LuPencil } from 'react-icons/lu'
import style from './member.module.scss'
import { nameChange, imageChange } from '@/apis/info-changeAxios'
import myInfo from '@/apis/user-infoAxios'
import { nicknameDupCheckApi } from '@/apis/userAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'

interface UserInfo {
  memberId: number
  email: string
  nickname: string
  profileImg: string
}

interface NicknameValidation {
  value: string
  status: boolean
}

const User = () => {
  // useState를 null 가능한 UserInfo 타입으로 설정
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null)
  const [nicknameState, setNicknameState] = useState<NicknameValidation>({
    value: '',
    status: false,
  })
  const [isChangeClicked, setIsChangeClicked] = useState<boolean>(false)
  const [nickname, setNickName] = useState<string>('')
  const fileInput = useRef<HTMLInputElement>(null)

  const handleImgChange = async (file: File) => {
    if (file instanceof File) {
      try {
        const response = await imageChange(file)
        if (response.status === 200) {
          const newImg = response.data.profileImgUrl

          setUserDetails((prevState) => {
            if (prevState) {
              return {
                ...prevState,
                profileImg: newImg,
              }
            }
            return prevState
          })
        }
      } catch (error) {
        throw error
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        handleImgChange(file)
      }
    }
  }

  const handleNameChange = async () => {
    try {
      const response = await nameChange(nickname)
      if (response.status === 200) {
        setNicknameState((prevData) => ({ ...prevData, value: '' }))
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

  const nicknameCheck = async () => {
    try {
      const response = await nicknameDupCheckApi(nickname)
      if (response) {
        handleNameChange()
      } else {
        setNicknameState((prevData) => ({
          ...prevData,
          value: '이미 사용중인 닉네임입니다.',
        }))
      }
    } catch (error) {
      throw error
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

  useEffect(() => {
    const idRegExp = /^[^\s]{2,14}$/
    const isLengthLimited = nickname && !idRegExp.test(nickname)

    if (isLengthLimited) {
      setNicknameState({
        value: '닉네임은 공백없는 2-14자이여야 합니다.',
        status: true,
      })
    } else {
      setNicknameState({ value: '', status: false })
    }
  }, [nickname])

  if (!userDetails) {
    return <div>Loading...</div>
  }

  // 사용자 정보 렌더링 로직
  return (
    <div className={style.info}>
      <Image
        src={userDetails.profileImg}
        alt="프로필 이미지"
        width={100}
        height={100}
      />

      <input
        type="file"
        hidden
        accept="image/* .jpg, .png, .jpeg"
        ref={fileInput}
        onChange={onChange}
      />

      <LuPencil
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click()
          }
        }}
      />

      <p>이메일: {userDetails.email}</p>
      <div className={style.nickname}>
        <p>닉네임: {userDetails.nickname}</p>

        {isChangeClicked ? (
          <>
            <input
              type="text"
              defaultValue={userDetails.nickname}
              onChange={(e) => setNickName(e.target.value)}
              maxLength={14}
            />
            <SimpleButton
              text="변경"
              onClick={nicknameCheck}
              isDisabled={nicknameState.status}
            />
            {nicknameState.value && <div>{nicknameState.value}</div>}
          </>
        ) : (
          <LuPencil onClick={() => setIsChangeClicked(true)} />
        )}
      </div>
    </div>
  )
}

export default User
