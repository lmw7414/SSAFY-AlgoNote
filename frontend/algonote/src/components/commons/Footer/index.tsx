import Image from 'next/image'
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.top}>
          <div className={s.topLeft}>
            <Image
              src="/images/footer/[footer]box-logo.png"
              alt="box-logo"
              width={38}
              height={38}
              // layout="fixed"
            />
            <Image
              src="/images/footer/[footer]text-logo.png"
              alt="text-logo"
              width={160}
              height={38}
              // layout="fixed"
              className={s.textLogo}
            />
          </div>
          <Image
            src="/images/footer/[footer]github.png"
            alt="github"
            width={28.5}
            height={28.94}
            // layout="fixed"
          />
        </div>
        <div className={s.copyright}>
          <Image
            src="/images/footer/[footer]copyright.png"
            alt="copyright"
            width={13}
            height={13}
            layout="fixed"
          />
          <p>2024.한국어 English 李殷圭</p>
        </div>
        <div className={s.bottom}>
          <p>알고노트 대표 이음규</p>
          <p>34153 대전광역시 유성구 동서대로 98-39, 105호</p>
          <p>
            사업자 등록번호 4XX-0X-XXXXX 통신판매업 신고 2024-대전유성-XXXX
            010-2717-6906
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
