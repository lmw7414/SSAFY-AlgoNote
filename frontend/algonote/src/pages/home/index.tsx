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
          <div className={styles.imageBoxFirst}>
            <Image src="/images/firstimg.png" alt="second-image" fill />
          </div>
          <div className={styles.secondTitleBox}>
            <div className={styles.blackTitle}>
              <p>틀린 문제는</p>
              <p>
                <span>오답노트</span>에 정리해보세요
              </p>
            </div>
            <div className={styles.blackDescription}>
              <p>문제 분석부터 시간 복잡도까지</p>
              <p>
                <span>한 눈에</span> 볼 수 있는 템플릿을 제공해드려요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.secondWrapper}>
          <div className={styles.imageBox}>
            <Image src="/images/listimage.png" alt="second-image" fill />
          </div>
          <div className={styles.secondTitleBox}>
            <div className={styles.whiteTitle}>
              <p>부족한 유형은</p>
              <p>
                <span>추천 문제</span>로 대비하세요
              </p>
            </div>
            <div className={styles.whiteDescription}>
              <p>회원님의 제출 이력을 분석하여</p>
              <p>
                부족한 유형의 문제를 <span>추천</span>해드려요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.forthSection}>
        {' '}
        <div className={styles.secondWrapper}>
          <div className={styles.secondTitleBox}>
            <div className={styles.blackTitle}>
              <p>혼자 풀기 지루하다면?</p>
              <p>
                친구와<span> 1:1 코드배틀!</span>
              </p>
            </div>
            <div className={styles.lastDescription}>
              <p>친구들과 실시간으로</p>
              <p>
                <span>알고리즘</span>을 경쟁해보세요.
              </p>
            </div>
          </div>
          <div className={styles.imageBox}>
            <Image src="/images/listimage.png" alt="second-image" fill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
