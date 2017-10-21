import React, { Component } from 'react';
import { connect } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import './../assets/styles/App.css';

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  updateStepIndex: step => {
    dispatch({
      type: 'UPDATE_STEP',
      step
    });
  },
  updateStoreData: data => {
    dispatch({
      type: 'UPDATE_DATA',
      data
    });
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  handleFormSubmit(values) {
    let step = this.props.user.step;
    step++;
    delete values.gender;
    this.props.updateStoreData(values);
    this.props.updateStepIndex(step);
  }
  handleBack() {
    let step = this.props.user.step;
    step--;
    this.props.updateStepIndex(step);
  }
  onGenderChange(gender) {
    this.props.updateStoreData({ gender });
  }
  onhowHearAboutUsChange(howHearAboutUs) {
    this.props.updateStoreData({ howHearAboutUs });
  }
  render() {
    const appProgressPercentByStepIndex = {
      0: '33%',
      1: '66%',
      2: '100%'
    };
    const { step } = this.props.user;
    const width = appProgressPercentByStepIndex[step];
    return (
      <div className="app">
        <div className="app-header">
          {step < 2 ? 'Signup' : step === 2 ? 'Thank you !' : ''}
        </div>
        <div className="app-progress-container">
          <div className="app-progress-bar" style={{ width }} />
        </div>
        <div className="app-main-container">
          {step === 0 ? (
            <Step1 step={step} onSubmit={this.handleFormSubmit} />
          ) : step === 1 ? (
            <Step2
              step={step}
              howHearAboutUs={this.props.user.howHearAboutUs}
              onhowHearAboutUsChange={this.onhowHearAboutUsChange.bind(this)}
              gender={this.props.user.gender}
              onGenderChange={this.onGenderChange.bind(this)}
              onSubmit={this.handleFormSubmit}
              handleBack={this.handleBack}
            />
          ) : step === 2 ? (
            <Step3 />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
