import React, { useState } from 'react'
import * as EmailValidator from 'email-validator';

export const EmailInput = (props) => {
  const {
    value,
    setValue,
    validValue,
    setValidValue,
    highlightEmail,
    setHighlightEmail
  } = props
  const [className, setClassName] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    setHighlightEmail(highlightEmail && false);
    if (EmailValidator.validate(e.target.value)) {
      setValidValue(true);
      setClassName(' valid');
    } else if (e.target.value === '') {
      setValidValue(false);
      setClassName('');
    } else {
      setValidValue(false);
      setClassName(' required');
    }
  }
  const handleBlur = () => {
    setValidValue(EmailValidator.validate(value));
    if (!validValue && value !== '') {
      setClassName(' required');
    } else if (!validValue) {
      setClassName('');
    }
  }
  return (
    <div className={`form-group email-wrapper${highlightEmail ? ' required-box' : ''}`}>
      {(!validValue && highlightEmail) && <div className="input-validation">Please enter a valid email</div>}
      <div className="form-label">Enter your email</div>
      <input onBlur={handleBlur} className={`email-input${className}`} name="email" id="email" type="text" value={value} onChange={(event) => handleChange(event)} />
    </div>
  )
}
