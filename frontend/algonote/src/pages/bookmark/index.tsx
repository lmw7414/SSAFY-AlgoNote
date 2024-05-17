'use client'

<<<<<<< 0eee4637ae28c60301c330c74113849e5551c847
import style from './bookmark.module.scss'
=======
import { useEffect } from 'react'
import styles from './bookmark.module.scss'
>>>>>>> 21d5124f3fc5b119a82cabd8434229f683992dd3
import Notes from '@/components/commons/Bookmark/Note'
import ResultNote from '@/components/commons/Bookmark/ResultNote'
import { FilterButton } from '@/components/commons/Buttons/Button'
import SearchInput from '@/components/commons/SearchInput'
import useSearchResult from '@/stores/search-store'

interface FilterSectionProps {
  title: string
  items: string[]
  itemKey: string
}

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비'] //
const category = ['구현', '그리디', '그래프', '플래티넘', 'DP', '자료구조'] // note.title

const FilterSection = ({ title, items, itemKey }: FilterSectionProps) => {
  return (
    <div className={style.bookmark}>
      <div>{title}</div>
      <div className={style.filterButton}>
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
  const { isSearched, resetSearch } = useSearchResult()

  useEffect(() => {
    resetSearch()
  }, [])

  return (
<<<<<<< 0eee4637ae28c60301c330c74113849e5551c847
    <div className={style.frame}>
      <div className={style.header}>
        <div className={style.headerSentence}>
          <p className={style.headerBold}>북마크한 노트를 확인해보세요</p>
        </div>
        <div className={style.headerSentence}>
          <p className={style.contentLight}>
            다시 보고 싶은 노트를 북마크할 수 있어요.
          </p>
        </div>
      </div>
      <div className={style.content}>
        <SearchInput />
        <FilterSection title="티어" items={tier} itemKey="tier" />
        <FilterSection title="유형" items={category} itemKey="category" />
        <div className={style.division_line} />
        <Notes />
      </div>
=======
    <div className={styles.frame}>
      <SearchInput />
      <FilterSection title="티어" items={tier} itemKey="tier" />
      <FilterSection title="유형" items={category} itemKey="category" />
      <div className={styles.division_line} />
      {isSearched ? <ResultNote /> : <Notes />}
>>>>>>> 21d5124f3fc5b119a82cabd8434229f683992dd3
    </div>
  )
}

export default Bookmark
