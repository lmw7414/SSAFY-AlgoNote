import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import OpenAI from 'openai'
import s from './ChatBot.module.scss'
import useNoteStore from '@/stores/note-store'
import MyChatMessage from '../ChatMessage/MyChatMessage'
import GptChatMessage from '../ChatMessage/GptChatMessage'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

const ChatBot = () => {
  const [sending, setSending] = useState(false)
  const [answer, setAnswer] = useState<string | null>('')
  const [question, setQuestion] = useState('')
  const { chats, setChats, updateLastChat } = useNoteStore()

  useEffect(() => {
    console.log('챗: ', chats)
  }, [chats, answer])

  const openAI = async (msg: string) => {
    setSending(true)
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: msg }],
      model: 'gpt-4-turbo',
    })

    setAnswer(() => completion.choices[0].message.content)
    updateLastChat({ question, answer: completion.choices[0].message.content })

    setSending(false)
  }

  const handleSubmit = () => {
    openAI(question)
    setChats({ question, answer: '' })
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuestion(() => newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openAI(question)
      setChats({ question, answer: '' })
    }
  }

  return (
    <div className={s.container}>
      <h4>AlgoBot</h4>
      <div>
        <div className={s.answerCont}>
          {/* {sending ? (
            <div className={s.spinnerCont}>
              <div className={s.spinner} />
            </div>
          ) : (
            <p>{answer}</p>
          )} */}
          <MyChatMessage message="asdf" />
          <GptChatMessage message="asdf" />
        </div>
      </div>
      <div className={s.gptInputBox}>
        <input
          placeholder="알고봇에게 무엇이든 물어보세요"
          value={question}
          onChange={handleInput}
          onKeyDown={(event) => handleKeyDown(event)}
        />
        <button type="button" onClick={handleSubmit}>
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
