import React, { useState, useEffect } from "react";
import "./4-AsociacionImagenes.css";
import { useNavigate } from "react-router-dom";
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

const ImageAssociationGame = () => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [index, setIndex] = useState(Math.floor(Math.random() * 15) + 1);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const navigate = useNavigate();

  const texts = [
    "Juego balón con una pelota, navego en un ", // barco  
    "Contemplo un paisaje y observo un ", // árbol  
    "Utilizo los tenis para jugar pero para estar presencial utilizo los ", // zapatos  
    "Me siento en una silla, duermo en una ", // cama  
    "Me comunico con mis familiares mediante un ", // teléfono  
    "Tengo un amigo fiel que ladra, es mi ", // perro  
    "En el jardín crece una planta hermosa, es una ", // flor  
    "Brilla en el cielo y da luz durante el día, es el ", // sol  
    "Corto papel fácilmente usando una ", // tijera  
    "Es una fruta roja que crece en los árboles, es una ", // manzana  
    "Bebo agua o jugo de un ", // vaso  
    "Vuelo alto y canto desde las ramas, soy un ", // pájaro  
    "Me deslizo en el suelo y doy miedo a muchos, soy una ", // serpiente  
    "Uso esto para peinar mi cabello, es un ", // peine  
    "Como sopa con este utensilio, es una ", // cuchara  
  ];

  const generatedText = texts[index - 1];

  const shuffleImages = () => {
    const numeros = generarArregloAleatorio();
    setShuffledImages(
      numeros.map((num, i) => ({
        id: i + 1,
        src: `/assets/Juego4/g4${num}.svg`,
        isCorrect: num === index,
        index: index,
        num: num
      }))
    );
  };

  const generarArregloAleatorio = () => {
    // Generar arreglo aleatorio sin repetidos
    const numeros = [];
    while (numeros.length < 4) {
      let numeroAleatorio = Math.floor(Math.random() * 15) + 1;
      // Asegurarse de que el número no sea igual al index
      while (numeroAleatorio === index) {
        numeroAleatorio = Math.floor(Math.random() * 15) + 1;
      }
      if (!numeros.includes(numeroAleatorio)) {
        numeros.push(numeroAleatorio);
      }
    }

    // Elegir una posición aleatoria para insertar el index
    const posicionAleatoria = Math.floor(Math.random() * (numeros.length + 1)); // Entre 0 y numeros.length
    numeros.splice(posicionAleatoria, 0, index); // Insertar el index en la posición aleatoria

    return numeros;
  };

  useEffect(() => {
    shuffleImages(); // Inicializa las imágenes al montar el componente

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    const shuffleTimer = setInterval(() => {
      shuffleImages();
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(shuffleTimer);
    };
  }, [index]);

  const handleImageClick = (image) => {
    if (image.isCorrect) {
      const newCorrects = correctAttempts + 1;
      setCorrectAttempts(newCorrects);
      setIndex(Math.floor(Math.random() * 15) + 1); // Nuevo índice aleatorio
      setTime(0);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 1400);
      setIsCorrect(true);
      if (correctAttempts === 2) {
        setTimeout(() => {
          navigate('/Inicio');
        }, 1400);
      }
    } else {
      const newAttempts = failedAttempts + 1;
      setIsCorrect(false);
      setOpenModal(true);
      if(newAttempts != 3){
        setTimeout(() => {
          setOpenModal(false);
        }, 1400);
      }
      setFailedAttempts(newAttempts);
      setIndex(Math.floor(Math.random() * 15) + 1); // Nuevo índice aleatorio
      setTime(0);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setIndex(Math.floor(Math.random() * 15) + 1); // Nuevo índice aleatorio
    setTime(0);
    setFailedAttempts(0);
    setCorrectAttempts(0);
  }

  return (
    <div className="game-container">
      <div className="failed-attempts">
        <p className="again">Intentos fallidos: {failedAttempts}/3</p>
        <div className="timer">⏱️ {time}s</div>
      </div>
      <div className="title-container">
        <h2 className="observa-title">Asociación con imágenes</h2>
      </div>
      <div className="generated-text">{generatedText}</div>
      <div className="image-grid">
        {shuffledImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Imagen ${image.id}`}
            className="game-image"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      {openModal && (
        <>
          {failedAttempts === 3 ? (
            <ModalPerder text={"¡PERDISTE! Reinicia el juego."} activarBoton={"si"} resetGame={closeModal} />
          ) : (
            <>
              {isCorrect === true ? (
                <ModalGanar text={"¡CORECCTO! Has seleccionado la imagen correcta."} />) :
                (<ModalPerder text={"¡INCORRECTO! Intentalo nuevamente."} />)}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ImageAssociationGame;