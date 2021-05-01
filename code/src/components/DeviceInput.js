import React from 'react'

export const DeviceInput = (props) => {
  const {
    mediaDevices,
    device,
    setDevice,
    highlightMediaDevices,
    setHighlightMediaDevices
  } = props
  const onChange = (input) => {
    setDevice(input);
    setHighlightMediaDevices(highlightMediaDevices && false);
  }
  return (
    <div className={`form-group${highlightMediaDevices ? ' required-box' : ''}`}>
      {highlightMediaDevices && <div className="input-validation">Please select a device</div>}
      <div className="form-label">Select your preferred device to use while streaming</div>
      <div className="radio-group">
        {mediaDevices.map((deviceValue, index) => {
          return (
            <label key={index} htmlFor={deviceValue}>
              <input
                type="radio"
                id={deviceValue}
                value={deviceValue}
                onChange={(event) => onChange(event.target.value)}
                checked={deviceValue === device} />
              <span className="design" />
              <span className="text">{deviceValue}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
