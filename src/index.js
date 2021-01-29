import React, { Component } from 'react'
import PropTypes from 'prop-types'

let prevColor = null
const defaultColors = ['gray', 'lightgray']

const removeDuplicates = (array) => {
  const seen = {}
  return array.filter((item) =>
    // eslint-disable-next-line no-prototype-builtins
    seen.hasOwnProperty(item) ? false : (seen[item] = true)
  )
}

const randomColor = (colors) => {
  let value
  do {
    value = colors[Math.floor(Math.random() * colors.length)] // select first color
  } while (colors.length !== 1 && prevColor === value)
  prevColor = value // mem the last color (so no color is selected twice
  return value
}

const selectColor = (colors, colorMode, index) => {
  if (!colors || colors.length === 0) {
    colors = defaultColors
  }
  if (colorMode === 'repeat') {
    return colors[index % colors.length]
  } else {
    return randomColor(colors)
  }
}

const calcTimeWithinADay = (date) => {
  if (date) {
    // returns the milliseconds starting from 00:00 AM up to 12 PM
    return date.getTime()
  }
}

const calcMinutesWithinAMonth = (date) => {
  if (date) {
    return (
      date.getUTCDate() * 24 * 60 +
      date.getUTCHours() * 60 +
      date.getUTCMinutes()
    )
  }
}

const styles = {
  border: '0px dashed',
  display: 'flex',
  margin: 'auto'
}

const containerStyle = {
  width: '500px',
  height: '100px'
}

// return dateTime as text in format "hh:mm" at position x, y
const text = (x, y, time) => {
  if (!time) {
    return null
  }
  return (
    <text key={uuidv4()} x={x} y={y} fill='black'>
      {formatDateToSimpleTime(time)}
    </text>
  )
}

// returns the dot indicating a time-unit on the baseline
const createDot = (px, baseline, height) => {
  return (
    <rect
      key={uuidv4()}
      x={px}
      y={baseline - height}
      height={height}
      width='1px'
      fill='black'
    />
  )
}

// returns the area with given start-x, end-x and height in px, filled with the given html-color
const timeArea = (xStart, xEnd, height, color) => {
  return (
    <rect
      key={uuidv4()}
      x={xStart}
      width={xEnd - xStart}
      y={0}
      height={height}
      fill={color}
    />
  )
}

// returns a date object as time in format of "hh:mm"
const formatDateToSimpleTime = (time) => {
  return new Intl.DateTimeFormat('DE-de', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(time.getTime() + time.getTimezoneOffset() * 60 * 1000))
}

// returns the x-position for the time beneath the baseline
const getTimeTextXPosInPx = (listOfTimes, width) => {
  if (!listOfTimes || listOfTimes.length === 0) {
    return []
  }
  const timeSpanMax = calcTimeWithinADay(listOfTimes[listOfTimes.length - 1])
  const timeSpanMin = calcTimeWithinADay(listOfTimes[0])
  let totalSpan = timeSpanMax - timeSpanMin
  if (totalSpan === 0) {
    totalSpan = 0
  }
  let prevXPos = 0
  return listOfTimes.map((timeElement, index) => {
    const ratio = width / totalSpan // calc the perc. part of the time of the full day
    if (index === 0) {
      return 0
    } else if (index === listOfTimes.length - 1) {
      return width - 40
    } else {
      const xpos = ratio * (calcTimeWithinADay(timeElement) - timeSpanMin) - 20 // calc the xpos of the text
      if (xpos - prevXPos > 50 && width - xpos > 90) {
        prevXPos = xpos
        return xpos
      }
    }
  })
}

// returns an array of the x positions for each date object
const getTimeAreaXPosInPx = (listOfTimes, width) => {
  if (!listOfTimes || listOfTimes.length === 0) {
    return []
  }
  let retWidth = 0 // mem the current return value
  const timeSpanMax = calcTimeWithinADay(listOfTimes[listOfTimes.length - 1])
  const timeSpanMin = calcTimeWithinADay(listOfTimes[0])
  return listOfTimes
    .map((e, i) => {
      if (i === 0) {
        return null
      } else if (i === listOfTimes.length - 1) {
        return width
      } else {
        const ratio = width / (timeSpanMax - timeSpanMin)
        retWidth = ratio * (calcTimeWithinADay(listOfTimes[i]) - timeSpanMin)
        return retWidth
      }
    })
    .filter((e) => e != null)
}

