import { KeyboardEvent, SetStateAction, useState } from 'react'
import Image from 'next/image'
import s from './Tabs.module.scss'

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { keys: 0, title: '새 풀이', content: '#ㅎㅇ' },
    { keys: 1, title: 'BFS 이용한 풀이', content: 'BFS 관련 내용' },
    { keys: 2, title: '메모이제이션', content: '메모이제이션 관련 내용' },
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
