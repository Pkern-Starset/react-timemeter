import React, { Component } from "react";
import { Timemeter } from "react-timemeter";

class App extends Component {

  render() {
    const times = [
      new Date(1000 * 60 * 60 * 12 + 1000 * 60 * 26),
      new Date(1000 * 60 * 60 * 22 + 1000 * 60 * 48),
      new Date(1000 * 60 * 60 * 28 + 1000 * 60 * 38),
      new Date(1000 * 60 * 60 * 38 + 1000 * 60 * 17)
    ];
    return (
      <Timemeter times={times} colors={['#22ddff', '#92db5f']}/>
    );
  }
}

export default App;
