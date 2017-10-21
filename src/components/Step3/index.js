import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ user: state.user });

const Step3 = props => {
  const user = Object.assign({}, props.user);
  const userObject = {};
  userObject.user_data = {};
  userObject.user_data.email = user.email;
  userObject.user_data.password = user.password;
  userObject.user_data.date_of_birth =
    Date.parse(`${user.day}-${user.month}-${user.year}`) / 1000;
  userObject.user_data.gender = user.gender || '';
  userObject.user_data.how_hear_about_us = user.howHearAboutUs || null;
  const printJSON = () => console.log(userObject);
  return (
    <div className="app-step3-container">
      <div>
        <div id="app-step3-tick">&#10003;</div>
      </div>
      <div>
        <a id="app-step3-button" onClick={printJSON}>
          Go to Dashboard <span id="app-step3-button-arrow">&#8594;</span>
        </a>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Step3);
