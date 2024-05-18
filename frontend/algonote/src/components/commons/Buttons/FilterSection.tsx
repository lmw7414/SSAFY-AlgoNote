import { useState, useEffect } from 'react'
import { FilterButton } from './Button'
import style from './FilterSection.module.scss'
import useFilterStore from '@/stores/filter-store'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

type Category =
  | '구현'
  | '수학 및 이론'
  | '문자열'
  | '그래프'
  | '전략 및 최적화'
  | '자료구조'

type CategoryMapping = {
  [key in Category]: string
}

const categoryMapping: CategoryMapping = {
  구현: 'implementation',
  '수학 및 이론': 'math_theory',
  문자열: 'string',
  그래프: 'graph_theory',
  '전략 및 최적화': 'optimization',
  자료구조: 'data_structure',
}

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { addTier, addCategory, deleteTier, deleteCategory, resetFilter } =
    useFilterStore()

  useEffect(() => {
    resetFilter()
  }, [])

  const toggleFilter = (item: Category, key: string) => {
    // 매핑 함수 (카테고리일때만)
    if(key===)
    const engCategory = categoryMapping[item]

    if (activeFilters.includes(item)) {
      // 활성화 상태이면 비활성화, 전역 데이터에서 제거
      setActiveFilters(activeFilters.filter((filter) => filter !== item))
      if (key === 'tier') {
        deleteTier(item)
      } else if (key === 'category') {
        deleteCategory(item)
      }
    } else {
      // 전역 데이터에 추가 (아이템키는 tier or category)
      setActiveFilters([...activeFilters, item])
      if (key === 'tier') {
        addTier(item)
      } else if (key === 'category') {
        addCategory(item)
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
