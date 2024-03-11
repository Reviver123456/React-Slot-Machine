import { useState, useRef } from 'react'
import Spinner from '../components/Spinner.jsx'
import '../css/style.css'

function Home() {

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

    const matches = [];

    const [winner, setWinner] = useState(null);

    const finishHandler = (value) => {
        matches.push(value);

        if (matches.length === 3) {
            const first = matches[0];
            const results = matches.every(match => match === first);
            setWinner(results);
        }
    };

    const emptyArray = () => {
        matches.length = 0;
    };

    const handleClick = () => {
        setWinner(null);
        emptyArray();
        childRefs.forEach(childRef => childRef.current.forceUpdateHandler());
    };

    const getLoser = () => {
        return loserOptions[Math.floor(Math.random() * loserOptions.length)];
    };

    const childRefs = [useRef(), useRef(), useRef()];

    return (
        <div>
            <h1 style={{ color: 'white' }}>
                <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
            </h1>

            <div className={`spinner-container`}>
                {childRefs.map((ref, index) => (
                    <Spinner key={index} onFinish={finishHandler} ref={ref} timer={[1000, 1400, 2200][index]} />
                ))}
                <div className="gradient-fade"></div>
            </div>
            <button aria-label='Play again.' onClick={handleClick} style={{ color: "white" }}>play</button>
        </div>
    );
}



export default Home