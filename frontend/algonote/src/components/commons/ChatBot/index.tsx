import { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import OpenAI from 'openai'
import GptChatMessage from '../ChatMessage/GptChatMessage'
import MyChatMessage from '../ChatMessage/MyChatMessage'
import s from './ChatBot.module.scss'
import useNoteStore from '@/stores/note-store'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

const ChatBot = () => {
  const [answer, setAnswer] = useState<string | null>('')
  const [question, setQuestion] = useState('')
  const { chats, setChats, updateLastChat } = useNoteStore()

  useEffect(() => {
    console.log('챗: ', chats)
  }, [chats, answer])

  const openAI = async (msg: string) => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: msg }],
      model: 'gpt-4o',
    })

    setAnswer(() => completion.choices[0].message.content)
    updateLastChat({
      question,
      answer: completion.choices[0].message.content,
      idx: chats.length - 1,
    })
  }

  const handleSubmit = () => {
    openAI(question)
    setChats({ question, answer: '' })
    setQuestion(() => '')
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuestion(() => newValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      openAI(question)
      setChats({ question, answer: '' })
      setQuestion(() => '')
    }
  }

  // chats 상태가 변경될 때마다 스크롤을 아래로 내림
  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer')

    // chatContainer가 존재하고, 채팅이 존재하는 경우에만 스크롤을 아래로 내립니다.
    if (chatContainer && chats.length > 0) {
      const lastChatElement = chatContainer.lastChild as HTMLElement
      lastChatElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chats])

  return (
    <div className={s.container}>
      <h4>AlgoBot</h4>
      <div>
        <div id="chatContainer" className={s.answerCont}>
          {chats.map((chat) => (
            <div key={chat.idx} className={s.chatSection}>
              {chat.question !== '' ? (
                <div className={s.myChatSection}>
                  <MyChatMessage message={chat.question} />
                </div>
              ) : (
                <div />
              )}
              <div className={s.blankSection} />
              {chat.answer !== '' ? (
                <div className={s.gptChatSection}>
                  <GptChatMessage message={chat.answer} />
                </div>
              ) : (
                <div className={s.spinnerCont}>
                  <div className={s.spinner} />
                </div>
              )}
              <div className={s.blankSection} />
            </div>
          ))}
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
