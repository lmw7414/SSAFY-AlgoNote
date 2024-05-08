import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './login.module.scss'
import { loginApi } from '@/apis/userAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'
import useUserInfo from '@/stores/user-store'
import { getCookie } from '@/utils/cookie'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isUserValid, setIsUserValid] = useState(true)
  const [failedPassword, setFailedPassword] = useState('')
  const { setUserInfo } = useUserInfo()

  const router = useRouter()

  useEffect(() => {
    const accessToken = getCookie('access_token')
    if (accessToken) {
      router.push('/')
    }
  }, [])

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    setEmail(newValue)
  }

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setPassword(newValue)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // 기본 폼 제출 방지
    try {
      console.log('로그인 요청')
      const response = await loginApi(email, password) // 로그인 API 호출
      setUserInfo(response.data)
      console.log('로그인 성공!')
      router.push('/')
      // 로그인 성공 후 필요한 작업 수행 (예: 페이지 이동 등)
    } catch (e) {
      console.error('로그인 실패:', e)
      setIsUserValid(false)
      setFailedPassword(password)

      // 로그인 실패 처리
    }
  }

  // 로그인을 시도했을 때 이메일 혹은 비밀번호가 유효하지 않을 경우
  if (!isUserValid) {
    if (password !== failedPassword) {
      setFailedPassword('')
      setIsUserValid(true)
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
            className={s.logo}
          />
          <form onSubmit={handleSubmit}>
            <div className={s.inputsCont}>
              <div className={s.inputCont}>
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={handleEmail}
                  className={s.input}
                />
              </div>
              <div className={s.inputCont}>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={handlePassword}
                  className={isUserValid ? s.input : s.inputFailed}
                />
                <p className={isUserValid ? s.invisible : s.validation}>
                  이메일 또는 비밀번호가 잘못되었습니다.
                </p>
              </div>
            </div>
            <div className={s.btnCont}>
              <SimpleButton text="로그인" />
            </div>
          </form>
          <div className={s.bottom}>
            <p>아직 회원이 아니신가요?</p>
            <a href="./signup">회원가입하기</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
