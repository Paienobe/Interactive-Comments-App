import { useGlobalContext } from './context'
import Comment from './components/Comment'
import CommentInput from './components/CommentInput'

function App() {
  const { myData } = useGlobalContext()
  return (
    <main>
      <div className='container'>
        {myData.comments.map((comment, index) => {
          return <Comment key={comment.id} {...comment} index={index} />
        })}

        <CommentInput currentUser={myData.currentUser} />
      </div>
    </main>
  )
}

export default App
