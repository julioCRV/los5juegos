import React, { useState, useEffect } from 'react';
import './3-EncuentraParejas.css';
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const initialCards = [
      { id: 1, pairId: 1, image: '/src/assets/Juego3/g31.svg', flipped: false },
      { id: 2, pairId: 1, image: '/src/assets/Juego3/g32.svg', flipped: false },
      { id: 3, pairId: 2, image: '/src/assets/Juego3/g33.svg', flipped: false },
      { id: 4, pairId: 2, image: '/src/assets/Juego3/g34.svg', flipped: false },
      { id: 5, pairId: 3, image: '/src/assets/Juego3/g35.svg', flipped: false },
      { id: 6, pairId: 3, image: '/src/assets/Juego3/g36.svg', flipped: false },
      { id: 7, pairId: 4, image: '/src/assets/Juego3/g37.svg', flipped: false },
      { id: 8, pairId: 4, image: '/src/assets/Juego3/g38.svg', flipped: false },
      { id: 9, pairId: 5, image: '/src/assets/Juego3/g39.svg', flipped: false },
      { id: 10, pairId: 5, image: '/src/assets/Juego3/g310.svg', flipped: false },
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
        <p className="again">Intentos fallidos: {attempts}/3</p>
        <h2 className="observa-title">Encuentra parejas</h2>
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
        <ModalGanar text={"¡HAS GANADO!"} activarBoton={"si"} resetGame={resetGame}/>
      )}
      {attempts >= 3 && matchedPairs < 5 && (
        <ModalPerder text={"¡HAS PERDIDO!"} activarBoton={"si"} resetGame={resetGame}/>
      )}
    </div>
  );
};

export default MemoryGame;