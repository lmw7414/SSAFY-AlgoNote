import Magnifier from '@public/images/magnifier.png'
import Image from 'next/image'
import styles from './SearchInput.module.scss'

const SearchInput = () => {
  return (
    <div className={styles.border}>
      <div className={styles.input_div}>
        <input type="text" placeholder="검색어를 입력해주세요" maxLength={25} />
      </div>

      <div>
        <Image src={Magnifier} alt="검색창 버튼" height={24} />
      </div>
    </div>
  )
}

export default SearchInput
