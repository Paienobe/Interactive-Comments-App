import React from 'react'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'

const Reply = ({
  id,
  content,
  createdAt,
  score,
  replyingTo,
  user,
  getNewReplyData,
  deleteReply,
  activateModal,
  addLike,
  removeLike,
  resetScore,
  deactivateModal,
  currentUser,
  displayReplyInput,
  commentID,
  editReply,
}) => {
  const [addIsClicked, setAddIsClicked] = useState(false)

  const [minusIsClicked, setMinusIsClicked] = useState(false)

  const [openModal, setOpenModal] = useState(false)

  const [showReplyInput, setShowReplyInput] = useState(false)

  const [replyText, setReplyText] = useState('')

  const [isEditing, setIsEditing] = useState(false)

  const { image, username } = currentUser

  useEffect(() => {
    resetScore(minusIsClicked, addIsClicked, setAddIsClicked, setMinusIsClicked)
  }, [minusIsClicked, addIsClicked])

  const displayUserTag =
    user.username === 'juliusomo' ? (
      <button className='userTag'>you</button>
    ) : (
      ''
    )

  return (
    <div className='comment comment-reply' key={id}>
      <div className='user'>
        <img src={user.image.png} alt={user.username} className='avatar' />
        <h4>{user.username}</h4>
        {displayUserTag}
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
                // setShowReplyInput(false)
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
            onClick={() => addLike(addIsClicked, setAddIsClicked)}
          >
            <img src='./images/icon-plus.svg' alt='+' />
          </button>
          <h4 className='like-count'>{addIsClicked ? score + 1 : score}</h4>
          <button
            className='btn count-btn'
            onClick={() => removeLike(addIsClicked, setMinusIsClicked)}
          >
            <img src='./images/icon-minus.svg' alt='-' />
          </button>
        </div>
        {user.username === 'juliusomo' ? (
          <div className='edit-delete'>
            <button
              className='btn delete-btn'
              onClick={() => {
                activateModal(setOpenModal)
              }}
            >
              <img src='./images/icon-delete.svg' alt='' /> Delete
            </button>
            <button
              className='btn edit-btn'
              onClick={() => {
                setIsEditing(true)
                setReplyText(content)
              }}
            >
              <img src='./images/icon-edit.svg' alt='' /> Edit
            </button>
          </div>
        ) : (
          <button
            className='btn reply-btn'
            onClick={() => displayReplyInput(setShowReplyInput)}
          >
            <img src='./images/icon-reply.svg' alt='reply-btn' /> Reply
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
          deleteReply={deleteReply}
          replyID={id}
          deactivateReplyModal={deactivateModal}
          replyModalState={setOpenModal}
        />
      )}
    </div>
  )
}

export default Reply
