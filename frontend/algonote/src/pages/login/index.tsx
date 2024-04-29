import { useState, ChangeEvent } from 'react'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import s from './login.module.scss'

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

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <Image
          src="/images/loginLogo.png"
          alt="loginLogo"
          width={320}
          height={145}
        />
        <Input
          type="email"
          label="이메일"
          variant="underlined"
          value={email}
          onChange={handleEmail}
        />
        <Input
          type="password"
          label="비밀번호"
          variant="underlined"
          value={password}
          onChange={handlePassword}
        />
        <Button className={s.btn}>로그인</Button>
        <p>아직 회원이 아니신가요?</p>
        <a href="./signup">회원가입하기</a>
      </div>
    </div>
  )
}

export default Login
