import styles from './DefaultPagination.module.scss'

interface PaginationType {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

const DefaultPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleClick = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  // const renderPageNumbers = () => {
  //   const pageNumbers = []
  //   const maxPageButtons = 5
  //   let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  //   let endPage = startPage + maxPageButtons - 1

  //   if (endPage > totalPages) {
  //     endPage = totalPages
  //     startPage = Math.max(1, endPage - maxPageButtons + 1)
  //   }

  //   for (let i = startPage; i <= endPage; i = +1) {
  //     pageNumbers.push(
  //       <button
  //         key={i}
  //         type="button"
  //         onClick={() => handleClick(i)}
  //         className={currentPage === i ? styles.active : ''}
  //       >
  //         {i}
  //       </button>,
  //     )
  //   }

  //   return pageNumbers
  // }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {/* {renderPageNumbers()} */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          type="button"
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? styles.active : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default DefaultPagination
