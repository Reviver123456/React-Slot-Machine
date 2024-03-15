import { useState, useRef, useEffect } from 'react'
import Spinner from '../components/Spinner.jsx'
import '../css/style.css'
const loserOptions = [
    'lost!',
];
function Home() {

    const [position, setPosition] = useState([0, 0, 0]);
    // const [timeRemaining, setTimeRemaining] = useState(1000, 1400, 2200);

    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;

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
        // if (position.length === 3) {
        //     const first = position[0];
        //     const results = position.every(match => match === first);
        //     console.log("results", results);
        //     setWinner(results);
        // }

        const firstSymbol = position[0];
        if (position.every(match => match === firstSymbol)) {
            const symbolScore = getSymbolScore(firstSymbol);
            if (symbolScore > 0) {
                setScore(score + symbolScore);
                setWinner(true);
                return;
            }
        }
        setWinner(false);
    };

    const getSymbolScore = (position) => {
        switch (position) {
            case position[0]:
                return "position", position[0];
            case position[1]:
                return 10;
            case position[2]:
                return 20;
            case position[3]:
                return 2;
            case position[4]:
                return 3;
            case position[5]:
                return 4;
            case position[6]:
                return 5;
            case position[7]:
                return 11;
            case position[8]:
                return 25;
            default:
                return 0;
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