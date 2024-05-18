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

const getTierRange = (tier: string) => {
  if (tier === '브론즈') {
    return [1, 2, 3, 4, 5]
  }
  if (tier === '실버') {
    return [6, 7, 8, 9, 10]
  }
  if (tier === '골드') {
    return [11, 12, 13, 14, 15]
  }
  if (tier === '플레티넘') {
    return [16, 17, 18, 19, 20]
  }
  if (tier === '다이아') {
    return [20, 21, 22, 23, 24, 25]
  }
  if (tier === '루비') {
    return [26, 27, 28, 29, 30]
  }
  return [0]
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
        const tierRange = getTierRange(item)
        deleteTier(tierRange)
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
        const tierRange = getTierRange(item)
        addTier(tierRange)
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
