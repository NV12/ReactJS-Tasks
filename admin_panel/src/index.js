import React from 'react';
// import {Button, ButtonToolbar} from '../node_modules/react-bootstrap';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();