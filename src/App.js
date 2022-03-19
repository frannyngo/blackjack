import React, { Component } from 'react';
import { Theme } from './GlobalStyles';
import Home from './Pages/Home/Home'

class App extends Component {
  render() {
    return (
      <Theme>
        <Home />
      </Theme>
    );
  }
}

export default App;
