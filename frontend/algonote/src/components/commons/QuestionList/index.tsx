import { useRouter } from 'next/router'
import { SimpleButton } from '../Buttons/Button'
import TierImg from '../Tier'
import styles from './QuestionList.module.scss'

interface QuestionListProps {
  id: number
  title: string
  tier: number
  tags: string[]
  complete: string
  time: string
}

const QuestionList = ({
  id,
  title,
  tier,
  tags,
  complete,
  time,
}: QuestionListProps) => {
  const router = useRouter()
  const handleWriteNote = () => {
    const problemId = id
    router.push({
      pathname: '/writenote',
      query: { id: problemId, title },
    })
  }

  const dictionary: { [key: string]: string } = {
    math_theory: '수학 및 이론',
    graph_theory: '그래프',
    data_structure: '자료구조',
    optimization: '전략 및 최적화',
    implementation: '구현',
    string: '문자열',
    math: '수학',
    // arithmetic: '사칙연산',
    primality_test: '소수 판정',
    sieve: '에라토스테네스의 체',
    graphs: '그래프 이론',
    graph_traversal: '그래프 탐색',
    bfs: '너비 우선 탐색',
    dfs: '깊이 우선 탐색',
    shortest_path: '최단 경로',
    mst: '최소 스패닝 트리',
    topological_sorting: '위상 정렬',
    dijkstra: '다익스트라',
    floyd_warshall: '플로이드-워셜',
    tsp: '외판원 순회 문제',
    lca: '최소 공통 조상',
    data_structures: '자료구조',
    segtree: '세그먼트 트리',
    // hash_set: '해시를 사용한 집합과 맵',
    prefix_sum: '누적 합',
    stack: '스택',
    queue: '큐',
    hashing: '해싱',
    priority_queue: '우선순위 큐',
    deque: '덱',
    tree_set: '트리를 사용한 집합과 맵',
    dp: '다이나믹 프로그래밍',
    greedy: '그리디 알고리즘',
    divide_and_conquer: '분할 정복',
    binary_search: '이분 탐색',
    parametric_search: '매개 변수 탐색',
    knapsack: '배낭 문제',
    // lis: '가장 긴 증가하는 부분수열',
    recursion: '재귀',
    two_pointer: '두 포인터',
    simulation: '시뮬레이션',
    sorting: '정렬',
    bruteforcing: '브루트포스 알고리즘',
    backtracking: '백트래킹',
    bitmask: '비트마스킹',
    sliding_window: '슬라이딩 윈도우',
    manacher: '매내처 알고리즘',
    rabin_karp: '라빈-카프',
    kmp: 'KMP',
    trie: '트라이',
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.level}>
          <TierImg tier={tier} />
        </div>
        <div className={styles.questionNumber}>
          <p>{id}</p>
        </div>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.type}>
          <p>{tags.map((tag) => ` #${dictionary[tag]}`)}</p>
        </div>
        <div className={styles.summitDate}>
          <p>{time}</p>
        </div>
        <div className={styles.writeNote}>
          {complete === 'NOT_YET' ? (
            <SimpleButton
              text="노트 작성하기"
              onClick={handleWriteNote}
              style={{
                background: '#ffffff',
                border: '1.3px solid #3c87fe',
                color: '#3c87fe',
                fontSize: '0.9rem',
                fontFamily: 'Pretendard',
                width: '6.7rem',
                height: '2.2rem',
                borderRadius: '8px',
                fontWeight: '500',
              }}
            />
          ) : (
            <SimpleButton
              text="노트 보러가기"
              onClick={handleWriteNote}
              style={{
                border: 'none',
                fontSize: '0.9rem',
                fontFamily: 'Pretendard',
                width: '6.7rem',
                height: '2.2rem',
                borderRadius: '8px',
                fontWeight: '500',
              }}
            />
          )}
        </div>
      </div>
      <hr className={styles.bottomHr} />
    </div>
  )
}

export default QuestionList
