import { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import s from './signup.module.scss'
import {
  checkAuthCodeApi,
  emailDupCheckApi,
  loginApi,
  nicknameDupCheckApi,
  sendAuthCodeApi,
  signUpApi,
} from '@/apis/userAxios'
import { SimpleButton } from '@/components/commons/Buttons/Button'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [failedEmail, setFailedEmail] = useState('')
  const [emailState, setEmailState] = useState(0)
  const [authCode, setAuthCode] = useState('')
  const [authCodeState, setAuthCodeState] = useState(0)
  const [password, setPassword] = useState('')
  const [passwordState, setPasswordState] = useState(0)
  const [password2, setPassword2] = useState('')
  const [passwordState2, setPasswordState2] = useState(0)
  const [nickname, setNickname] = useState('')
  const [failedNickname, setFailedNickname] = useState('')
  const [nicknameState, setNicknameState] = useState(0)

  const router = useRouter()

  const handleInput = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const newValue = event.target.value
    if (type === 'email') {
      setEmail(newValue)
    } else if (type === 'authCode') {
      setAuthCode(newValue)
    } else if (type === 'password') {
      // 영문, 숫자 조합 8자 이상 20자 이하 여부 확인
      const idRegExp = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/
      setPassword(newValue)
      const check = idRegExp.test(newValue)
      if (check) {
        setPasswordState(1)
      } else {
        setPasswordState(2)
      }

      if (!newValue.length) {
        setPasswordState(0)
      }
    } else if (type === 'password2') {
      setPassword2(newValue)
      if (newValue === password) {
        setPasswordState2(1)
      } else if (!newValue.length) {
        setPasswordState2(0)
      } else {
        setPasswordState2(2)
      }
    } else if (type === 'nickname') {
      const idRegExp = /^.{2,14}$/
      setNickname(newValue)
      const check = idRegExp.test(newValue)
      if (check) {
        setNicknameState(3)
      } else {
        setNicknameState(4)
      }
      setNickname(newValue)
    }
  }

  const emailDupCheck = async () => {
    try {
      const response = await emailDupCheckApi(email)
      if (response) {
        console.log('사용 가능한 이메일입니다.')
        setEmailState(1)
      } else {
        setEmailState(2)
        setFailedEmail(email)
        console.log(emailState)
        console.log('이미 사용중인 이메일입니다.')
      }
    } catch (e) {
      console.log('이메일 중복체크 실패:', e)
    }
  }

  if (emailState === 2) {
    if (email !== failedEmail) {
      setFailedEmail('')
      setEmailState(0)
    }
  }

  const sendAuthCode = async () => {
    setEmailState(3)
    try {
      await sendAuthCodeApi(email)
      console.log('인증 코드 전송')
      window.alert('인증코드가 전송되었습니다.')
      setEmailState(1)
    } catch (e) {
      console.log('인증코드 전송 실패:', e)
      window.alert('인증코드 전송에 실패하였습니다.')
      setEmailState(1)
    }
  }

  const checkAuthCode = async () => {
    try {
      const response = await checkAuthCodeApi(email, authCode)
      if (response) {
        setAuthCodeState(1)
        console.log('인증 성공')
      } else {
        setAuthCodeState(2)
        console.log('인증 실패')
      }
    } catch (e) {
      console.log('인증 코드 체크 실패:', e)
    }
  }

  const nicknameDupCheck = async () => {
    if (nicknameState === 3) {
      try {
        const response = await nicknameDupCheckApi(nickname)
        if (response) {
          console.log('사용 가능한 닉네임입니다.')
          setNicknameState(1)
        } else {
          setNicknameState(2)
          setFailedNickname(nickname)
          console.log(emailState)
          console.log('이미 사용중인 닉네임입니다.')
        }
      } catch (e) {
        console.log('이메일 중복체크 실패:', e)
      }
    }
  }

  if (nicknameState === 2) {
    if (nickname !== failedNickname) {
      setFailedNickname('')
      setNicknameState(0)
    }
  }

  const signUp = async () => {
    if (
      emailState === 1 &&
      authCodeState === 1 &&
      passwordState === 1 &&
      passwordState2 === 1 &&
      nicknameState === 1
    ) {
      try {
        console.log('회원가입 요청')
        await signUpApi(email, password, nickname) // 로그인 API 호출
        console.log('회원가입 성공!')
        loginApi(email, password)
        router.push('/')
      } catch (error) {
        console.error('회원가입 실패:', error)
      }
    }
  }

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <div className={s.contents}>
          <Image
            src="/images/loginLogo.png"
            alt="loginLogo"
            width={100}
            height={75}
            className={s.logo}
          />
          <div className={s.inputsCont}>
            <p className={s.label}>이메일</p>
            <div className={s.inputCont}>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  handleInput(event, 'email')
                }}
                className={emailState === 2 ? s.inputFailed : s.input}
              />
              {emailState === 1 ? (
                <SimpleButton
                  text="코드 전송"
                  onClick={sendAuthCode}
                  style={{
                    width: '6rem',
                    height: '2rem',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    padding: '0',
                  }}
                />
              ) : emailState === 3 ? (
                <div className={s.spinnerCont}>
                  <div className={s.spinner} />
                </div>
              ) : (
                <SimpleButton
                  text="중복 확인"
                  onClick={emailDupCheck}
                  style={{
                    width: '6rem',
                    height: '2rem',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    padding: '0',
                  }}
                />
              )}
            </div>
            {emailState === 1 ? (
              <p className={s.validationSuccess}>사용 가능한 이메일입니다.</p>
            ) : emailState === 2 ? (
              <p className={s.validationFailed}>이미 사용중인 이메일입니다.</p>
            ) : (
              <p className={s.invisible}>이메일을 입력해주세요.</p>
            )}

            <div className={s.inputCont}>
              <input
                type="authCode"
                placeholder="인증코드"
                value={authCode}
                onChange={(event) => {
                  handleInput(event, 'authCode')
                }}
                className={s.input}
              />
              <SimpleButton
                text="인증"
                onClick={checkAuthCode}
                style={{
                  width: '6rem',
                  height: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  padding: '0',
                }}
              />
            </div>
            {authCodeState === 1 ? (
              <p className={s.validationSuccess}>인증되었습니다.</p>
            ) : authCodeState === 2 ? (
              <p className={s.validationFailed}>
                유효하지 않은 인증 코드입니다.
              </p>
            ) : (
              <p className={s.invisible}>인증 코드를 입력해주세요.</p>
            )}

            <p className={s.marginLabel}>비밀번호</p>
            <div className={s.inputCont}>
              <input
                type="password"
                value={password}
                onChange={(event) => {
                  handleInput(event, 'password')
                }}
                className={passwordState === 2 ? s.inputFailed : s.input}
              />
            </div>
            {passwordState === 1 ? (
              <p className={s.validationSuccess}>사용 가능한 비밀번호입니다.</p>
            ) : passwordState === 2 ? (
              <p className={s.validationFailed}>
                비밀번호는 영문, 숫자 조합 8-20자이여야 합니다.
              </p>
            ) : (
              <p className={s.invisible}>비밀번호를 입력해주세요.</p>
            )}

            <p className={s.label}>비밀번호 확인</p>
            <div className={s.inputCont}>
              <input
                type="password"
                value={password2}
                onChange={(event) => {
                  handleInput(event, 'password2')
                }}
                className={passwordState2 === 2 ? s.inputFailed : s.input}
              />
            </div>
            {passwordState2 === 1 ? (
              <p className={s.invisible}>비밀번호2를 입력해주세요.</p>
            ) : passwordState2 === 2 ? (
              <p className={s.validationFailed}>
                비밀번호가 일치하지 않습니다.
              </p>
            ) : (
              <p className={s.invisible}>비밀번호2를 입력해주세요.</p>
            )}

            <p className={s.marginLabel}>닉네임</p>
            <div className={s.inputCont}>
              <input
                type="nickname"
                value={nickname}
                onChange={(event) => {
                  handleInput(event, 'nickname')
                }}
                className={nicknameState === 2 ? s.inputFailed : s.input}
              />
              <SimpleButton
                text="중복 확인"
                onClick={nicknameDupCheck}
                style={{
                  width: '6rem',
                  height: '2rem',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  padding: '0',
                }}
              />
            </div>
            {nicknameState === 1 ? (
              <p className={s.validationSuccess}>사용 가능한 닉네임입니다.</p>
            ) : nicknameState === 2 ? (
              <p className={s.validationFailed}>이미 사용중인 닉네임입니다.</p>
            ) : nicknameState === 3 ? (
              <p className={s.invisible}>닉네임을 입력해주세요.</p>
            ) : nicknameState === 4 ? (
              <p className={s.validationFailed}>
                닉네임은 2-14자이여야 합니다.
              </p>
            ) : (
              <p className={s.invisible}>닉네임을 입력해주세요.</p>
            )}
          </div>

          <div className={s.btnCont}>
            <SimpleButton
              text="회원가입"
              onClick={signUp}
              style={{
                fontWeight: '500',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
