import { KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import MarkdownEditor from '../MarkdownEditor'
import s from './Tabs.module.scss'
import useNoteStore from '@/stores/note-store'

const Tabs = () => {
  const { tabs, curSelectedIdx, setCurSelectedIdx, addTab, removeTab } =
    useNoteStore()
  const [activeTab, setActiveTab] = useState(0)
  const [title] = useState('')

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setCurSelectedIdx(index)
  }

  const handleTabKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveTab(index)
    }
  }

  const handleAddButtonClick = () => {
    addTab({
      title: title.trim().length === 0 ? '' : title,
      content: '',
    })

    setActiveTab(tabs.length)
  }

  const handleDeleteButtonClick = (key: number, event: React.MouseEvent) => {
    event.stopPropagation() // 이벤트 버블링 방지

    const deletedTabIndex = tabs.findIndex((tab) => tab.idx === key)

    removeTab(key)

    if (deletedTabIndex === activeTab && deletedTabIndex >= 1) {
      setCurSelectedIdx(curSelectedIdx - 1)
    } else if (deletedTabIndex === 0) {
      setCurSelectedIdx(0)
    } else if (deletedTabIndex < activeTab) {
      setCurSelectedIdx(curSelectedIdx - 1)
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.tabsTitle}>
        {tabs.map((tab, index) => (
          <div
            key={tab.idx}
            className={`${s.tabs} ${activeTab === index ? s.active : ''}`}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleTabKeyDown(index, e)}
            tabIndex={0}
            role="tab"
            aria-selected={activeTab === index ? 'true' : 'false'}
          >
            <div>{tab.title?.length === 0 ? '새 노트' : tab.title}</div>
            <div>
              <button
                type="button"
                onClick={(e) => handleDeleteButtonClick(tab.idx, e)}
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
        {tabs.length > 0 && tabs[curSelectedIdx] ? (
          <MarkdownEditor currentTab={tabs[curSelectedIdx]} />
        ) : null}
      </div>
    </div>
  )
}

export default Tabs
