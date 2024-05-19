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
  tags: string[]
}

interface SearchResultType {
  notes: Notes[]
  noteCnt: number
}

interface SearchResultState {
  searchResult: SearchResultType
  isSearched: boolean
  inputValue: HTMLInputElement | null
  setSearchResult: (result: SearchResultType) => void
  clearSearchResult: () => void
  resetSearch: () => void
  setSearchInput: (input: HTMLInputElement) => void
}

const defaultState = {
  notes: [],
  noteCnt: 0,
}

const useSearchResult = create<SearchResultState>((set) => ({
  searchResult: defaultState,
  isSearched: false,
  inputValue: null,
  setSearchResult: (result: SearchResultType) =>
    set({ searchResult: result, isSearched: true }),
  clearSearchResult: () => set({ searchResult: defaultState }),
  resetSearch: () => set({ searchResult: defaultState, isSearched: false }),
  setSearchInput: (input: HTMLInputElement) => set({ inputValue: input }),
}))

export type { Notes }
export { useSearchResult }
