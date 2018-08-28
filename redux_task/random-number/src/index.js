import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reducer from './App/store/numberReducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// To use async code with redux
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));