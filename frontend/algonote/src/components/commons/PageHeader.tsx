import s from './PageHeader.module.scss'

interface PageHeaderProps {
  title: string
  desc: string
}

const PageHeader = ({ title, desc }: PageHeaderProps) => {
  return (
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      <p className={s.desc}>{desc}</p>
    </div>
  )
}

export default PageHeader
