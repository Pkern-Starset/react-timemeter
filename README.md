# react-timemeter

> A react component to display time spans within a day or even a month

[![NPM](https://img.shields.io/npm/v/react-timemeter.svg)](https://www.npmjs.com/package/react-timemeter) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-timemeter
```

## Usage

```jsx
import React, { Component } from 'react'

import Timemeter from 'react-timemeter'

class Example extends Component {
  render() {
    const times = [
      new Date(1000 * 60 * 60 * 12 + 1000 * 60 * 26),
      new Date(1000 * 60 * 60 * 22 + 1000 * 60 * 48),
      new Date(1000 * 60 * 60 * 28 + 1000 * 60 * 38),
      new Date(1000 * 60 * 60 * 38 + 1000 * 60 * 17),
      new Date(1000 * 60 * 60 * 43 + 1000 * 60 * 17),
      new Date(1000 * 60 * 60 * 45 + 1000 * 60 * 17),
      new Date(1000 * 60 * 60 * 52 + 1000 * 60 * 17),
      new Date(1000 * 60 * 60 * 60 + 1000 * 60 * 17),
      new Date(1000 * 60 * 60 * 66 + 1000 * 60 * 17),
    ];

    return (
      <>
        <Timemeter times={times} />
        <Timemeter times={times} colors={['#22ddff', '#92db5f']} colorMode={'repeat'}/>
      </>
    );
  }
}
```

![img of the react-timemeter](https://github.com/Pkern-Starset/react-timemeter/blob/master/example/images/react-timemeter.png?raw=true "example from above")

| Property | default | possible values |  desc |
| --- | --- | --- | --- |
| times | [ ] | / | the date objects shown in the timemeter, will be sorted and filtered automatically |
| colors | ['gray', 'lightgray'] | / | the colors that will be used to display the time-spans |
| colorMode | 'random' | 'random' or 'repeat' | the color mode which decides which color to use. "random" means, any color without choosing colors twice in a row <br> 'repeat' means, repeat the colors in the order they are given. Will repeated endlessly


## License

MIT © [Pkern-Starset](https://github.com/Pkern-Starset) / [Pkern](https://gitlab.com/paskern)
