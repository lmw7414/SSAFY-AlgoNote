import { useState, ChangeEvent, FormEvent } from 'react'
// import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import s from './login.module.scss'
import { loginApi } from '@/apis/userAxios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    setEmail(newValue)
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setPassword(newValue)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 폼의 기본 동작 방지

    try {
      console.log('로그인 요청')
      await loginApi(email, password) // 로그인 API 호출
      console.log('로그인 성공!')
      // 로그인 성공 후 필요한 작업 수행 (예: 페이지 이동 등)
    } catch (error) {
      console.error('로그인 실패:', error)
      // 로그인 실패 처리
    }
  }

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <div className={s.contents}>
          <Image
            src="/images/loginLogo.png"
            alt="loginLogo"
            width={150}
            height={112.5}
          />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleEmail}
              className={s.emailInput}
            />
            <hr />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePassword}
              className={s.passwordInput}
            />
            {/* <Input
            type="email"
            label="이메일"
            variant="underlined"
            value={email}
            onChange={handleEmail}
          /> */}
            {/* <Input
            type="password"
            label="비밀번호"
            variant="underlined"
            value={password}
            onChange={handlePassword}
          /> */}
            <button type="submit" className={s.loginBtn}>
              로그인
            </button>
          </form>
          {/* <Button className={s.btn} onClick={login}>
            로그인
          </Button> */}
          <p>아직 회원이 아니신가요?</p>
          <a href="./signup">회원가입하기</a>
        </div>
      </div>
    </div>
  )
}

export default Login
