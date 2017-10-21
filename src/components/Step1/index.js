import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import textInput from './textInput';

const validateStep1Inputs = values => {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = 'Required';
  }
  // eslint-disable-next-line
  if (
    values.email &&
    !values.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-za-z\-0-9]+\.)+[a-za-z]{2,}))$/
    )
  ) {
    errors.email = 'Invalid';
  }
  if (!values.password.trim()) {
    errors.password = 'Required';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Min 6 characters';
  }
  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = 'Required';
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = 'Mismatch';
  }
  return errors;
};

const Step1 = props => {
  const { error, handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            component={textInput}
            type="email"
            label="EMAIL"
          />
        </div>
        <div>
          <Field
            name="password"
            component={textInput}
            type="password"
            label="PASSWORD"
          />
        </div>
        <div>
          <Field
            name="confirmPassword"
            component={textInput}
            type="password"
            label="CONFIRM PASSWORD"
          />
        </div>
        {error && <strong>{error}</strong>}
        <div className="app-footer">
          <button type="submit" onClick={handleSubmit} className="next">
            Next
            <span className="app-button-arrow">&#8594;</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(state => ({
  initialValues: state.user
}))(
  reduxForm({
    form: 'step1',
    validate: validateStep1Inputs
  })(Step1)
);
