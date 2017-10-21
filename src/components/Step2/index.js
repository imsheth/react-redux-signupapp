import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import datePartInput from './datePartInput';
import moment from 'moment';

const validateStep2Inputs = values => {
  const errors = {};
  if (!values.day) {
    errors.day = 'Required';
  }
  if (values.day && (values.day < 1 || values.day > 31)) {
    errors.day = 'Invalid';
  }
  if (!values.month) {
    errors.month = 'Required';
  }
  if (values.month && (values.month < 1 || values.month > 12)) {
    errors.month = 'Invalid';
  }
  if (!values.year) {
    errors.year = 'Required';
  }
  if (
    values.day &&
    values.month &&
    values.year &&
    !moment(
      `${values.day}-${values.month}-${values.year}`,
      'D-M-YYYY',
      true
    ).isValid()
  ) {
    errors.year = 'Invalid date';
  } else if (
    moment().diff(
      moment(`${values.day}-${values.month}-${values.year}`, 'D-M-YYYY'),
      'years'
    ) < 18
  ) {
    errors.year = '18+ Only';
  }
  return errors;
};

class Step2 extends React.Component {
  onGenderChangeHandler(val) {
    this.props.onGenderChange(val);
  }
  render() {
    const { error, handleSubmit, handleBack } = this.props;
    return (
      <div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <span className="app-step2-form-control-labels">DATE OF BIRTH</span>
          </div>
          <div className="app-date-part-container">
            <div>
              <Field
                name="day"
                component={datePartInput}
                type="number"
                label="DD"
                min={1}
                max={31}
              />
            </div>
            <div>
              <Field
                name="month"
                component={datePartInput}
                type="number"
                label="MM"
                min={1}
                max={12}
              />
            </div>
            <div>
              <Field
                name="year"
                component={datePartInput}
                type="number"
                label="YYYY"
                min={1900}
              />
            </div>
          </div>
          <br />
          <div>
            <span className="app-step2-form-control-labels">GENDER</span>
          </div>
          <div className="app-radios-container">
            <input
              type="radio"
              className="app-radio-button"
              onChange={this.onGenderChangeHandler.bind(this, 'male')}
              name="gender"
              value="male"
              id="male"
              checked={this.props.gender === 'male'}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              className="app-radio-button"
              onChange={this.onGenderChangeHandler.bind(this, 'female')}
              name="gender"
              value="female"
              id="female"
              checked={this.props.gender === 'female'}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              className="app-radio-button"
              onChange={this.onGenderChangeHandler.bind(this, 'unspecified')}
              name="gender"
              value="unspecified"
              id="unspecified"
              checked={this.props.gender === 'unspecified'}
            />
            <label htmlFor="unspecified">Unspecified</label>
          </div>
          <br />
          <div>
            <span className="app-step2-form-control-labels">
              WHERE DID YOU HEAR ABOUT US
            </span>
          </div>
          <div>
            <Field
              name="howHearAboutUs"
              component="select"
              className="dropdown"
            >
              <option value="" />
              <option value="website">Our website</option>
            </Field>
          </div>
          {error && <strong>{error}</strong>}
          <div className="app-footer">
            <button type="button" onClick={handleBack} className="back">
              Back
            </button>
            <button type="submit" onClick={handleSubmit} className="next">
              Next
              <span className="app-button-arrow">&#8594;</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  initialValues: state.user
}))(
  reduxForm({
    form: 'Step2',
    validate: validateStep2Inputs
  })(Step2)
);
