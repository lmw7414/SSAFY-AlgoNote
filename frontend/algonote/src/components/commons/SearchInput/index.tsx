import { useRef } from 'react'
import Magnifier from '@public/images/magnifier.png'
import Image from 'next/image'
import styles from './SearchInput.module.scss'
import getSearchResult from '@/apis/searchAxios'

const handleSearchResult = async (
  e: React.KeyboardEvent<HTMLInputElement>,
  input: HTMLInputElement | null,
) => {
  if (e.key === 'Enter' && input) {
    const response = await getSearchResult(input.value, 1)
    console.log('검색결과', response.data)
  }
}

const SearchInput = () => {
  const inputValue = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.border}>
      <div className={styles.input_div}>
        <input
          ref={inputValue}
          type="text"
          placeholder="검색어를 입력해주세요"
          maxLength={25}
          onKeyDown={(e) => handleSearchResult(e, inputValue.current)}
        />
      </div>

      <div>
        <Image src={Magnifier} alt="검색창 버튼" height={24} />
      </div>
    </div>
  )
}

export default SearchInput
