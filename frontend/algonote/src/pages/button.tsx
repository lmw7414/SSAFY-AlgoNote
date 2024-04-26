'use client'

import { useState } from 'react'
import GPT from '@public/images/btn-new-chat.svg'
import BookmarkToggle from '@/components/commons/Buttons/BookmarkToggle'
import Button from '@/components/commons/Buttons/Button'
import ToggleButton from '@/components/commons/Buttons/ToggleButton'

const ButtonFunction = () => {
  const [count, setCount] = useState(0)
  const [isOff, setIsOff] = useState(false)

  return (
    <div>
      <Button text="기본버튼" onClick={() => setCount(count + 1)} />
      <Button
        text="돌아가기"
        onClick={() => setCount(count + 1)}
        className="back"
      />
      <Button
        text="추천검색어"
        onClick={() => setCount(count + 1)}
        className="recommend"
      />
      <Button
        text="검색필터"
        onClick={() => setCount(count + 1)}
        className="search"
      />
      <BookmarkToggle isOff onClick={() => setIsOff(!isOff)} />
      <ToggleButton imageSrc={GPT} onClick={() => setCount(count + 1)} />
    </div>
  )
}

export default ButtonFunction
