import { create } from 'zustand'

interface CodeType {
  codes: string[]
  updateIndex: number
  updateCodes: (index: number, newCode: string) => void
  setUpdateIndex: (index: number) => void
  resetCodes: () => void
}

const useCodeInfo = create<CodeType>((set) => ({
  codes: [' ', ' '],
  updateIndex: 0,
  updateCodes: (index, newCode) =>
    set((state) => {
      const newCodes = [...state.codes]
      newCodes[index] = newCode
      return { codes: newCodes }
    }),
  setUpdateIndex: (index) => set({ updateIndex: index }),
  resetCodes: () =>
    set({
      codes: [' ', ' '],
    }),
}))

export default useCodeInfo
