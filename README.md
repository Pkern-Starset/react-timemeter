# react-timemeter

> A react component to display events of a daily basis.

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
      new Date(1000 * 60 * 60 * 38 + 1000 * 60 * 17)
    ];

    return (
      <Timemeter times={times} colors={['#22ddff', '#92db5f']}/>
    );
  }
}
```

## License

MIT © [Pkern-Starset](https://github.com/Pkern-Starset) / [Pkern](https://gitlab.com/paskern)
