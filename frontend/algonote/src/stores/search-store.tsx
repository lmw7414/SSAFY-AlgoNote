import { create } from 'zustand'

interface Notes {
  noteId: number
  problemId: number
  noteTitle: string
  problemTitle: string
  memberNickname: string
}

interface Problems {
  problemId: number
  problemTitle: string
  tier: number
  tags: string[]
}

interface SearchResultType {
  notes: Notes[]
  problems: Problems[]
}

interface SearchResultState {
  searchResult: SearchResultType
  isSearched: boolean
  setSearchResult: (result: SearchResultType) => void
  clearSearchResult: () => void
  resetSearch: () => void
}

const defaultState = {
  notes: [
    {
      noteId: 0,
      problemId: 0,
      noteTitle: '',
      problemTitle: '',
      memberNickname: '',
    },
  ],
  problems: [
    {
      problemId: 0,
      problemTitle: '',
      tier: 0,
      tags: [],
    },
  ],
}

const useSearchResult = create<SearchResultState>((set) => ({
  searchResult: defaultState,
  isSearched: false,
  setSearchResult: (result: SearchResultType) =>
    set({ searchResult: result, isSearched: true }),
  clearSearchResult: () => set({ searchResult: { notes: [], problems: [] } }),
  resetSearch: () => set({ isSearched: false }),
}))

export default useSearchResult
