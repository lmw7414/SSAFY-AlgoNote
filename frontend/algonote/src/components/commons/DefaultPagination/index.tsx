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

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
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
