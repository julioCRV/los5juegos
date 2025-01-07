import React, { useState, useEffect } from 'react';
import './3-EncuentraParejas.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const initialCards = [
      { id: 1, pairId: 1, image: '/src/assets/g31.svg', flipped: false },
      { id: 2, pairId: 1, image: '/src/assets/g32.svg', flipped: false },
      { id: 3, pairId: 2, image: '/src/assets/g33.svg', flipped: false },
      { id: 4, pairId: 2, image: '/src/assets/g34.svg', flipped: false },
      { id: 5, pairId: 3, image: '/src/assets/g35.svg', flipped: false },
      { id: 6, pairId: 3, image: '/src/assets/g36.svg', flipped: false },
      { id: 7, pairId: 4, image: '/src/assets/g37.svg', flipped: false },
      { id: 8, pairId: 4, image: '/src/assets/g38.svg', flipped: false },
      { id: 9, pairId: 5, image: '/src/assets/g39.svg', flipped: false },
      { id: 10, pairId: 5, image: '/src/assets/g310.svg', flipped: false },
    ];
    setCards(shuffleArray(initialCards));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (cards[index].flipped || flippedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (newCards[firstIndex].pairId === newCards[secondIndex].pairId) {
        setMatchedPairs((prev) => prev + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setAttempts((prev) => prev + 1);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleArray(cards.map(card => ({ ...card, flipped: false }))));
    setFlippedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
  };

  return (
    <div className="memory-game">
      <div className="status">
        <p>Intentos fallidos: {attempts}/3</p>
        <h1>Encuentra parejas</h1>
      </div>
      <div className="cards">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${card.flipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped ? (
              <img src={`${card.image}`} alt="Card" className="card-image" />
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>
      {matchedPairs === 5 && (
        <div className="game-over">
          <h2>¡Has ganado!</h2>
          <button onClick={resetGame}>Reiniciar</button>
        </div>
      )}
      {attempts >= 3 && matchedPairs < 5 && (
        <div className="game-over">
          <h2>¡Has perdido!</h2>
          <button onClick={resetGame}>Reintentar</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;