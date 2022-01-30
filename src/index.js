import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

// Alert config
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  transition: transitions.FADE
}


ReactDOM.render(
  <React.StrictMode>
  <AlertProvider template={AlertTemplate} {...options}>
  <App/>
  </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
