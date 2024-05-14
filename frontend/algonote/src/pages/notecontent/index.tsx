import React, { Suspense } from 'react'

const Editor = React.lazy(() => import('@/components/commons/Editor'))

const NoteContent = () => {
  return (
    <Suspense fallback={<div>로딩 중</div>}>
      <Editor />
    </Suspense>
  )
}

export default NoteContent
