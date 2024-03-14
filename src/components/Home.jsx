import { useState, useRef, useEffect } from 'react'
import Spinner from '../components/Spinner.jsx'
import '../css/style.css'
const loserOptions = [
    'Not quite',
    'Stop gambling',
    'Hey, you lost!',
    'Ouch! I felt that',
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
];
function Home() {

    const [position, setPosition] = useState([0, 0, 0]);
    // const [timeRemaining, setTimeRemaining] = useState(1000, 1400, 2200);

    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;
    const start = (Math.floor(Math.random() * 9) * iconHeight) * -1;
    const [winner, setWinner] = useState(null);

    if (position.length < 3) {
        setPosition([...position, start]);
        console.log("g");
    }

    const handleClick = () => {
        setWinner(null);
        setPosition([]);
        finishHandler();
    };

    const finishHandler = () => {
        if (position.length === 3) {
            const first = position[0];
            const results = position.every(match => match === first);
            console.log("results", results);
            setWinner(results);
        }
    };

    const getLoser = () => {
        return loserOptions[Math.floor(Math.random() * loserOptions.length)];
    };

    console.log("position", position);
    console.log("winner", winner);




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
            <button aria-label='Play again.' onClick={handleClick} >spin</button>
        </div>
    );
}



export default Home