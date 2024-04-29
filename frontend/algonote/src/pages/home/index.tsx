import Image from 'next/image'
import styles from './home.module.scss'
import NavBar from '@/components/commons/NavBar'

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstSection}>
        <NavBar />
        <div className={styles.introduce}>
          <div className={styles.title}>
            <p>균형잡힌 알고리즘 공부</p>
            <p>
              <span className={styles.titleEmphasis}>알고노트</span>로
              시작하세요
            </p>
          </div>
          <div className={styles.description}>
            <p>
              · <span className={styles.emphasis}>수준별</span> 문제 추천
            </p>
            <p>
              · 간편한 정리노트 <span className={styles.emphasis}>템플릿</span>{' '}
              제공
            </p>
            <p>
              · 혼자 풀기 심심할 땐
              <span className={styles.emphasis}> 1:1 코드 배틀</span>
            </p>
          </div>
          <div className={styles.startButton}>지금 알고노트 시작하기</div>
          <div className={styles.warning}>
            <p>* 알고노트를 이용하기 위해 Chrome 브라우저를 이용해주세요.</p>
          </div>
        </div>
      </div>

      <div className={styles.secondSection}>
        <div className={styles.secondWrapper}>
          <div className={styles.secondImageBox}>
            <Image src="/images/secondMainImage.png" alt="second-image" fill />
          </div>
          <div className={styles.secondTitleBox}>
            <div className={styles.secondTitle}>
              <p>틀린 문제는</p>
              <p>
                <span>오답노트</span>에 정리해보세요
              </p>
            </div>
            <div className={styles.secondDescription}>
              <p>문제 분석부터 시간 복잡도까지</p>
              <p>
                <span>한 눈에</span> 볼 수 있는 템플릿을 제공해드려요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.thirdSection}>asdf</div>
      <div className={styles.forthSection}>asdf</div>
    </div>
  )
}

export default Home
