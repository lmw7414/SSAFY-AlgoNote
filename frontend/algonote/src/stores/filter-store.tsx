import { create } from 'zustand'

interface FilterType {
  tiers: number[]
  categories: string[]
  addTier: (clickTier: number[]) => void
  deleteTier: (unclickTier: number[]) => void
  addCategory: (clickCategory: string[]) => void
  deleteCategory: (unclickCategory: string[]) => void
  resetFilter: () => void
}

const useFilterStore = create<FilterType>((set) => ({
  tiers: [],
  categories: [],
  addTier: (clickTier: number[]) =>
    set((prev) => ({ tiers: [...prev.tiers, ...clickTier] })),
  deleteTier: (unclickTier: number[]) =>
    set((state) => ({
      tiers: state.tiers.filter((it) => !unclickTier.includes(it)),
    })),
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
