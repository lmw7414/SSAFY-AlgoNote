import { create } from 'zustand'

interface NoteTab {
  title: string
  content: string
  idx: number
}

interface Chats {
  question: string
  answer: string | null
}

interface NoteStore {
  tabs: NoteTab[]
  addTab: (tab: Omit<NoteTab, 'idx'>) => void
  removeTab: (idx: number) => void
  updateTab: (idx: number, updatedTab: Omit<NoteTab, 'idx'>) => void
  setCurSelectedIdx: (idx: number) => void
  setTabs: (tabs: Omit<NoteTab, 'idx'>[]) => void // 탭을 초기화하는 함수 추가
  curSelectedIdx: number
  chats: Chats[]
  setChats: (newChat: Chats) => void
  updateLastChat: (updatedChat: Chats) => void
}

const useNoteStore = create<NoteStore>((set) => ({
  tabs: [
    {
      title: '',
      content: '',
      idx: 0,
    },
  ],
  curSelectedIdx: 0,
  addTab: (tab) =>
    set((state) => ({
      tabs: [...state.tabs, { ...tab, idx: state.tabs.length }],
    })),
  removeTab: (idx) =>
    set((state) => ({
      tabs: state.tabs
        .filter((tab) => tab.idx !== idx)
        .map((tab, index) => ({ ...tab, idx: index })),
      curSelectedIdx:
        idx === state.curSelectedIdx
          ? 0
          : state.curSelectedIdx > idx
            ? state.curSelectedIdx - 1
            : state.curSelectedIdx,
    })),
  updateTab: (idx, updatedTab) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.idx === idx ? { ...tab, ...updatedTab } : tab,
      ),
    })),
  setCurSelectedIdx: (idx) =>
    set(() => ({
      curSelectedIdx: idx,
    })),
  setTabs: (newTabs) =>
    set(() => ({
      tabs: newTabs.map((tab, idx) => ({ ...tab, idx })), // 새 탭들에 idx를 할당
      curSelectedIdx: 0, // 현재 선택된 탭 인덱스를 초기화
    })),
  chats: [{ question: '', answer: '' }],
  // 새로운 챗을 추가하는 함수
  setChats: (newChat: Chats) =>
    set((state) => ({
      chats: [...state.chats, newChat],
    })),
  updateLastChat: (updatedChat: Chats) =>
    set((state) => {
      const newChats = state.chats.slice(0) // 현재 상태의 chats 배열을 복사
      if (newChats.length > 0) {
        newChats[newChats.length - 1] = updatedChat // 마지막 원소를 업데이트
      }
      return { chats: newChats }
    }),
}))

export default useNoteStore
