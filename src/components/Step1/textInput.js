import React from 'react';

const textInput = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input
      {...input}
      type={type}
      placeholder={label}
      className="app-form-control app-width90p"
    />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

export default textInput;
