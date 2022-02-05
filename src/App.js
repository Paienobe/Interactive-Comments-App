import Comment from './components/Comment'
import CommentInput from './components/CommentInput'
import React, { useEffect, useState } from 'react'
import data from './data.json'

function App() {
  const getLocalStorageData = () => {
    const storedData = localStorage.getItem('commentData')
    if (storedData) {
      return JSON.parse(storedData)
    } else {
      return data
    }
  }

  const [myData, setMyData] = useState(getLocalStorageData())

  const createNewComment = (content) => {
    if (content) {
      setMyData({
        ...myData,
        comments: [
          ...myData.comments,
          {
            content,
            createdAt: new Date(Date.now()).toLocaleDateString(),
            id: new Date().getTime(),
            replies: [],
            score: 0,
            user: {
              image: {
                png: './images/avatars/image-juliusomo.png',
                webp: './images/avatars/image-juliusomo.webp',
              },
              username: 'juliusomo',
            },
          },
        ],
        currentUser: {
          image: {
            png: './images/avatars/image-juliusomo.png',
            webp: './images/avatars/image-juliusomo.webp',
          },
          username: 'juliusomo',
        },
      })
    }
  }

  const getNewReplyData = (replyText, repliedUser, id) => {
    const replyData = {
      content: replyText,
      createdAt: new Date(Date.now()).toLocaleDateString(),
      id: new Date().getTime().toString(),
      replyingTo: repliedUser,
      score: 0,
      user: {
        image: {
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
    }

    const replyArrays = myData.comments.find((item) => {
      return item.id === id
    })

    replyArrays.replies = [...replyArrays.replies, replyData]

    setMyData({
      ...myData,
    })
  }

  const deleteComment = (id) => {
    setMyData({
      ...myData,
      comments: [
        ...myData.comments.filter((comment) => {
          return comment.id !== id
        }),
      ],
      currentUser: {
        image: {
          png: './images/avatars/image-juliusomo.png',
          webp: './images/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
    })
  }

  const editComment = (id, setState) => {
    const commentToEdit = myData.comments.find((comment) => {
      return comment.id === id
    })
    const textContent = commentToEdit.content
    console.log(textContent)
    setState(textContent)
  }

  const finishEdit = (id, newText) => {
    const textContent = myData.comments.find((item) => {
      return item.id === id
    })
    textContent.content = newText
    setMyData({ ...myData })
  }

  const deleteReply = (id) => {
    const commentWithReplyToBeDeleted = myData.comments.find((item) => {
      return item.replies.find((item) => {
        return item.id === id
      })
    })

    const myFilter = commentWithReplyToBeDeleted.replies.filter((reply) => {
      return reply.id !== id
    })

    commentWithReplyToBeDeleted.replies = myFilter
    setMyData({ ...myData })
  }

  const resetScore = (
    minusIsClicked,
    addIsClicked,
    setAddIsClicked,
    setMinusIsClicked
  ) => {
    if (minusIsClicked && addIsClicked) {
      setAddIsClicked(!addIsClicked)
      setMinusIsClicked(!minusIsClicked)
    }
  }

  const addLike = (addIsClicked, setAddIsClicked) => {
    if (!addIsClicked) {
      setAddIsClicked(true)
    }
  }

  const removeLike = (addIsClicked, setMinusIsClicked) => {
    if (addIsClicked) {
      setMinusIsClicked(true)
    }
  }

  const activateModal = (setOpenModal) => {
    setOpenModal(true)
  }

  const deactivateModal = (setOpenModal) => {
    setOpenModal(false)
  }

  const displayReplyInput = (setShowReplyInput) => {
    setShowReplyInput(true)
  }

  const editReply = (id, replyText) => {
    const commentWithReplyToBeEdited = myData.comments.find((item) => {
      return item.replies.find((item) => {
        return item.id === id
      })
    })

    const replyToBeEdited = commentWithReplyToBeEdited.replies.find((reply) => {
      return reply.id === id
    })

    replyToBeEdited.content = replyText
  }

  // const timer = (postTime) => {

  //   const currentTime = new Date().getTime()

  //   const differenceInTime = (currentTime - postTime) / 1000
  //   // setInterval(() => {
  //     if (differenceInTime / 60 < 1) {
  //       setTime( 'now' )
  //   } else if ((differenceInTime / 60 >= 1) && (differenceInTime / 60 < 60)) {
  //     setTime( `${Math.floor(differenceInTime / 60)} minutes ago` )
  //   } else if ((differenceInTime / 60 >= 60) && (differenceInTime / 60 < 1440)) {
  //     setTime( `${Math.floor(differenceInTime / 60 / 60)} hours ago` )
  //   } else if ((differenceInTime / 60 >= 1440) && (differenceInTime / 60 < 10080)) {
  //     setTime( `${Math.floor(differenceInTime / 60 / 60 / 24)} days ago` )
  //   } else if ((differenceInTime / 60 >= 10080) &&  (differenceInTime / 60 < 40320)) {
  //     setTime( `${Math.floor(differenceInTime / 60 / 60 / 24 / 7)} weeks ago` )
  //   } else if ((differenceInTime / 60 >= 40320) && (differenceInTime / 60 < 483840)) {
  //     setTime( `${Math.floor(differenceInTime / 60 / 60 / 24 / 7 / 4)} months ago` )
  //   } else if (differenceInTime / 60 >= 483840) {
  //     setTime( `${Math.floor(differenceInTime / 60 / 60 / 24 / 7 / 4 / 12)} years ago` )
  //   }
  //   // }, 1000)

  // }

  // const [time, setTime] = useState(timer(new Date().getTime()))

  const setLocalStorage = () => {
    localStorage.setItem('commentData', JSON.stringify(myData))
  }

  useEffect(() => {
    setLocalStorage()
  }, [myData])

  return (
    <main>
      <div className='container'>
        {myData.comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              {...comment}
              getNewReplyData={getNewReplyData}
              deleteComment={deleteComment}
              editComment={editComment}
              finishEdit={finishEdit}
              deleteReply={deleteReply}
              addLike={addLike}
              removeLike={removeLike}
              resetScore={resetScore}
              activateModal={activateModal}
              deactivateModal={deactivateModal}
              currentUser={myData.currentUser}
              displayReplyInput={displayReplyInput}
              editReply={editReply}
              // timer={timer}
            />
          )
        })}

        <CommentInput
          currentUser={myData.currentUser}
          createNewComment={createNewComment}
        />
      </div>
    </main>
  )
}

export default App
