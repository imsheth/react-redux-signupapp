import { createStore } from 'redux';
import rootReducer from './../reducers';

const configureStore = initialState => createStore(rootReducer, initialState);

module.exports = configureStore;
