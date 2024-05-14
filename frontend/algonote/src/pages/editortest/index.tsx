import dynamic from 'next/dynamic'

const EditorTest = () => {
  const Editor = dynamic(() => import('@/components/commons/Editor'), {
    ssr: false,
  })
  return (
    <div>
      <h1>gdgd</h1>
      <h1>gdgd</h1>
      <h1>gdgd</h1>
      <Editor />
    </div>
  )
}

export default EditorTest
