import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EmailInput } from './components/EmailInput'
import { StreamingServiceInput } from './components/StreamingServiceInput'
import { Answers } from './components/Answers'
import { DeviceInput } from './components/DeviceInput'

const streamingServicesList = [
  'Amazon Prime Video',
  'Apple TV+',
  'CBS All Access',
  'Disney+',
  'HBO Max',
  'Hulu',
  'Netflix',
  'Quibi',
  'Showtime',
  'Starz'
]

const mediaDevices = [
  'TV',
  'Smartphone',
  'Tablet',
  'Telescope',
  'VR headset',
  'Other'
]

export const App = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [device, setDevice] = useState('');
  const [streamingAnswers, setStreamingAnswers] = useState([{ name: '', description: '', id: uuidv4(), invalid: true }]);
  const [completedForm, setCompletedForm] = useState(false);
  const [highlightStreamingSelect, setHighlightStreamingSelect] = useState(false);
  const [highlightEmail, setHighlightEmail] = useState(false);
  const [highlightMediaDevices, setHighlightMediaDevices] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleButtonClick = () => {
    let everythingOk = true;
    if (!validEmail) {
      everythingOk = false;
      setHighlightEmail(true);
    }
    if (streamingAnswers.some((answerItem) => {
      return (
        (answerItem.name !== '' && answerItem.description === '')
        || (streamingAnswers.length === 1 && answerItem.name === '')
      )
    })) {
      setHighlightStreamingSelect(true);
      everythingOk = false;
    }
    if (device === '') {
      setHighlightMediaDevices(true);
      everythingOk = false;
    }
    setCompletedForm(everythingOk);
  }
  return (
    <div id="main">
      {!completedForm
      && (
        <div>
          <h1>Welcome to our streaming survey!</h1>
          <h2>
            {/* eslint-disable-next-line max-len */}
            Please fill in the survey so we can improve our service to compete with our competitors!
          </h2>
          <form className="main-form" onSubmit={(event) => event.preventDefault()}>
            <div className="form-group select-one">
              <div className="form-label">Select a streaming service and reason for subscribing</div>
              {streamingAnswers.map((answer, index) => {
                return (
                  <StreamingServiceInput
                    key={index}
                    answer={answer}
                    highlightStreamingSelect={highlightStreamingSelect}
                    setHighlightStreamingSelect={setHighlightStreamingSelect}
                    streamingAnswers={streamingAnswers}
                    setStreamingAnswers={setStreamingAnswers}
                    optionList={streamingServicesList} />
                )
              })}
            </div>
            <DeviceInput
              mediaDevices={mediaDevices}
              device={device}
              setDevice={setDevice}
              highlightMediaDevices={highlightMediaDevices}
              setHighlightMediaDevices={setHighlightMediaDevices} />
            <EmailInput
              value={email}
              setValue={setEmail}
              highlightEmail={highlightEmail}
              setHighlightEmail={setHighlightEmail}
              validValue={validEmail}
              setValidValue={setValidEmail} />
            <div className="button-box">
              <button
                type="button"
                onClick={() => handleButtonClick()}>
                Submit answers
              </button>
              <div className="border" />
              <div className="border" />
              <div className="border" />
              <div className="border" />
            </div>
          </form>
        </div>)}
      {completedForm
      && !showConfirmation && <Answers
        streamingAnswers={streamingAnswers}
        device={device}
        email={email}
        setShowConfirmation={setShowConfirmation} />}
      {showConfirmation
      && (
        <div className="answers-list">
          <h2>
          Thank you for taking part in our survey!
          </h2>
        </div>)}
    </div>
  )
}
