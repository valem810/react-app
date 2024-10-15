import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialCards = [
    { id: 1, src: '/images/ribbon.png', matched: false },
    { id: 2, src: '/images/hourglass.jpg', matched: false },
    { id: 3,  src: '/images/ribbon.png', matched: false },
    { id: 4, src: '/images/hourglass.jpg', matched: false },
    { id: 5, src: '/images/sparkle.png', matched: false },
    { id: 6, src: '/images/WR31.png', matched: false },
    { id: 7, src: '/images/sparkle.png', matched: false },
    { id: 8, src: '/images/WR31.png', matched: false },
    { id: 9, src: '/images/galaxy.png', matched: false },
    { id: 10, src: '/images/nebula.jpg', matched: false },
    { id: 11, src: '/images/galaxy.png', matched: false },
    { id: 12, src: '/images/nebula.jpg', matched: false },
    { id: 13, src: '/images/as.png', matched: false },
    { id: 14, src: '/images/as.png', matched: false },
];

function App() {
    const [cards, setCards] = useState(shuffleCards(initialCards));
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [turnPlayer1, setTurnPlayer1] = useState(true); 
    const [scorePlayer1, setScorePlayer1] = useState(0);
    const [scorePlayer2, setScorePlayer2] = useState(0);
    const [disabled, setDisabled] = useState(false); 


    function shuffleCards(cards) {
        return [...cards].sort(() => Math.random() - 0.5);
    }

    // Maneja el clic en una carta
    const handleCardClick = (index) => {
        if (disabled || cards[index].matched || index === firstCard) return;

        if (firstCard === null) {
            setFirstCard(index);
        } else {
            setSecondCard(index);
        }
    };

    
    useEffect(() => {
        if (firstCard !== null && secondCard !== null) {
            setDisabled(true); 

            setTimeout(() => {
                checkMatch();
            }, 1000);
        }
    }, [firstCard, secondCard]);

    
    const checkMatch = () => {
        const updatedCards = [...cards];

        if (cards[firstCard].src === cards[secondCard].src) {
            updatedCards[firstCard].matched = true;
            updatedCards[secondCard].matched = true;

            
            if (turnPlayer1) {
                setScorePlayer1(prev => prev + 1);
            } else {
                setScorePlayer2(prev => prev + 1);
            }
        }

        
        setCards(updatedCards);
        resetTurn();
    };

   
    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
        setTurnPlayer1(prev => !prev); 
    };

    const winnerMessage = () => {
        if (scorePlayer1 > scorePlayer2) return "¡Jugador 1 gana!";
        if (scorePlayer2 > scorePlayer1) return "¡Jugador 2 gana!";
        return "¡Empate!";
    };

    return (
        <div className="container text-center">
            <h1 className="fixed-title">Memorama</h1>
            <div className="score-board">
                <p>Jugador 1: {scorePlayer1}</p>
                <p>Jugador 2: {scorePlayer2}</p>
            </div>

            <div className="image-container">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`flip-card ${card.matched || firstCard === index || secondCard === index ? "flipped" : ""}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="flip-card-inner">
                            <div className="flip-card-front"></div>
                            <div className="flip-card-back">
                                <img src={card.src} alt="Card" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {cards.every(card => card.matched) && <h2>{winnerMessage()}</h2>}
        </div>
    );
}

export default App;
