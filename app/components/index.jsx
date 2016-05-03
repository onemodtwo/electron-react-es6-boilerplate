import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';
import App from './main.jsx';

ipcRenderer.once('init', (e, data) => {
  ReactDOM.render(<App state={data}/>, document.getElementById('app'));
});
