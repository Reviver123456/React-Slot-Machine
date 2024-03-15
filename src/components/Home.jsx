import { useState, useEffect } from 'react';
import '../css/style.css';

function Home() {
    const [position, setPosition] = useState([0, 0, 0]);
    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;

    const start = (Math.floor(Math.random() * 9) * iconHeight) * -1;
    const [winner, setWinner] = useState(false);

    useEffect(() => {
        if (position.length === 3) {
            const first = position[0];
            const results = position.every(match => match === first);
            setWinner(results);
        }
    }, [position]);

    const handleClick = () => {
        setPosition([]);
        finishHandler();
    };

    const finishHandler = () => {
        const newPositions = Array.from({ length: 3 }, () => {
            const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
            const speed = iconHeight * multiplier;
            const start = (Math.floor(Math.random() * 9) * iconHeight) * -1;
            return start;
        });
        setPosition(newPositions);
    };

    return (
        <div>
            <h1 style={{ color: 'white' }}>
                {winner && 'Winner!'}
            </h1>
            <div className={`spinner-container`}>
                <div style={{ backgroundPosition: '0px ' + position[0] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[1] + 'px' }} className={`icons`} />
                <div style={{ backgroundPosition: '0px ' + position[2] + 'px' }} className={`icons`} />
            </div>
            <button aria-label='Play again.' onClick={handleClick}>spin</button>
        </div>
    );
}

export default Home;
