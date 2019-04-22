import React, { useState } from 'react';
import { css, cx } from 'emotion';
import { Howl } from 'howler';

import Clock from './Clock';

const soundCorrect = new Howl({
  src: ['correct2.mp3'],
  preload: true,
});

const soundIncorrect = new Howl({
  src: ['incorrect2.mp3'],
  preload: true,
});

const soundMilestone = new Howl({
  src: ['shine1.mp3'],
  preload: true,
});

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
background-color: rgba(0, 0, 0, 0.1);
font-size: 20px;
`;

const fullScreenOverlay = css`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
color: white;
font-size: 60px;
display: none; /* flex */
justify-content: center;
align-items: center;

div {
  flex: 0 0 auto;
}
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
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);

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
      correct = ((answerHour === questionHour + 1) || (answerHour + 12 === questionHour + 1))
        && (10 - answerMinute === questionMinute);
    }

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      setQuestionHour(getRandomInt(12));
      setQuestionMinute(getRandomInt(11));
      if (newScore % 10 === 0) {
        setShowMilestone(true);
        setTimeout(() => soundMilestone.play(), 10);
        setTimeout(() => setShowMilestone(false), 1000);
      } else {
        setShowCorrect(true);
        setTimeout(() => soundCorrect.play(), 10);
        setTimeout(() => setShowCorrect(false), 1000);
      }
    } else {
      setShowIncorrect(true);
      setTimeout(() => soundIncorrect.play(), 10);
      setTimeout(() => setShowIncorrect(false), 1000);
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
        <button className={fullWidthControl} type="button" onClick={handleAnswer}><span>&#128077;</span></button>
      </div>
      <div className={cx(fullScreenOverlay, { [css`display:flex;`]: showCorrect})}><div>Good!<span>&#128077;</span></div></div>
      <div className={cx(fullScreenOverlay, { [css`display:flex;`]: showIncorrect})}><div>Try again<span>&#128546;</span></div></div>
      <div className={cx(fullScreenOverlay, { [css`display:flex;`]: showMilestone})}><div><span>&#128124;</span>Excellent<span>&#128124;</span></div></div>
    </div>
  );
}


export default App;