// returns the position of every rectangular dot on the baseline
const getDotPosInPx = (times, width) => {
  if (!times || times.length === 0) {
    return []
  }
  const maxMinutes = calcMinutesWithinAMonth(times[times.length - 1])
  const minMinutes = calcMinutesWithinAMonth(times[0])
  let totalMinutes = maxMinutes - minMinutes
  if (totalMinutes === 0) {
    totalMinutes = 1
  }
  const dotNumber = Math.floor((maxMinutes - minMinutes) / 60) + 2
  const minutesRatio = width / totalMinutes
  const retArray = []
  retArray[0] = { x: 0, height: 10 }
  retArray[dotNumber - 1] = { x: width - 1, height: 10 }
  for (let i = 1; i < dotNumber - 1; i++) {
    if (i === 1) {
      retArray[i] = {
        x: (60 - times[0].getUTCMinutes()) * minutesRatio,
        height: 10
      }
    } else if (
      i === dotNumber - 1 &&
      times[times.length - 1].getUTCMinutes() < times[0].getUTCMinutes()
    ) {
      retArray[i] = {
        x: width - times[times.length - 1].getUTCMinutes() * minutesRatio - 1,
        height: 10
      }
    } else {
      retArray[i] = { x: retArray[i - 1].x + 60 * minutesRatio, height: 10 }
    }
  }
  return retArray
}

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : r ? 0x3 : 0x8
    return v.toString(16)
  })
}

export class Timemeter extends Component {
  static propTypes = {
    times: PropTypes.array,
    colorMode: PropTypes.string,
    colors: PropTypes.array
  }

  constructor(props) {
    super(props)
    let sortedTimes = []
    // times can given in any order, so we want to pre-sort the prop
    if (props.times) {
      sortedTimes = removeDuplicates(
        props.times.sort((e, i) => e.getTime() - i.getTime())
      )
    }

    let filteredColors = defaultColors
    if (props.colors) {
      // mem the previous x value of a time-area
      filteredColors = removeDuplicates(props.colors)
    }

    this.state = {
      times: sortedTimes,
      colors: filteredColors,
      height: 50,
      width: 500
    }
  }

  componentDidMount() {
    // we want to save the actual width and height of the svg
    this.setWidthAndHeight()
  }

  setWidthAndHeight() {
    const height = document.getElementById('container').clientHeight
    const width = document.getElementById('container').clientWidth
    this.setState({ width, height })
  }

  render() {
    const previousX = null
    const { width, height, times, colors } = this.state
    const { colorMode } = this.props
    const baselineYVal = height - 50
    let previousTimeAreaXValue = 0
    return (
      <div style={containerStyle}>
        <svg
          id='container'
          style={styles}
          version='1.1'
          baseProfile='full'
          width='100%'
          height='100%'
        >
          {!times || times.length === 0 ? (
            <text x={width / 2 - 69} y={baselineYVal - 15}>
              No times to display
            </text>
          ) : null}
          {
            // draw all the time areas with given times
            getTimeAreaXPosInPx(times, width).map((px, index) => {
              const area = timeArea(
                previousTimeAreaXValue,
                px + 1, // we add +1 to make sure there are no vertical glitchy lines
                baselineYVal,
                selectColor(colors, colorMode, index)
              )
              previousTimeAreaXValue = px // mem the current x value in px
              return area
            })
          }
          {
            // draw every dot dependent on pattern
            getDotPosInPx(times, width).map((dotValues) =>
              createDot(dotValues.x, baselineYVal, dotValues.height)
            )
          }
          {
            // draw all times as texts below area crossings
            getTimeTextXPosInPx(times, width).map((px, index) => {
              if (px - previousX > 20 || !(index % (times.length - 1))) {
                return text(px, baselineYVal + 20, times[index])
              }
            })
          }
          {/* draw the baseline */}
          <rect
            key='baseline'
            x='0'
            y={baselineYVal}
            width='100%'
            height='1px'
            fill='black'
          />
        </svg>
      </div>
    )
  }
}
