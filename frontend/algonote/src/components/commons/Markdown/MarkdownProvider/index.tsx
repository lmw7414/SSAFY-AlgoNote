import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'

type MarkdownContextType = [string, Dispatch<SetStateAction<string>>]

const MarkdownContext = createContext<MarkdownContextType | null>(null)

interface MarkdownProviderProps {
  children: ReactNode
}

const MarkdownProvider: React.FC<MarkdownProviderProps> = ({ children }) => {
  const [markdown, setMarkdown] = useState('')

  // useMemo를 사용하여 배열을 생성할 때 타입 어설션을 사용하여 명시적으로 타입 지정
  const value = useMemo(
    () => [markdown, setMarkdown] as MarkdownContextType,
    [markdown, setMarkdown],
  )

  return (
    <MarkdownContext.Provider value={value}>
      {children}
    </MarkdownContext.Provider>
  )
}

// 커스텀 훅 정의
export const useMarkdown = () => {
  const context = useContext(MarkdownContext)
  if (!context) {
    throw new Error('useMarkdown must be used within a MarkdownProvider')
  }
  return context
}

export default MarkdownProvider
