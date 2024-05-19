import { useRef } from 'react'
import Magnifier from '@public/images/magnifier.png'
import Image from 'next/image'
import styles from './SearchInput.module.scss'
import getFullNote from '@/apis/full-noteAxios'
import getSearchResult from '@/apis/searchAxios'
import { useSearchResult } from '@/stores/search-store'

export const onSearchResult = async (
  input: HTMLInputElement | null,
  index: number,
) => {
  const { setSearchResult, setSearchInput } = useSearchResult.getState()
  if (input) {
    if (input.value === '') {
      const response = await getFullNote(index, 101)
      setSearchResult(response)
    } else {
      const response = await getSearchResult(input.value, index)
      setSearchResult(response)
      setSearchInput(input)
    }
  }
}

const handleSearchResult = async (
  e: React.KeyboardEvent<HTMLInputElement>,
  input: HTMLInputElement | null,
  index: number,
) => {
  if (e.key === 'Enter' && input) {
    onSearchResult(input, index)
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
          placeholder="문제 번호, 문제 이름, 노트 제목으로 검색할 수 있어요"
          maxLength={25}
          onKeyDown={(e) => handleSearchResult(e, inputValue.current, 0)}
        />
      </div>

      <div>
        <Image
          src={Magnifier}
          alt="검색창 버튼"
          height={24}
          onClick={() => onSearchResult(inputValue.current, 0)}
        />
      </div>
    </div>
  )
}

export default SearchInput
