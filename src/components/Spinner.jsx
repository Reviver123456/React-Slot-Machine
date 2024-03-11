import { useState, useEffect, useRef } from 'react'

function Spinner({ onFinish, timer }) {
    const [position, setPosition] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(timer);
    const lastPosition = useRef(null);

    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const start = setStartPosition();
    const speed = iconHeight * multiplier;

    function setStartPosition() {
        return (Math.floor(Math.random() * 9) * iconHeight) * -1;
    }

    function moveBackground() {
        setPosition((prevPosition) => prevPosition - speed);
        setTimeRemaining((prevTime) => prevTime - 100);
    }

    function getSymbolFromPosition() {
        const totalSymbols = 9;
        const maxPosition = (iconHeight * (totalSymbols - 1) * -1);
        let currentPosition = start;
        let moved = (timer / 100) * multiplier;

        for (let i = 0; i < moved; i++) {
            currentPosition -= iconHeight;

            if (currentPosition < maxPosition) {
                currentPosition = 0;
            }
        }

        onFinish(currentPosition);
    }

    function tick() {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            getSymbolFromPosition();
        } else {
            moveBackground();
        }
    }

    useEffect(() => {
        const timerInterval = setInterval(() => {
            tick();
        }, 100);

        return () => {
            clearInterval(timerInterval);
        };
    }, [timeRemaining]);

    useEffect(() => {
        setPosition(start);
        setTimeRemaining(timer);
    }, [timer]);

    return (
        <div style={{ backgroundPosition: '0px ' + position + 'px' }} className={`icons`} />
    );
}


export default Spinner