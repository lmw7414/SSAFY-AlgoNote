import { useState } from 'react'
import { FilterButton } from './Button'
import style from './FilterSection.module.scss'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (item: string) => {
    if (activeFilters.includes(item)) {
      // 활성화 상태이면 비활성화
      setActiveFilters(activeFilters.filter((filter) => filter !== item))
    } else {
      setActiveFilters([...activeFilters, item])
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
                onClick={() => toggleFilter(item)}
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
