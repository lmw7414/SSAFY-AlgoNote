import GptChatMessage from '@/components/commons/ChatMessage/GptChatMessage'
import MyChatMessage from '@/components/commons/ChatMessage/MyChatMessage'

const Test = () => {
  return (
    <div
      style={{
        paddingTop: '10rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}
    >
      <MyChatMessage message="내 질문입니다" />
      <GptChatMessage message="GPT의 답변입니다" />
    </div>
  )
}

export default Test
