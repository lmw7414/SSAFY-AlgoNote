import { create } from 'zustand'

interface NoteContentType {
  title: string
  content: string
}

interface NoteStore extends NoteContentType {
  setContent: (newContent: string) => void
  setTitle: (newTitle: string) => void
}

const useNoteStore = create<NoteStore>((set) => ({
  title: '',
  content: `
## 문제 해석





## 풀이 전략





## 코드





## 검증 및 회고
`, // 초기 상태
  setContent: (newContent: string) => set({ content: newContent }),
  setTitle: (newTitle: string) => set({ title: newTitle }),
}))

export default useNoteStore
