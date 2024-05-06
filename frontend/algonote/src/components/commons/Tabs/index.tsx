// import ReactMarkdown from 'react-markdown'
import { KeyboardEvent, SetStateAction, useState } from 'react'
import Image from 'next/image'
import MarkdownEditor from '../MarkdownEditor'
import s from './Tabs.module.scss'
import useNoteStore from '@/stores/note-store'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { title } = useNoteStore()

  const tabs = [
    {
      keys: 0,
      title: title.trim().length === 0 ? '새 풀이' : title,
      content: <MarkdownEditor />,
    },
    {
      keys: 1,
      title: title.trim().length === 0 ? '새 풀이' : title,
      content: <MarkdownEditor />,
    },
    {
      keys: 2,
      title: title.trim().length === 0 ? '새 풀이' : title,
      content: <MarkdownEditor />,
    },
  ]

  const handleTabClick = (index: SetStateAction<number>) => {
    setActiveTab(index)
  }

  const handleTabKeyDown = (
    index: SetStateAction<number>,
    e: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTab(index)
    }
  }

  // const [input, setInput] = useState()

  return (
    <div className={s.wrapper}>
      <div className={s.tabsTitle}>
        {tabs.map((tab, index) => (
          <div
            key={tab.keys}
            className={`${s.tabs} ${activeTab === index ? s.active : ''}`}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleTabKeyDown(index, e)}
            tabIndex={0}
            role="tab"
            aria-selected={activeTab === index ? 'true' : 'false'}
          >
            <div>{tab.title}</div>
            <div>
              <button type="button">
                <Image
                  src="/images/cancel.png"
                  alt="cancel"
                  width={12}
                  height={12}
                />
              </button>
            </div>
          </div>
        ))}
        <div className={s.addTab} role="button">
          <button type="button">+</button>
        </div>
      </div>
      <div className={s.tabsContent}>{tabs[activeTab].content}</div>
    </div>
  )
}

export default Tabs
