import React, { Component } from "react";
import { DayTimeline } from "react-timemeter";

class App extends Component {
  state = {
    maxHour: 23,
    maxMinute: 1
  }

  componentDidMount() {
    /*setInterval(() => {
      if(this.state.maxMinute + 1 > 60) {
        this.setState({
          maxMinute: 0,
          maxHour: this.state.maxHour +1
        })
      } else {
        this.setState({
          maxMinute: this.state.maxMinute +60
        })
      }
    }, 20);*/
  }

  render() {
    const times = [
      new Date(1000 * 60 * 60 * 12 + 1000 * 60 * 26),
      new Date(1000 * 60 * 60 * 22 + 1000 * 60 * 48),
      new Date(1000 * 60 * 60 * 28 + 1000 * 60 * 38),
      new Date(1000 * 60 * 60 * 38 + 1000 * 60 * 17)
    ];
    return (
      <DayTimeline times={times} colors={['#22ddff', '#92db5f']}/>
    );
  }
}

export default App;
