import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './Pagination.module.scss'
import { getAllMySolvedList } from '@/apis/problemAxios'

interface Problem {
  id: number
  title: string
  tier: number
  tags: string[]
}

interface ProblemData {
  problem: Problem
  complete: string
  uploadDate: Date
}

interface PaginationProps {
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
  pageQuantity: number
  setMySolvedList: React.Dispatch<React.SetStateAction<ProblemData[]>>
}

interface PageButtonProps {
  pageNumber: number
  setPageNumber: Dispatch<SetStateAction<number>>
  setMySolvedList: React.Dispatch<React.SetStateAction<ProblemData[]>>
  selectedPage: number
  setSelectedPage: Dispatch<SetStateAction<number>>
}

const PageButton = ({
  pageNumber,
  setPageNumber,
  setMySolvedList,
  selectedPage,
  setSelectedPage,
}: PageButtonProps) => {
  useEffect(() => {
    console.log('selectedPage:', selectedPage)
  }, [selectedPage])

  const isSelected = pageNumber === selectedPage

  const paginationStyle = isSelected
    ? { background: '#3c87fe', color: '#ffffff' }
    : { background: '#ffffff', color: 'black' }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedPageNumber = parseInt(e.currentTarget.value, 10)
    setPageNumber(clickedPageNumber)
    setSelectedPage(clickedPageNumber)
    getAllMySolvedList(clickedPageNumber - 1).then((res) => {
      setMySolvedList(res)
    })
  }

  return (
    <div className={styles.pageBox} style={paginationStyle}>
      <button
        type="button"
        onClick={handleClick}
        value={pageNumber}
        style={paginationStyle}
      >
        {pageNumber}
      </button>
    </div>
  )
}

const Pagination = ({
  pageNumber,
  setPageNumber,
  pageQuantity,
  setMySolvedList,
}: PaginationProps) => {
  const [selectedPage, setSelectedPage] = useState(pageNumber)

  useEffect(() => {
    setSelectedPage(pageNumber)
    getAllMySolvedList(pageNumber).then((res) => {
      setMySolvedList(res)
    })
  }, [pageNumber, setMySolvedList])

  const pageNumbers = Array.from(
    { length: Math.min(pageQuantity, 3) },
    (_, index) => index + 1,
  )

  return (
    <div className={styles.wrapper}>
      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          pageNumber={page}
          setPageNumber={setPageNumber}
          setMySolvedList={setMySolvedList}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      ))}
    </div>
  )
}

export default Pagination
