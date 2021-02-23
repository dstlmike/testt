import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../src/index.css';
import App from '../src/App';
import * as serviceWorker from '../src/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route to='/' component={App}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
