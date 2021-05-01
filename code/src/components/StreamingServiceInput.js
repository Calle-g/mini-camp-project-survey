import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export const StreamingServiceInput = (props) => {
  const {
    streamingAnswers,
    setStreamingAnswers,
    optionList,
    answer,
    highlightStreamingSelect,
    setHighlightStreamingSelect
  } = props
  const updateDescription = (event) => {
    const list = [...streamingAnswers];
    const newAnswer = {
      ...answer,
      description: event.target.value
    }
    const index = streamingAnswers.findIndex((item) => item.id === answer.id);
    list[index] = newAnswer;
    setStreamingAnswers(list);
    setHighlightStreamingSelect(highlightStreamingSelect && event.target.value !== '');
  }
  const updateName = (event) => {
    const list = [...streamingAnswers];
    const newAnswer = {
      ...answer,
      name: event.target.value
    }
    const index = streamingAnswers.findIndex((item) => item.id === answer.id);
    list[index] = newAnswer;
    if (streamingAnswers[streamingAnswers.length - 1].id === answer.id) {
      list.push({ name: '', description: '', id: uuidv4() });
    }
    setStreamingAnswers(list);
    setHighlightStreamingSelect(highlightStreamingSelect && false);
  }
  const deleteAnswer = () => {
    const list = [...streamingAnswers];
    const index = list.findIndex((item) => item.id === answer.id);
    list.splice(index, 1);
    setStreamingAnswers([...list]);
  }
  const checkHighlight = () => {
    return ((answer.description === '' && answer.name !== '') || (answer.name === '' && streamingAnswers.length === 1)) && highlightStreamingSelect;
  }
  return (
    <div className={`input-container${checkHighlight() ? ' required-box' : ''}`}>
      {checkHighlight() && <div className="input-validation select-one">{answer.name === '' ? 'Please select a service' : 'Please give some reasoning'}</div>}
      <div className="select-wrapper">
        <select
          className="select"
          value={answer.name}
          onChange={(event) => updateName(event)}>
          <option value="" disabled>Select a streaming service</option>
          {optionList.map((item, index) => {
            return (
              <option
                disabled={
                  streamingAnswers.some((answerItem) => item === answerItem.name)
                }
                key={index}
                value={item}>
                {item}
              </option>
            )
          })}
        </select>
      </div>
      {answer.name && <button className="small-button" onClick={deleteAnswer} type="button"><div className="delete-answer-text">Delete answer</div><div className="delete-answer-cross">&#10008;</div></button>}
      {answer.name && <textarea
        className={`text-area${answer.description === '' ? ' required' : ' valid'}`}
        placeholder={`Describe why you subscribed to ${answer.name}...`}
        value={answer.description}
        onChange={(event) => updateDescription(event)} />}
    </div>
  )
}
