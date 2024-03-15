import { useState, useRef, useEffect } from 'react'
import '../css/style.css'
const loserOptions = [
    'lost!',
];
function Home() {

    const [position, setPosition] = useState([0, 0, 0]);
    // const [timeRemaining, setTimeRemaining] = useState(1000, 1400, 2200);

    const iconHeight = 188;
    // const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    // const speed = iconHeight * multiplier;

    const start = (Math.floor(Math.random() * 9) * iconHeight) * -1;

    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState(0);

    if (position.length < 3) {
        setPosition([...position, start]);
    }

    const handleClick = () => {
        setWinner(null);
        setPosition([]);
        finishHandler();
    };

    const finishHandler = () => {
        if (position.length === 3) {
            const one = position[0];
            const two = position[1];
            const three = position[2];
            if (position.every(match => match === one)) {
                setScore(score + 5);
                setWinner(true);
            }
            if (position.every(match => match === two)) {
                setScore(score + 5);
                setWinner(true);
            }
            if (position.every(match => match === three)) {
                setScore(score + 5);
                setWinner(true);
            }
            if (position[0] === position[1]) {
                setScore(score + 1);
                setWinner(false);
            }
            if (position[0] === position[2]) {
                setScore(score + 1);
                setWinner(false);
            }
        }
    };

    const getLoser = () => {
        return loserOptions[Math.floor(Math.random() * loserOptions.length)];
    };

    console.log("position", position);
    console.log("winner", winner);
    console.log("score", score);


    // function reset() {

    //     if (currentTime) {
    //         clearInterval(currentTime);
    //     }
    //     setPosition(start);
    //     setTimeRemaining(timeRemaining);

    //     const currentTime = setInterval(() => {
    //         // tick()
    //     }, 100);
    // }

    // function moveBackground() {
    //     setPosition(speed);
    //     setTimeRemaining(100);
    // }

    // function getSymbolFromPosition() {
    //     const totalSymbols = 9;
    //     const maxPosition = (iconHeight * (totalSymbols - 1) * -1);
    //     let currentPosition = start;
    //     let moved = (timeRemaining / 100) * multiplier;

    //     for (let i = 0; i < moved; i++) {
    //         currentPosition -= iconHeight;

    //         if (currentPosition < maxPosition) {
    //             currentPosition = 0;
    //         }
    //     }

    //     // finishHandler(currentPosition);

    // }

    // function tick() {
    //     if (timeRemaining <= 0) {
    //         clearInterval(timeRemaining);
    //         getSymbolFromPosition();
    //     } else {
    //         moveBackground();
    //     }
    // }

    // useEffect(() => {
    //     const timerInterval = setInterval(() => {
    //         tick();
    //     }, 100);

    //     return () => {
    //         clearInterval(timerInterval);
    //     };
    // }, [timeRemaining]);

    // useEffect(() => {
    //     setPosition([0, 0, 0]);
    // }, []);

    return (
        <div>
            <h1 style={{ color: 'white' }}>
                <span>{winner === null ? 'Waiting…' : winner ? '🤑 Jack Pot! 🤑' : getLoser()}</span>
            </h1>
            <div className={`spinner-container`}>
                <div style={{ backgroundPosition: '0px ' + position[0] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[1] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[2] + 'px' }} className={`icons`} />
            </div>
            <button aria-label='Play again.' onClick={handleClick}>spin</button>
            <div className='money-t'>คะแนน: {score}</div>
        </div>
    );
}



export default Home