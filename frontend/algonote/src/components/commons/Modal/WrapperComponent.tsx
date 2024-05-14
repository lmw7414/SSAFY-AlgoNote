import SubmitList from '@/components/commons/SubmitList'

interface CodeListProps {
  number: number
  result: string
  lang: string
  codeLength: number
  submitTime: string
  resultColor: string
  code: string
  onClick: React.MouseEventHandler<HTMLDivElement>
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>
}

const WrapperComponent = ({
  number,
  result,
  lang,
  codeLength,
  submitTime,
  resultColor,
  code,
  onClick,
  onKeyDown,
}: CodeListProps) => {
  return (
    <div>
      <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onKeyDown}>
        <SubmitList
          number={number}
          result={result}
          lang={lang}
          codeLength={codeLength}
          submitTime={submitTime}
          resultColor={resultColor}
          code={code}
        />
      </div>
    </div>
  )
}

export default WrapperComponent
