'use client'

import { useState } from 'react'
import Button from '@/components/commons/Button.tsx'

const ButtonFunction = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button
        text="wow"
        onClick={() => setCount(count + 1)}
        className="search"
      />
    </div>
  )
}

export default ButtonFunction
