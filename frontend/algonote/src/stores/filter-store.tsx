import { create } from 'zustand'

interface FilterType {
  tiers: string[]
  categories: string[]
  addTier: (clickTier: string) => void
  deleteTier: (unclickTier: string) => void
  addCategory: (clickCategory: string[]) => void
  deleteCategory: (unclickCategory: string[]) => void
  resetFilter: () => void
}

const useFilterStore = create<FilterType>((set) => ({
  tiers: [],
  categories: [],
  addTier: (clickTier: string) =>
    set((prev) => ({ tiers: [...prev.tiers, clickTier] })),
  deleteTier: (unclickTier: string) =>
    set((state) => ({ tiers: state.tiers.filter((it) => it !== unclickTier) })),
  addCategory: (clickCategory: string[]) =>
    set((prev) => ({ categories: [...prev.categories, ...clickCategory] })),
  deleteCategory: (unclickCategory: string[]) =>
    set((state) => ({
      categories: state.categories.filter(
        (it) => !unclickCategory.includes(it),
      ),
    })),
  resetFilter: () => set({ tiers: [], categories: [] }),
}))

export default useFilterStore
