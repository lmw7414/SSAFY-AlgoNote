import { KeyboardEvent, SetStateAction, useState } from 'react'
import Image from 'next/image'
import MarkdownEditor from '../MarkdownEditor'
import s from './Tabs.module.scss'
import useNoteStore from '@/stores/note-store'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { title } = useNoteStore()
  const [tabs, setTabs] = useState([
    {
      keys: 0,
      title: title.trim().length === 0 ? '새 풀이' : title,
      content: <MarkdownEditor />,
    },
  ])

  const handleTabClick = (index: SetStateAction<number>) => {
    setActiveTab(index)
    console.log('클릭한 탭', index)
  }

  const handleTabKeyDown = (
    index: SetStateAction<number>,
    e: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTab(index)
    }
  }

  const handleAddButtonClick = () => {
    setTabs([
      ...tabs,
      {
        keys: tabs.length,
        title: title.trim().length === 0 ? '새 풀이' : title,
        content: <MarkdownEditor />,
      },
    ])

    setActiveTab(tabs.length)
  }

  const handleDeleteButtonClick = (key: number, event: React.MouseEvent) => {
    event.stopPropagation() // 이벤트 버블링 방지
    const newTabs = tabs.filter((tab) => tab.keys !== key)
    const deletedTabIndex = tabs.findIndex((tab) => tab.keys === key)
    console.log('삭제할 탭 인덱스', deletedTabIndex)

    setTabs(() => newTabs)

    if (deletedTabIndex === activeTab && deletedTabIndex >= 1) {
      setActiveTab(activeTab - 1)
    } else if (deletedTabIndex === 0) {
      setActiveTab(0)
    } else if (deletedTabIndex < activeTab) {
      setActiveTab(activeTab - 1)
    }
  }

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
              <button
                type="button"
                onClick={(e) => handleDeleteButtonClick(tab.keys, e)}
              >
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
          <button type="button" onClick={handleAddButtonClick}>
            +
          </button>
        </div>
      </div>
      <div className={s.tabsContent}>
        {tabs.length > 0 && tabs[activeTab] ? tabs[activeTab].content : null}
      </div>
    </div>
  )
}

export default Tabs
