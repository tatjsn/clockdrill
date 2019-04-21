import React, { useState } from 'react';
import { css, cx } from 'emotion';

import Clock from './Clock';

const hours = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
];

const mins = [
  'Five',
  'Ten',
  'Quater',
  'Twenty',
  'Twenty five',
  'Half',
];

const relatives = [
  'Past',
  'To',
];

const fullWidthControl = css`
display: block;
width: 100%;
height: 40px;
background-color: rgba(0, 0, 0, 0.1)
`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function App() {
  const [score, setScore] = useState(0);
  const [questionHour, setQuestionHour] = useState(getRandomInt(12));
  const [questionMinute, setQuestionMinute] = useState(getRandomInt(11));
  const [answerHour, setAnswerHour] = useState(0);
  const [answerMinute, setAnswerMinute] = useState(0);
  const [answerRelative, setAnswerRelative] = useState(0);

  function handleSelectMinute(event) {
    setAnswerMinute(mins.findIndex(item => item === event.target.value));
  }

  function handleSelectHour(event) {
    setAnswerHour(hours.findIndex(item => item === event.target.value));
  }

  function handleSelectRelative(event) {
    setAnswerRelative(relatives.findIndex(item => item === event.target.value));
  }

  function handleAnswer() {
    let correct;

    if (answerRelative === 0) {
      // Past
      correct = (answerHour === questionHour) && (answerMinute === questionMinute);
    } else {
      // To
      correct = (answerHour === questionHour + 1) && (10 - answerMinute === questionMinute);
    }

    if (correct) {
      setScore(score + 1);
      setQuestionHour(getRandomInt(12));
      setQuestionMinute(getRandomInt(11));
    }
  }

  return (
    <div className={css`
position: relative;
height: 100vh;
padding-top: 40px;
`}>
      <Clock className={css`
margin: 0 auto;
`} hours={questionHour + 1} mins={(questionMinute + 1) * 5} />
      <div className={css`
position: absolute;
top: 0;
left: 0;
width: 100%;
line-height: 40px;
`}>Score: {score}</div>
      <div className={css`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
`}>
        <select className={fullWidthControl} value={mins[answerMinute]} onChange={handleSelectMinute}>
          {mins.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className={fullWidthControl} value={relatives[answerRelative]} onChange={handleSelectRelative}>
          {relatives.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select className={fullWidthControl} value={hours[answerHour]} onChange={handleSelectHour}>
          {hours.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <button className={fullWidthControl} type="button" onClick={handleAnswer}>Ok</button>
      </div>
    </div>
  );
}


export default App;
