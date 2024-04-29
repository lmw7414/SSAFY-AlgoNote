import styles from './Pagination.module.scss'

interface PageButtonProps {
  pageNumber: string
}

const PageButton = ({ pageNumber }: PageButtonProps) => {
  const handleClick = () => {}
  return (
    <div className={styles.pageBox}>
      <button type="button" onClick={handleClick}>
        {pageNumber}
      </button>
    </div>
  )
}

const Pagination = () => {
  return (
    <div className={styles.wrapper}>
      <PageButton pageNumber="1" />
      <PageButton pageNumber="2" />
      <PageButton pageNumber="3" />
      <PageButton pageNumber="4" />
    </div>
  )
}

export default Pagination
