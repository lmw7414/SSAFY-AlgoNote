import Image from 'next/image'
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Image
          src="/images/rectangle.png"
          alt="rectangle"
          width={20}
          height={20}
          layout="fixed"
        />
        <p>2024.한국어 English 李殷圭</p>
        <p>알고노트 대표 이음규</p>
        <p>34153 대전광역시 유성구 동서대로 98-39, 105호</p>
        <p>
          사업자 등록번호 4XX-0X-XXXXX 통신판매업 신고 2024-대전유성-XXXX
          010-2717-6906
        </p>
      </div>
    </div>
  )
}

export default Footer
