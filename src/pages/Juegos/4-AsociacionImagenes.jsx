import React, { useState, useEffect } from "react";
import "./4-AsociacionImagenes.css";

const ImageAssociationGame = () => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [index, setIndex] = useState(Math.floor(Math.random() * 5) + 1);

  const texts = [
    "Juego balon con una pelota, navego en un",
    "Contemplo un paisaje y observo un",
    "Utilizo los tenis para jugar pero para estar presencial utilizo los",
    "Me siento en una silla, duermo en una",
    "Me comunico con mis familiares mediante",
  ];

  const generatedText = texts[index - 1]; // Selecciona el texto basado en el índice

  const numeros = [1, 2, 3, 4, 5];
  for (let i = numeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
  }

  const images = numeros.map((num, i) => ({
    id: i + 1,
    src: `/src/assets/g4${num}.svg`,
    isCorrect: num === index,
  }));

  useEffect(() => {
    // Inicia el temporizador solo una vez al inicio
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // Detener el temporizador cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []); // El arreglo vacío asegura que solo se ejecute una vez

  const handleImageClick = (image) => {
    if (image.isCorrect) {
      alert("¡Correcto! Has seleccionado la imagen correcta.");
      //Implementar logica para cargar la informacion y al usuario
      setIndex(Math.floor(Math.random() * 5) + 1); // Nuevo índice aleatorio
      setFailedAttempts(0);
      setTime(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 3) {
        alert("¡Perdiste! Reinicia el juego.");
        setFailedAttempts(0);
        setIndex(Math.floor(Math.random() * 5) + 1);
        setTime(0);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="failed-attempts">
        <strong>Intentos fallidos:</strong> {failedAttempts}/3
      </div>
      <div className="title-container">
        <h2>Asociación con imágenes</h2>
        <div className="timer">⏱️ {time}s</div>
      </div>
      <div className="generated-text">{generatedText}</div>
      <div className="image-grid">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Imagen ${image.id}`}
            className="game-image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageAssociationGame;