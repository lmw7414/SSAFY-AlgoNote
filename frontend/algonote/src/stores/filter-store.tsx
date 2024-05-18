import { create } from 'zustand'

interface FilterType {
  tier: string[]
  category: string[]
  addTier: (clickTier: string) => void
  deleteTier: (unclickTier: string) => void
  addCategory: (clickCategory: string) => void
  deleteCategory: (unclickCategory: string) => void
  resetFilter: () => void
}

const useFilterStore = create<FilterType>((set) => ({
  tier: [],
  category: [],
  addTier: (clickTier: string) =>
    set((prev) => ({ tier: [...prev.tier, clickTier] })),
  deleteTier: (unclickTier: string) =>
    set((state) => ({ tier: state.tier.filter((it) => it !== unclickTier) })),
  addCategory: (clickCategory: string) =>
    set((prev) => ({ category: [...prev.category, clickCategory] })),
  deleteCategory: (unclickCategory) =>
    set((state) => ({
      category: state.category.filter((it) => it !== unclickCategory),
    })),
  resetFilter: () => set({ tier: [], category: [] }),
}))

export default useFilterStore
