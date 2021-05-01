import React from 'react'

export const Answers = (props) => {
  const {
    streamingAnswers,
    email,
    device,
    setShowConfirmation
  } = props

  return (
    <div className="answers-list">
      <div className="form-label">Your streaming services and reason of subscribing</div>
      {
        streamingAnswers.map((item) => {
          return item.name ? (
            <div className="answer-entry">
              <div className="title">{item.name}</div>
              <div className="description">{item.description}</div>
            </div>
          ) : null
        })
      }
      <div className="form-label">Your preferred device to watch streaming services</div>
      <div className="answer-entry">{device}</div>
      <div className="form-label">You will also receive our weekly newspost to</div>
      <div className="answer-entry">{email}</div>
      <div className="button-box">
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}>
          Confirm answers
        </button>
        <div className="border" />
        <div className="border" />
        <div className="border" />
        <div className="border" />
      </div>
    </div>)
}
