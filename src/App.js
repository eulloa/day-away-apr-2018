/* global chrome */
import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    if (chrome && chrome.runtime && chrome.runtime.onMessage && typeof chrome.runtime.onMessage.addListener === 'function') {
      chrome.runtime.onMessage.addListener(function(response) {
        console.log({response});
      });
    }
  }

  handleClick = () => {
    if (chrome && chrome.tabs && typeof chrome.tabs.executeScript === 'function') {
      chrome.tabs.executeScript({
        file: 'content.js'
      });
    }
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick}>Click</button>
    );
  }
}

export default App;
