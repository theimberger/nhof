import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionUtils from './utils/session_utils';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>Hello there</h1>, root);
  window.SessionUtils = SessionUtils;
});
