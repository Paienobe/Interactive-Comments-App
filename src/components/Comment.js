import React, { useState, useEffect } from 'react'
import Reply from './Reply'
import Modal from './Modal'
import { useGlobalContext } from '../context'

function Comment({ id, content, createdAt, score, user, replies }) {
  const {
    editComment,
    finishEdit,
    getNewReplyData,
    currentUser,
    deactivateModal,
    increaseCommentScore,
    decreaseCommentScore,
  } = useGlobalContext()

  const getScore = () => {
    const scoreState = localStorage.getItem('commentScore')
    if (scoreState) {
      return JSON.parse(scoreState)
    } else {
      return false
    }
  }

  const [openModal, setOpenModal] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [scoreAdded, setScoreAdded] = useState(getScore())
  const { image, username } = currentUser

  useEffect(() => {
    localStorage.setItem('commentScore', JSON.stringify(scoreAdded))
  }, [scoreAdded])

  const startEdit = () => {
    setShowReplyInput(true)
    setIsEditing(true)
    editComment(id, setCommentText)
  }

  return (
    <div className='comment-housing'>
      <div className='comment' id={id}>
        <div className='user'>
          <img src={user.image.png} alt={user.username} className='avatar' />
          <h4>{user.username}</h4>
          <p>{createdAt}</p>
        </div>

        <p className='comment-text'>{content}</p>

        <div className='comment-footer'>
          <div className='likes'>
            <button
              className='btn count-btn'
              onClick={() =>
                increaseCommentScore(id, scoreAdded, setScoreAdded)
              }
            >
              <img src='./assets/icon-plus.svg' alt='+' />
            </button>
            <h4 className='like-count'>{score}</h4>
            <button
              className='btn count-btn'
              onClick={() =>
                decreaseCommentScore(id, scoreAdded, setScoreAdded)
              }
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
              <button className='btn edit-btn' onClick={startEdit}>
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
      </div>

      {showReplyInput && (
        <form className='replyInputArea'>
          <textarea
            cols='30'
            rows='3'
            placeholder='insert-text...'
            className='textarea inputHouse replyInputBox'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className='button-holder sendSection'>
            <img src={image.png} alt={username} className='avatar' />
            {isEditing ? (
              <button
                className='insertReply'
                onClick={(e) => {
                  e.preventDefault()
                  finishEdit(id, commentText)
                  setCommentText('')
                  setIsEditing(false)
                  setShowReplyInput(false)
                }}
              >
                Update
              </button>
            ) : (
              <button
                className='insertReply'
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  if (commentText) {
                    getNewReplyData(commentText, user.username, id)
                  }
                  setCommentText('')
                  setShowReplyInput(false)
                }}
              >
                Reply
              </button>
            )}
          </div>
        </form>
      )}

      {openModal && (
        <Modal
          commentID={id}
          modalState={setOpenModal}
          deactivateModal={deactivateModal}
        />
      )}

      <div className='replies'>
        {replies.map((reply) => {
          return <Reply key={reply.id} {...reply} commentID={id} />
        })}
      </div>
    </div>
  )
}

export default Comment
