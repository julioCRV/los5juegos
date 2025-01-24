import React, { useState, useEffect } from 'react';
import './3-EncuentraParejas.css';
import { useNavigate } from 'react-router-dom';
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showAllCards, setShowAllCards] = useState(true);
  const [numerosImpares, setNumerosImpares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generarNumerosImpares = () => {
      let numeros = [];
      while (numeros.length < 5) {
        let numeroAleatorio = Math.floor(Math.random() * 14) * 2 + 1;
        if (numeroAleatorio <= 28 && !numeros.includes(numeroAleatorio)) {
          numeros.push(numeroAleatorio);
        }
      }
      return numeros;
    };

    setNumerosImpares(generarNumerosImpares());
  }, []); // Este useEffect solo se ejecuta al montar el componente

  useEffect(() => {
    if (numerosImpares.length === 5) {
      const initialCards = [
        { id: 1, pairId: 1, image: `/assets/Juego3/g3${numerosImpares[0]}.svg`, flipped: true },
        { id: 2, pairId: 1, image: `/assets/Juego3/g3${numerosImpares[0] + 1}.svg`, flipped: true },
        { id: 3, pairId: 2, image: `/assets/Juego3/g3${numerosImpares[1]}.svg`, flipped: true },
        { id: 4, pairId: 2, image: `/assets/Juego3/g3${numerosImpares[1] + 1}.svg`, flipped: true },
        { id: 5, pairId: 3, image: `/assets/Juego3/g3${numerosImpares[2]}.svg`, flipped: true },
        { id: 6, pairId: 3, image: `/assets/Juego3/g3${numerosImpares[2] + 1}.svg`, flipped: true },
        { id: 7, pairId: 4, image: `/assets/Juego3/g3${numerosImpares[3]}.svg`, flipped: true },
        { id: 8, pairId: 4, image: `/assets/Juego3/g3${numerosImpares[3] + 1}.svg`, flipped: true },
        { id: 9, pairId: 5, image: `/assets/Juego3/g3${numerosImpares[4]}.svg`, flipped: true },
        { id: 10, pairId: 5, image: `/assets/Juego3/g3${numerosImpares[4] + 1}.svg`, flipped: true },
      ];

      setCards(shuffleArray(initialCards));

      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => ({ ...card, flipped: false }))
        );
        setShowAllCards(false);
      }, 3000);
    }
  }, [numerosImpares]); // Este useEffect depende de numerosImpares

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleCardClick = (index) => {
    if (showAllCards || cards[index].flipped || flippedCards.length === 2) return;

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

  useEffect(() => {
    if (matchedPairs === 5) {
      setTimeout(() => {
        navigate('/Inicio');
      }, 1400);
    } 
  }, [matchedPairs]); 

  const resetGame = () => {
    setCards(shuffleArray(cards.map(card => ({ ...card, flipped: true }))));
    setFlippedCards([]);
    setMatchedPairs(0);
    setAttempts(0);
    setShowAllCards(true);
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      setShowAllCards(false);
    }, 3000);
  };

  return (
    <div className="memory-game">
      <div className="status">
        <p className="again">Intentos fallidos: {attempts}/5</p>
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
        <ModalGanar text={"¡HAS GANADO!"} />
      )}
      {attempts >= 5 && matchedPairs < 5 && (
        <ModalPerder text={"¡HAS PERDIDO!"} activarBoton={"si"} resetGame={resetGame} />
      )}
    </div>
  );
};

export default MemoryGame;