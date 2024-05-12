import { create } from 'zustand'

interface CodeType {
  setCodeInfo: (code: string) => void
  code: string
}

const useCodeInfo = create<CodeType>((set) => ({
  code: '',
  setCodeInfo: (code) => set(() => ({ code })),
}))

export default useCodeInfo
