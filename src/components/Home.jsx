import { useState, useEffect } from 'react';
import '../css/style.css';

function Home() {
    const [position, setPosition] = useState([]);
    const [points, setPoints] = useState(10); 
    const [spinning, setSpinning] = useState(false); 
    const iconHeight = 188;
    const multiplier = Math.floor(Math.random() * (4 - 1) + 1);
    const speed = iconHeight * multiplier;
    const [winner, setWinner] = useState(false);
    const [score, setScore] = useState(0);

    const positions = [-940, -188, -0, -376, -1316, -1504, -564, -752, -1128];

    const scores = [5, 10, 15, 20, 25, 30, 35, 40, 45]; 

    useEffect(() => {
        finishHandler();
    }, []);

    useEffect(() => {
        if (spinning) {
            const interval = spinAutomatically();
            return () => clearInterval(interval); // เมื่อ unmount หรือเมื่อ spinning ถูกตั้งเป็น false
        }
    }, [spinning]);

    useEffect(() => {
        if (position.length === 3) {
            const first = position[0];
            const results = position.every(match => match === first);
            setWinner(results);
            if (results) {
                const index = positions.findIndex(pos => pos === first);
                const positionScore = scores[index];
                setScore(prevScore => prevScore + positionScore);
                handleWin(); // เรียกใช้ function เพิ่มแต้มเมื่อชนะ
            }
        }
    }, [position]);

    useEffect(() => {
        if (points === 0) {
            setSpinning(false); // หยุดการหมุนเมื่อแต้มหมด
        }
    }, [points]);

    const handleWin = () => {
        setPoints(prevPoints => prevPoints + 1); // เพิ่มจำนวนแต้มที่ผู้เล่นมี
    };

    const handleClick = () => {
        if (points > 0 && !spinning) { // ตรวจสอบว่ามีแต้มเพียงพอที่จะหมุนล้อหรือไม่ และกล่องไม่ได้หมุนอยู่แล้ว
            setSpinning(true); // เริ่มการหมุน
        }
    };

    const spinAutomatically = () => {
        return setInterval(() => {
            setPosition([]);
            finishHandler();
            setPoints(prevPoints => (prevPoints > 0 ? prevPoints - 1 : 0)); // ลดจำนวนแต้มหลังจากการหมุนล้อ แต่ไม่ต่ำกว่า 0
        }, 1000); // หมุนทุก 1 วินาที
    };

    const finishHandler = () => {
        const newPositions = Array.from({ length: 3 }, () => {
            const randomIndex = Math.floor(Math.random() * positions.length);
            return positions[randomIndex];
        });
        setPosition(newPositions);
    };

    return (
        <div>
            <h1 style={{ color: winner ? 'green' : 'red' }}>
                {winner ? 'Winner!' : 'Loss'}
            </h1>
            <h2 style={{ color: 'white' }}>คะแนน: {score}</h2>
            <h2 style={{ color: 'white' }}>แต้ม: {points}</h2>
            <div className={`spinner-container`}>
                {position.map((pos, index) => (
                    <div key={index} style={{ backgroundPosition: '0px ' + pos + 'px' }} className={`icons ${winner && spinning ? 'flashing' : ''}`} />
                ))}
            </div>
            <button aria-label='Play again.' onClick={handleClick} className='bt-spin' disabled={points <= 0 || spinning}>spin</button>
        </div>
    );
}

export default Home;
