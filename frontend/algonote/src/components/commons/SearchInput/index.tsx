import { useRef } from 'react'
import Magnifier from '@public/images/magnifier.png'
import Image from 'next/image'
import styles from './SearchInput.module.scss'
import getSearchResult from '@/apis/searchAxios'
import useSearchResult from '@/stores/search-store'

const handleSearchResult = async (
  e: React.KeyboardEvent<HTMLInputElement>,
  input: HTMLInputElement | null,
) => {
  if (e.key === 'Enter' && input) {
    const { setSearchResult } = useSearchResult.getState()
    const response = await getSearchResult(input.value, 1)
    if(response.status===404){
      // 화면에 결과 없음 처리 추가해주기
      console.log(response.message)
    }
    setSearchResult(response)
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
