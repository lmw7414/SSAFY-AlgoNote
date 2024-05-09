import { ChangeEvent, useState } from 'react'
import OpenAI from 'openai'
import s from './ChatBot.module.scss'
import { SimpleButton } from '@/components/commons/Buttons/Button'

const ChatBot = () => {
  const [inputMsg, setInputMsg] = useState('')
  const [outputMsg, setOutputMsg] = useState<string | null>('')
  const [sending, setSending] = useState(false)

  const openai = new OpenAI({
    apiKey: 'sk-proj-JDtiHGMrXx8dG0RLnghtT3BlbkFJgW1Bu0oiqNvKfKMrKuNh',
    dangerouslyAllowBrowser: true,
  })

  const openAI = async (msg: string) => {
    setInputMsg('')
    setSending(true)
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: msg }],
      model: 'gpt-4-turbo',
    })

    console.log(completion.choices[0].message.content)
    setOutputMsg(completion.choices[0].message.content)
    setSending(false)
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputMsg(newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openAI(inputMsg)
    }
  }

  return (
    <div className={s.container}>
      <h1>임시 챗봇</h1>
      <div>
        <p>답변: </p>
        <div className={s.answerCont}>
          {sending ? (
            <div className={s.spinnerCont}>
              <div className={s.spinner} />
            </div>
          ) : (
            <p>{outputMsg}</p>
          )}
        </div>
      </div>
      <div>
        <input
          placeholder="질문을 입력하세요"
          value={inputMsg}
          onChange={handleInput}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <SimpleButton text="전송" onClick={() => openAI(inputMsg)} />
      </div>
    </div>
  )
}

export default ChatBot
