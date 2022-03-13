import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import Modal from './Modal'

function Reply({ id, content, createdAt, score, user, replyingTo, commentID }) {
  const {
    editReply,
    getNewReplyData,
    currentUser,
    deactivateModal,
    increaseReplyScore,
    decreaseReplyScore,
  } = useGlobalContext()

  const getScore = () => {
    const scoreState = localStorage.getItem('replyScore')
    if (scoreState) {
      return JSON.parse(scoreState)
    } else {
      return false
    }
  }
  const [openModal, setOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [scoreAdded, setScoreAdded] = useState(getScore())
  const { image, username } = currentUser

  useEffect(() => {
    localStorage.setItem('replyScore', JSON.stringify(scoreAdded))
  }, [scoreAdded])

  return (
    <div className='comment comment-reply' key={id}>
      <div className='user'>
        <img src={user.image.png} alt={user.username} className='avatar' />
        <h4>{user.username}</h4>
        <p>{createdAt}</p>
      </div>

      {isEditing ? (
        <form className='replyInputArea'>
          <textarea
            cols='30'
            rows='3'
            placeholder='insert-text...'
            className='textarea inputHouse replyInputBox'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <div className='button-holder sendSection update'>
            <button
              className='insertReply'
              onClick={(e) => {
                e.preventDefault()
                setReplyText('')
                setIsEditing(false)
                editReply(id, replyText)
              }}
            >
              UPDATE
            </button>
          </div>
        </form>
      ) : (
        <p className='comment-text'>
          <span className='replyingTo'>@{replyingTo} </span>
          {content}
        </p>
      )}

      <div className='comment-footer'>
        <div className='likes'>
          <button
            className='btn count-btn'
            onClick={() => {
              increaseReplyScore(id, scoreAdded, setScoreAdded)
            }}
          >
            <img src='./assets/icon-plus.svg' alt='+' />
          </button>
          <h4 className='like-count'>{score}</h4>
          <button
            className='btn count-btn'
            onClick={() => {
              decreaseReplyScore(id, scoreAdded, setScoreAdded)
            }}
          >
            <img src='./assets/icon-minus.svg' alt='-' />
          </button>
        </div>

        {user.username === 'juliusomo' ? (
          <div className='edit-delete'>
            <button
              className='btn delete-btn'
              onClick={() => {
                setOpenModal(true)
              }}
            >
              <img src='./assets/icon-delete.svg' alt='' /> Delete
            </button>
            <button
              className='btn edit-btn'
              onClick={() => {
                setIsEditing(true)
                setReplyText(content)
              }}
            >
              <img src='./assets/icon-edit.svg' alt='' /> Edit
            </button>
          </div>
        ) : (
          <button
            className='btn reply-btn'
            onClick={() => {
              setShowReplyInput(true)
            }}
          >
            <img src='./assets/icon-reply.svg' alt='reply-btn' /> Reply
          </button>
        )}
      </div>

      {showReplyInput && (
        <form className='replyInputArea'>
          <textarea
            cols='30'
            rows='3'
            placeholder='insert-text...'
            className='textarea inputHouse replyInputBox'
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <div className='button-holder sendSection'>
            <img src={image.png} alt={username} className='avatar' />
            <button
              className='insertReply'
              type='submit'
              onClick={(e) => {
                e.preventDefault()
                if (replyText) {
                  getNewReplyData(replyText, user.username, commentID)
                }
                setReplyText('')
                setShowReplyInput(false)
              }}
            >
              Reply
            </button>
          </div>
        </form>
      )}

      {openModal && (
        <Modal
          replyID={id}
          replyModalState={setOpenModal}
          deactivateReplyModal={deactivateModal}
        />
      )}
    </div>
  )
}

export default Reply
