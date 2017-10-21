const defaultState = {
  step: 0,
  email: '',
  password: '',
  confirmPassword: '',
  day: null,
  month: null,
  year: null,
  gender: 'male',
  howHearAboutUs: ''
};
const main = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_STEP':
      return { ...state, step: action.step };
    case 'UPDATE_DATA':
      return { ...state, ...action.data };
    default:
      return state;
  }
};
module.exports = main;
