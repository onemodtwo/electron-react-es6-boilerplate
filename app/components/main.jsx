import {ipcRenderer} from 'electron';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  componentDidMount() {
    ipcRenderer.on('state', (e, data) => {
      this.setState(data);
    });
    setTimeout(() => ipcRenderer.send('state', 'first'), 2000);
    setTimeout(() => ipcRenderer.send('state', 'second'), 4000);
    setTimeout(() => ipcRenderer.send('state', 'third'), 6000);
    setTimeout(() => ipcRenderer.send('state', 'fake'), 8000);
  }

  render() {
    const arr = this.state.messages;
    console.log(typeof(arr), ': ', arr);
    return (
      <div>{arr.reduce( (a,b) => a.concat(b) )}</div>
    );
  }
}
