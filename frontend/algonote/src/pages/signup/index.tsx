import { useState, ChangeEvent } from 'react'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import s from './signup.module.scss'
import { signUpApi } from '@/apis/userAxios'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [authCode, setAuthCode] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [nickname, setNickname] = useState('')

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setEmail(newValue)
  }

  const handleAuthCode = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setAuthCode(newValue)
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setPassword(newValue)
  }

  const handlePassword2 = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setPassword2(newValue)
  }

  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setNickname(newValue)
  }

  const signUp = async () => {
    try {
      console.log('signUp call')
      signUpApi(email, password, nickname)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.signupContainer}>
        <div className={s.contents}>
          <div className={s.imgContainer}>
            <Image
              src="/images/loginLogo.png"
              alt="loginLogo"
              width={160}
              height={72.5}
            />
          </div>
          <div className={s.contents}>
            <div className={s.emailContainer}>
              <Input
                type="email"
                label="이메일"
                variant="underlined"
                value={email}
                onChange={handleEmail}
              />
              <Button>확인</Button>
            </div>
            <div className={s.authContainer}>
              <Input
                type="authCode"
                label="인증코드"
                variant="underlined"
                value={authCode}
                onChange={handleAuthCode}
              />
              <Button>인증</Button>
            </div>
            <Input
              type="password"
              label="비밀번호"
              variant="underlined"
              value={password}
              onChange={handlePassword}
            />
            <Input
              type="password2"
              label="비밀번호 확인"
              variant="underlined"
              value={password2}
              onChange={handlePassword2}
            />
            <div className={s.nicknameContainer}>
              <Input
                type="nickname"
                label="닉네임"
                variant="underlined"
                value={nickname}
                onChange={handleNickname}
              />
              <Button>중복 확인</Button>
            </div>
            <Button className={s.btn} onClick={signUp}>
              회원가입하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
