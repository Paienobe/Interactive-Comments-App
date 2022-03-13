import React, { useContext, useEffect, useState } from 'react'
import data from './data.json'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const getLocalStorageData = () => {
    const storedData = localStorage.getItem('commentData')
    if (storedData) {
      return JSON.parse(storedData)
    } else {
      return data
    }
  }

  const [myData, setMyData] = useState(getLocalStorageData())

  const [currentUser, setCurrentUser] = useState(myData.currentUser)

  const [deleteAComment, setDeleteAComment] = useState(false)

  const [deleteAReply, setDeleteAReply] = useState(false)

  // FUNCTIONS

  // creating Comments
  const createNewComment = (content) => {
    if (content) {
      setMyData({
        ...myData,
        comments: [
          ...myData.comments,
          {
            content,
            createdAt: 'now',
            id: new Date().getTime(),
            replies: [],
            score: 0,
            user: {
              image: {
                png: './assets/avatars/image-juliusomo.png',
                webp: './assets/avatars/image-juliusomo.webp',
              },
              username: 'juliusomo',
            },
          },
        ],
        currentUser: {
          image: {
            png: './assets/avatars/image-juliusomo.png',
            webp: './assets/avatars/image-juliusomo.webp',
          },
          username: 'juliusomo',
        },
      })
    }
  }

  // creating replies
  const getNewReplyData = (replyText, repliedUser, id) => {
    const replyData = {
      content: replyText,
      createdAt: 'now',
      id: new Date().getTime().toString(),
      replyingTo: repliedUser,
      score: 0,
      user: {
        image: {
          png: './assets/avatars/image-juliusomo.png',
          webp: './assets/avatars/image-juliusomo.webp',
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
          png: './assets/avatars/image-juliusomo.png',
          webp: './assets/avatars/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
    })
  }

  // editing comments
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

  // editing replies
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

    setMyData({ ...myData })
  }

  // deleting replies
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

  // score functions
  const increaseCommentScore = (id, scoreAdded, setScoreAdded) => {
    if (!scoreAdded) {
      const commmentToBeUpvoted = myData.comments.find((comment) => {
        return comment.id === id
      })

      commmentToBeUpvoted.score = commmentToBeUpvoted.score + 1
      setMyData({ ...myData })

      setScoreAdded(true)
    }
  }

  const decreaseCommentScore = (id, scoreAdded, setScoreAdded) => {
    if (scoreAdded) {
      const commmentToBeDownvoted = myData.comments.find((comment) => {
        return comment.id === id
      })

      commmentToBeDownvoted.score = commmentToBeDownvoted.score - 1
      setMyData({ ...myData })

      setScoreAdded(false)
    }
  }

  const increaseReplyScore = (id, scoreAdded, setScoreAdded) => {
    if (!scoreAdded) {
      const commmentwithReply = myData.comments.find((comment) => {
        const test = comment.replies.find((reply) => {
          return reply.id === id
        })
        return test
      })

      const replyToBeUpvoted = commmentwithReply.replies.find((reply) => {
        return reply.id === id
      })

      replyToBeUpvoted.score = replyToBeUpvoted.score + 1
      setMyData({ ...myData })

      setScoreAdded(true)
    }
  }

  const decreaseReplyScore = (id, scoreAdded, setScoreAdded) => {
    if (scoreAdded) {
      const commmentwithReply = myData.comments.find((comment) => {
        const test = comment.replies.find((reply) => {
          return reply.id === id
        })
        return test
      })

      const replyToBeDownvoted = commmentwithReply.replies.find((reply) => {
        return reply.id === id
      })

      replyToBeDownvoted.score = replyToBeDownvoted.score - 1
      setMyData({ ...myData })

      setScoreAdded(false)
    }
  }

  // modal functions
  const deactivateModal = (setOpenModal) => {
    setOpenModal(false)
  }

  // local storage
  const setLocalStorage = () => {
    localStorage.setItem('commentData', JSON.stringify(myData))
  }

  useEffect(() => {
    setLocalStorage()
  }, [myData])

  return (
    <AppContext.Provider
      value={{
        myData,
        currentUser,
        deleteAComment,
        deleteAReply,
        createNewComment,
        deleteComment,
        deleteReply,
        editReply,
        editComment,
        finishEdit,
        getNewReplyData,
        deactivateModal,
        increaseCommentScore,
        decreaseCommentScore,
        increaseReplyScore,
        decreaseReplyScore,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
