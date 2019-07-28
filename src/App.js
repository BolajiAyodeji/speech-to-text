import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone'


class App extends Component {
  onListenClick() {
    fetch('http://localhost:3001/api/speech-to-text/token')
    .then(function(response) {
      return response.text();
    }).then(function (token) {
      
      var stream = recognizeMic({
        access_token: token, // use `access_token` as the parameter name if using an RC service
        objectMode: true, // send objects instead of text
        extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
        format: false // optional - performs basic formatting on the results such as capitals an periods
      });
      
      stream.on('data', function(data) {
        console.log(data);
      });
      
      stream.on('error', function(err) {
        console.log(err);
      });
      
      document.querySelector('#stop').onclick = stream.stop.bind(stream);
      
    }).catch(function(error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button className="btn" onClick={this.onListenClick}>Listen to Mic</button>
        </header>
      </div>
    );
  }
};

export default App;
