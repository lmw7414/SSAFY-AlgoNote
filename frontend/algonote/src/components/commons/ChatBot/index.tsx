import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import OpenAI from 'openai'
import s from './ChatBot.module.scss'

const ChatBot = () => {
  const [inputMsg, setInputMsg] = useState('')
  const [outputMsg, setOutputMsg] = useState<string | null>('')
  const [sending, setSending] = useState(false)
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const openAI = async (msg: string) => {
    setInputMsg('')
    setSending(true)
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: msg }],
      model: 'gpt-4-turbo',
    })

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
      <h3>AlgoBot</h3>
      <div>
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
      <div className={s.gptInputBox}>
        <input
          placeholder="알고봇에게 무엇이든 물어보세요"
          value={inputMsg}
          onChange={handleInput}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button type="button" onClick={() => openAI(inputMsg)}>
          <Image
            src="/images/gptsubmmitbtn.png"
            alt="gptsubmmitbtn"
            width={50}
            height={50}
          />
        </button>
      </div>
    </div>
  )
}

export default ChatBot
