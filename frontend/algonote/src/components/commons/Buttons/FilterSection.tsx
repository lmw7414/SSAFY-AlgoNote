import { useState, useEffect } from 'react'
import { FilterButton } from './Button'
import style from './FilterSection.module.scss'
import { dictionary, category } from '@/pages/recommend/Category'
import useFilterStore from '@/stores/filter-store'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

const getKeyByValue = <T extends object>(
  obj: T,
  value: string,
): keyof T | undefined => {
  return Object.keys(obj).find((key) => obj[key as keyof T] === value) as
    | keyof T
    | undefined
}

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { addTier, addCategory, deleteTier, deleteCategory, resetFilter } =
    useFilterStore()

  useEffect(() => {
    resetFilter()
  }, [])

  const toggleFilter = (item: string | string, key: string) => {
    if (activeFilters.includes(item)) {
      // 활성화 상태이면 비활성화, 전역 데이터에서 제거
      setActiveFilters(activeFilters.filter((filter) => filter !== item))
      if (key === 'tier') {
        deleteTier(item)
      } else if (key === 'category') {
        const engCategory = getKeyByValue(dictionary, item) // 카테고리만 영어로 매핑 후 사용
        if (engCategory) {
          const subCategory = category[engCategory]
          deleteCategory(subCategory)
        }
      }
    } else {
      // 전역 데이터에 추가 (아이템키는 tier or category)
      setActiveFilters([...activeFilters, item])
      if (key === 'tier') {
        addTier(item)
      } else if (key === 'category') {
        const engCategory = getKeyByValue(dictionary, item)
        if (engCategory) {
          const subCategory = category[engCategory]
          addCategory(subCategory)
        }
      }
    }
  }

  return (
    <div className={style.bookmark}>
      <div>{title}</div>
      <div className={style.filterButton}>
        {items.map((item, index) => {
          const tierKey = `${itemKey}-${index}`
          return (
            <div key={tierKey}>
              <FilterButton
                text={item}
                onClick={() => toggleFilter(item, itemKey)}
                className="search"
                active={activeFilters.includes(item)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FilterSection
