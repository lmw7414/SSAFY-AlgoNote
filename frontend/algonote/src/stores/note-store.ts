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

interface Member {
  memberId: number
  nickname: string
  profileImg: string
}

interface Problem {
  id: number
  title: string
  tier: number
  acceptUserCount: number
  averageTries: number
  tags: string[]
}

interface NoteData {
  noteId: number
  member: Member
  problem: Problem
  noteTitle: string
  content: string
  heartCnt: number
  hearted: boolean
  createdAt: string
  modifiedAt: string
}

// 변경된 부분: NoteData 인터페이스 추가
interface NoteStore {
  tabs: NoteTab[]
  addTab: (tab: Omit<NoteTab, 'idx'>) => void
  removeTab: (idx: number) => void
  updateTab: (idx: number, updatedTab: Omit<NoteTab, 'idx'>) => void
  setCurSelectedIdx: (idx: number) => void
  setTabs: (tabs: Omit<NoteTab, 'idx'>[]) => void
  curSelectedIdx: number
  chats: Chats[]
  setChats: (newChat: Omit<Chats, 'idx'>) => void
  updateLastChat: (updatedChat: Chats) => void
  nowContent: string
  setNowContent: (content: string) => void
  updateAllNotes: (notes: NoteTab[]) => void
  selectedNoteData: NoteData | null
  setSelectedNoteData: (noteData: NoteData | null) => void
  modifiedTitle: string
  setModifiedTitle: (title: string) => void
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
      tabs: newTabs.map((tab, idx) => ({ ...tab, idx })),
      curSelectedIdx: 0,
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
        newChats[newChats.length - 1] = updatedChat
        newChats[newChats.length - 1].idx = newChats.length - 1
      }
      return { chats: newChats }
    }),
  nowContent: '',
  setNowContent: (content: string) => set(() => ({ nowContent: content })),

  updateAllNotes: (notes: NoteTab[]) =>
    set(() => ({
      tabs: notes.map((note, idx) => ({ ...note, idx })),
    })),

  selectedNoteData: null,
  setSelectedNoteData: (noteData) =>
    set(() => ({ selectedNoteData: noteData })),
  modifiedTitle: '',
  setModifiedTitle: (title: string) => set(() => ({ modifiedTitle: title })),
}))

export default useNoteStore
