import { useEffect, useState } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import s from './recommend.module.scss'
import recommendApi from '@/apis/recommendAxios'
import QuestionListRec from '@/components/commons/QuestionListRec'
import QuestionListRecTitle from '@/components/commons/QuestionListRecTitle'

interface Problem {
  problemId: number
  problemTitle: string
  tier: number
  acceptedUserCount: number
  averageTries: number
}

const Recommend = () => {
  const [mathTheoryProblems, setMathTheoryProblems] = useState<
    Array<Array<Problem>>
  >([])
  const [graphTheoryProblems, setGraphTheoryProblems] = useState<
    Array<Array<Problem>>
  >([])
  const [dataStructureProblems, setDataStructureProblems] = useState<
    Array<Array<Problem>>
  >([])
  const [optimizationProblems, setOptimizationProblems] = useState<
    Array<Array<Problem>>
  >([])
  const [implementationProblems, setImplementationProblems] = useState<
    Array<Array<Problem>>
  >([])
  const [stringProblems, setStringProblems] = useState<Array<Array<Problem>>>(
    [],
  )
  const [loading1, setLoading1] = useState<boolean>(true)
  const [loading2, setLoading2] = useState<boolean>(true)
  const [loading3, setLoading3] = useState<boolean>(true)
  const [loading4, setLoading4] = useState<boolean>(true)
  const [loading5, setLoading5] = useState<boolean>(true)
  const [loading6, setLoading6] = useState<boolean>(true)

  const category = {
    math_theory: ['math', 'primality_test', 'sieve'],
    graph_theory: [
      'graphs',
      'graph_traversal',
      'bfs',
      'dfs',
      'shortest_path',
      'mst',
      'topological_sorting',
      'dijkstra',
      'floyd_warshall',
      'tsp',
      'lca',
    ],
    data_structure: [
      'data_structures',
      'segtree',
      // 'hash_set',
      'prefix_sum',
      'stack',
      'queue',
      'hashing',
      'priority_queue',
      'deque',
      'tree_set',
    ],
    optimization: [
      'dp',
      'greedy',
      'divide_and_conquer',
      'binary_search',
      'parametric_search',
      'knapsack',
      // 'lis',
      'recursion',
      'two_pointer',
    ],
    implementation: [
      'implementation',
      'simulation',
      'sorting',
      'bruteforcing',
      'backtracking',
      'bitmask',
      'sliding_window',
    ],
    string: ['manacher', 'rabin_karp', 'kmp', 'string', 'trie'],
  }

  const dictionary: { [key: string]: string } = {
    math_theory: '수학',
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
    manacher: '매내처',
    rabin_karp: '라빈-카프',
    kmp: 'KMP',
    trie: '트라이',
  }

  useEffect(() => {
    const fetchData = () => {
      const mathTheory = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        // 비동기적으로 각 태그에 대한 recommendApi 호출 및 결과 수집
        await Promise.all(
          category.math_theory.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )

        // 모든 결과를 한 번에 업데이트
        setMathTheoryProblems([...updatedProblems])
        setLoading1(false)
        console.log([...updatedProblems])
      }

      const graphTheory = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        await Promise.all(
          category.graph_theory.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )
        setGraphTheoryProblems([...updatedProblems])
        setLoading2(false)
      }

      const dataStructure = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        await Promise.all(
          category.data_structure.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )

        setDataStructureProblems([...updatedProblems])
        setLoading3(false)
      }

      const optimization = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        await Promise.all(
          category.optimization.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )

        setOptimizationProblems([...updatedProblems])
        setLoading4(false)
      }

      const implementation = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        await Promise.all(
          category.implementation.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )

        setImplementationProblems([...updatedProblems])
        setLoading5(false)
      }

      const string = async () => {
        const updatedProblems: Array<Array<Problem>> = []

        await Promise.all(
          category.string.map(async (tag) => {
            const tagResponse = await recommendApi(tag, 0, 3)
            updatedProblems.push(tagResponse) // 결과를 배열에 추가
          }),
        )

        setStringProblems([...updatedProblems])
        setLoading6(false)
      }
      mathTheory()
      graphTheory()
      dataStructure()
      optimization()
      implementation()
      string()
    }
    // const fetchData = async () => {
    //   try {
    //     const fetchMathTheory = async () => {
    //       const updatedProblems = await Promise.all(
    //         category.math_theory.map(async (tag) => {
    //           const tagResponse = await recommendApi(tag, 0, 3)
    //           return tagResponse
    //         }),
    //       )
    //       console.log('Math Theory Problems:', updatedProblems)
    //       setMathTheoryProblems(updatedProblems)
    //     }

    //     // 다른 카테고리에 대해서도 동일하게 처리

    //     await Promise.all([
    //       fetchMathTheory(),
    //       // Fetch other categories
    //     ])
    //   } catch (error) {
    //     console.error('Error fetching data:', error)
    //   }
    // }
    fetchData()
  }, [])

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.headerSentence}>
          <p className={s.headerBold}>추천 문제를 알려드릴게요</p>
        </div>
        <div className={s.headerSentence}>
          <p className={s.contentLight}>
            부족한 유형, 많이 틀린 유형을 집중적으로 공부해보세요. 해결한 문제는
            오답노트에서 확인할 수 있어요.
          </p>
        </div>
      </div>
      <div className={s.content}>
        <div className={s.firstCategoryCont}>
          <p className={s.categoryTitle}>수학 및 이론</p>
          {loading1 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {mathTheoryProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.math_theory[index]]}
                    </p>
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={s.categoryCont}>
          <hr className={s.divide} />
          <p className={s.categoryTitle}>그래프</p>
          {loading2 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {graphTheoryProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.graph_theory[index]]}
                    </p>
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={s.categoryCont}>
          <hr className={s.divide} />
          <p className={s.categoryTitle}>자료구조</p>
          {loading3 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {dataStructureProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.data_structure[index]]}
                    </p>
                    {/* <p>{days}</p> */}
                    {/* <p>일 동안 풀지 않았어요</p> */}
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={s.categoryCont}>
          <hr className={s.divide} />
          <p className={s.categoryTitle}>전략 및 최적화</p>
          {loading4 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {optimizationProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.optimization[index]]}
                    </p>
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={s.categoryCont}>
          <hr className={s.divide} />
          <p className={s.categoryTitle}>구현</p>
          {loading5 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {implementationProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.implementation[index]]}
                    </p>
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className={s.categoryCont}>
          <hr className={s.divide} />
          <p className={s.categoryTitle}>문자열</p>
          {loading6 ? (
            <div className={s.loadingCont}>
              <p>적합한 추천 문제를 선별 중이에요...</p>
            </div>
          ) : (
            <>
              {stringProblems.map((tag, index) => (
                <div className={s.tagCont} key={uuidv4()}>
                  <div className={s.tagTitleCont}>
                    <p className={s.tagTitle}>
                      {dictionary[category.string[index]]}
                    </p>
                  </div>
                  <QuestionListRecTitle />
                  {tag.map((problem: Problem) => (
                    <Link
                      href={`https://www.acmicpc.net/problem/${problem.problemId}`}
                      key={problem.problemId}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div className={s.problem}>
                        <QuestionListRec
                          id={problem.problemId}
                          title={problem.problemTitle}
                          tier={problem.tier}
                          acceptedUserCount={problem.acceptedUserCount}
                          averageTries={problem.averageTries}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recommend
