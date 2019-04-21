import React from 'react';
import { css, cx } from 'emotion';

function clockToRadian(num) {
  return (num * 2 - 6) * Math.PI / 12;
}

function Clock({ hours, mins, className }) {
  return (
    <div className={cx(css`
position: relative;
width: 300px;
height: 300px;
border: solid black 4px;
border-radius: 50%;
`, className)}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
        <div key={num} className={cx(css`
position: absolute;
width: 3rem
height: 3rem;
top: 50%;
left: 50%;
font-size: 24px;
font-weight: bold;
`, css`
transform: translate(
calc(${Math.cos(clockToRadian(num)) * 135}px - 50%),
calc(${Math.sin(clockToRadian(num)) * 135}px - 50%)
)
`)}>{num}</div>
      ))}
      <div className={cx(css`
position: absolute;
width: 80px;
height: 12px;
background-color: blue;
top: 50%;
left: 50%;
transform-origin: center left;
`, css`
transform: translate(0, -50%) rotate(${clockToRadian(hours + mins / 60)}rad)
`)}/>
      <div className={cx(css`
position: absolute;
width: 120px;
height: 10px;
background-color: red;
top: 50%;
left: 50%;
transform-origin: center left;
`, css`
transform: translate(0, -50%) rotate(${clockToRadian(mins / 5)}rad)
`)}/>
    </div>
  );
}

export default Clock;
