import Styles from './bookmark.module.scss'
import Note from '@/components/commons/Bookmark/Note'
import { FilterButton } from '@/components/commons/Buttons/Button'
import SearchInput from '@/components/commons/SearchInput'

const tier = ['브론즈', '실버', '골드', '플레티넘', '다이아', '루비']
const category = ['구현', '그리디', '그래프', '플래티넘', 'DP', '자료구조']

const Bookmark = () => {
  return (
    <div>
      <SearchInput />
      <div className={Styles.bookmark}>
        <div>티어</div>
        <div className={Styles.filterButton}>
          {tier.map((it, index) => {
            const tierKey = `tier-${index}`
            return (
              <div key={tierKey}>
                <FilterButton
                  text={it}
                  onClick={() => console.log('눌렸음')}
                  className="search"
                  initialClicked={false}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className={Styles.bookmark}>
        <div>유형</div>
        <div className={Styles.filterButton}>
          {category.map((it, index) => {
            const categoryKey = `tier-${index}`
            return (
              <div key={categoryKey}>
                <FilterButton
                  text={it}
                  onClick={() => console.log('눌렸음')}
                  className="search"
                  initialClicked={false}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className={Styles.division_line} />
      <Note />
    </div>
  )
}

export default Bookmark
