import { create } from 'zustand'

interface NoteTab {
  title: string
  content: string
  idx: number
}

interface Chats {
  question: string
  answer: string | null
  idx: number
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
  setChats: (newChat: Omit<Chats, 'idx'>) => void
  updateLastChat: (updatedChat: Chats) => void
  nowContent: string
  setNowContent: (content: string) => void
  flag: number
  setFlag: (val: number) => void
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
  chats: [
    {
      question: '',
      answer:
        '안녕하세요 저는 알고봇이에요. \n 질문이 있으시다면 무엇이든 물어보세요 :)',
      idx: 0,
    },
  ],
  setChats: (
    newChat: Omit<Chats, 'idx'>, // idx 제외
  ) =>
    set((state) => ({
      chats: [...state.chats, { ...newChat, idx: state.chats.length }],
    })),
  updateLastChat: (updatedChat: Chats) =>
    set((state) => {
      const newChats = state.chats.slice(0)
      if (newChats.length > 0) {
        newChats[newChats.length - 1] = updatedChat // 마지막 원소를 업데이트
        newChats[newChats.length - 1].idx = newChats.length - 1
      }
      return { chats: newChats }
    }),
  nowContent: '',
  setNowContent: (content: string) => set(() => ({ nowContent: content })),
  flag: 0,
  setFlag: (val: number) => set((state) => ({ flag: state.flag + val })),
}))

export default useNoteStore
