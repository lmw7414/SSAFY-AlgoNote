'use client'

import Styles from './bookmark.module.scss'
import Notes from '@/components/commons/Bookmark/Note'
import { FilterButton } from '@/components/commons/Buttons/Button'
import SearchInput from '@/components/commons/SearchInput'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비']
const category = ['구현', '그리디', '그래프', '플래티넘', 'DP', '자료구조']

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  return (
    <div className={Styles.bookmark}>
      <div>{title}</div>
      <div className={Styles.filterButton}>
        {items.map((it, index) => {
          const tierKey = `${itemKey}-${index}`
          return (
            <div key={tierKey}>
              <FilterButton
                text={it}
                onClick={() => console.log('눌렸음')}
                className="search"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Bookmark = () => {
  return (
    <div className={Styles.frame}>
      <SearchInput />
      <FilterSection title="티어" items={tier} itemKey="tier" />
      <FilterSection title="유형" items={category} itemKey="category" />
      <div className={Styles.division_line} />
      <Notes />
    </div>
  )
}

export default Bookmark
