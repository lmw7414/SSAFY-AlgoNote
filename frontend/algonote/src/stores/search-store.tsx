import { create } from 'zustand'

interface Notes {
  noteId: number
  problemId: number
  noteTitle: string
  problemTier: number
  problemTitle: string
  memberNickname: string
  heartCnt: number
  bookmarked: boolean
  hearted: boolean
}

interface SearchResultType {
  notes: Notes[]
  noteCnt: number
}

interface SearchResultState {
  searchResult: SearchResultType
  isSearched: boolean
  setSearchResult: (result: SearchResultType) => void
  clearSearchResult: () => void
  resetSearch: () => void
}

const defaultState = {
  notes: [],
  noteCnt: 0,
}

const useSearchResult = create<SearchResultState>((set) => ({
  searchResult: defaultState,
  isSearched: false,
  setSearchResult: (result: SearchResultType) =>
    set({ searchResult: result, isSearched: true }),
  clearSearchResult: () => set({ searchResult: defaultState }),
  resetSearch: () => set({ searchResult: defaultState, isSearched: false }),
}))

export default useSearchResult
