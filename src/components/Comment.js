import React, { useState, useEffect, useRef } from 'react'
import Modal from '../components/Modal'
import Reply from '../components/Reply'

const Comment = ({
  content,
  createdAt,
  id,
  replies,
  score,
  user,
  getNewReplyData,
  deleteComment,
  editComment,
  finishEdit,
  deleteReply,
  addLike,
  removeLike,
  resetScore,
  activateModal,
  deactivateModal,
  currentUser,
  displayReplyInput,
  editReply,
  timer,
}) => {
  const [addIsClicked, setAddIsClicked] = useState(false)

  const [minusIsClicked, setMinusIsClicked] = useState(false)

  const [showReplyInput, setShowReplyInput] = useState(false)

  const [replyText, setReplyText] = useState('')

  const [openModal, setOpenModal] = useState(false)

  const [isEditing, setIsEditing] = useState(false)

  const { image, username } = currentUser

  const displayUserTag =
    user.username === 'juliusomo' ? (
      <button className='userTag'>you</button>
    ) : (
      ''
    )

  useEffect(() => {
    resetScore(minusIsClicked, addIsClicked, setAddIsClicked, setMinusIsClicked)
  }, [minusIsClicked, addIsClicked])

  const startEdit = () => {
    displayReplyInput(setShowReplyInput)
    setIsEditing(true)
    editComment(id, setReplyText)
  }

  return (
    <div className='comment-housing'>
      <div className='comment' id={id}>
        <div className='user'>
          <img src={user.image.png} alt={user.username} className='avatar' />
          <h4>{user.username}</h4>
          {displayUserTag}
          <p>{createdAt}</p>
        </div>

        <p className='comment-text'>{content}</p>

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
                onClick={() => activateModal(setOpenModal)}
              >
                <img src='./images/icon-delete.svg' alt='' /> Delete
              </button>
              <button className='btn edit-btn' onClick={startEdit}>
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
              {isEditing ? (
                <button
                  className='insertReply'
                  onClick={(e) => {
                    e.preventDefault()
                    finishEdit(id, replyText)
                    setReplyText('')
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
                    if (replyText) {
                      getNewReplyData(replyText, user.username, id)
                    }
                    setReplyText('')
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
            deactivateModal={deactivateModal}
            deleteComment={deleteComment}
            commentID={id}
            modalState={setOpenModal}
            deleteReply={deleteReply}
          />
        )}
      </div>

      <div className='replies'>
        {replies.map((reply, index) => {
          return (
            <Reply
              key={index}
              {...reply}
              addLike={addLike}
              removeLike={removeLike}
              addIsClicked={addIsClicked}
              resetScore={resetScore}
              showReplyInput={showReplyInput}
              getNewReplyData={getNewReplyData}
              activateModal={activateModal}
              deleteReply={deleteReply}
              deactivateModal={deactivateModal}
              currentUser={currentUser}
              displayReplyInput={displayReplyInput}
              commentID={id}
              editReply={editReply}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Comment
