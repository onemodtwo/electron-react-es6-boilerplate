import app from 'app';
import BrowserWindow from 'browser-window';
import {ipcMain} from 'electron';

let mainWin = null;
let state = {messages: ['This ', 'is ', 'init.']};

const updateState = (e, state) => {
  e.sender.send('state', state);
}

const createWindow = () => {
  mainWin = new BrowserWindow({width: 800, height: 600, title: ''});
  mainWin.loadURL(`file://${__dirname}/../static/mainWin.html`);
  mainWin.webContents.on('dom-ready', function() {
    mainWin.webContents.send('init', state);
  });
  // mainWin.openDevTools();
  mainWin.on('closed', function() {mainWin = null;});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWin === null) createWindow();
});

ipcMain.on('state', (e, arg) => {
  let update = updateState.bind(null, e);
  switch(arg) {
    case 'first':
      update({messages: ['Glad you\'re ', 'ready.']});
      break;
    case 'second':
      update({messages: [123]});
      break;
    case 'third':
      update({messages: ['hello ', 'it\'s ', 'me']});
      break;
    default:
      console.log(arg);
      update({messages: ['Don\'t ', 'recognize you.']})
  }
});
