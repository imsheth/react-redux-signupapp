import React from 'react';

const datePartInput = ({
  input,
  label,
  type,
  min,
  max,
  meta: { touched, error }
}) => (
  <div>
    <input {...input} min={min} max={max} placeholder={label} type={type} />
    {touched && error && <div className="error">{error}</div>}
  </div>
);

export default datePartInput;
