import React from 'react'

const Modal = ({
  deleteComment,
  commentID,
  deleteReply,
  replyID,
  deactivateModal,
  modalState,
  deactivateReplyModal,
  replyModalState,
}) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h4>Delete comment</h4>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and cant be undone.
        </p>
        <div className='modal-btn-holder'>
          <button
            className='modal-btn cancel-delete'
            onClick={() => {
              if (replyModalState) {
                deactivateReplyModal(replyModalState)
              } else if (modalState) {
                deactivateModal(modalState)
              }
            }}
          >
            NO, CANCEL
          </button>
          <button
            className='modal-btn comment-delete-btn'
            onClick={() => {
              if (replyModalState) {
                deleteReply(replyID)
                deactivateReplyModal(replyModalState)
              } else if (modalState) {
                deleteComment(commentID)
              }
            }}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
