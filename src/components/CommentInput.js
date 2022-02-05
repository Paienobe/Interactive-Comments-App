import React from 'react'
import { useState } from 'react'

const CommentInput = ({ currentUser, createNewComment }) => {
  const { image, username } = currentUser
  const [newComment, setNewComment] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    createNewComment(newComment)
    setNewComment('')
  }

  return (
    <section className='inputHouse'>
      <form onSubmit={handleSubmit}>
        <textarea
          name='myComment'
          id='myComment'
          cols='30'
          rows='5'
          placeholder='Add a comment...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <section className='sendSection main-sendSection'>
          <img src={image.png} alt={username} className='avatar' />
          <button className='send-btn' type='submit'>
            SEND
          </button>
        </section>
      </form>
    </section>
  )
}

export default CommentInput
