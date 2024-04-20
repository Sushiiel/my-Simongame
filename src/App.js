import React, { useState, useEffect } from "react";
import "./App.css";
const colors = ["green", "red", "yellow", "blue"];
const App = () => {
const [sequence, setSequence] = useState([]);
const [userSequence, setUserSequence] = useState([]);
const [message, setMessage] = useState("Press Start");
const [isPlaying, setIsPlaying] = useState(false);
const [isStrict, setIsStrict] = useState(false);
const [turn, setTurn] = useState(1);
useEffect(() => {
if (isPlaying) {
generateSequence();
}
}, [isPlaying]);
const generateSequence = () => {
const newSequence = [...sequence];
newSequence.push(colors[Math.floor(Math.random() * 4)]);
setSequence(newSequence);
playSequence(newSequence);
setUserSequence([]);
};
const playSequence = (seq) => {
let i = 0;
const interval = setInterval(() => {
if (i === seq.length) {
clearInterval(interval);
setMessage("Your turn");
} else {
const button = document.getElementById(seq[i]);
button.classList.add("active");
setTimeout(() => {
button.classList.remove("active");
}, 300);
i++;
}
}, 600);
};
const handleClick = (color) => {
if (isPlaying && message === "Your turn") {
const newUserSequence = [...userSequence, color];
setUserSequence(newUserSequence);
if (newUserSequence[newUserSequence.length - 1] !==
sequence[newUserSequence.length - 1]) {
setMessage("Wrong! Try again");
if (isStrict) {
setSequence([]);
setTurn(1);
}
setTimeout(() => {
setMessage("Watch the sequence");
setUserSequence([]);
playSequence(sequence);
}, 1000);
} else if (newUserSequence.length === sequence.length) {
if (turn === 20) {
setMessage("Congratulations! You won!");
setIsPlaying(false);
} else {
setMessage("Correct!");
setTimeout(() => {
setMessage("Watch the sequence");
setTurn(turn + 1);
generateSequence();
}, 1000);
}
}
}
};
const handleStart = () => {
setSequence([]);
setUserSequence([]);
setIsPlaying(true);
setMessage("Watch the sequence");
setTurn(1);
};
const handleStrict = () => {
setIsStrict(!isStrict);
};
return (
<div className="container">
<h1>Simon Game</h1>
<div className="game-board">
{colors.map((color) => (
<div
key={color}
id={color}
className={`color-button ${color}`}
onClick={() => handleClick(color)}
/>
))}
</div>
<div className="controls">
<button onClick={handleStart}>Start</button>
<button onClick={handleStrict}>Strict</button>
</div>
<div className="message">{message}</div>
<div className="turn">Level: {turn}</div>
</div>
);
};
export default App;
