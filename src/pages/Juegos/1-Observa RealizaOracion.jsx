import React, { useState } from "react";
import "./1-Observa RealizaOracion.css";
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";
import { useNavigate } from "react-router-dom";

const ObservaYRealiza = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [idImagen, setIdImagen] = useState(Math.floor(Math.random() * 13) + 1);
  const [correctCount, setCorrectCount] = useState(0);
  const navigate = useNavigate()

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Tu navegador no soporta la API de reconocimiento de voz.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "es-ES"; // Configuración del idioma
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript.toLowerCase();
      setTranscript(result);

      // Verificar la respuesta
      let respuesta = "¡Incorrecto!";
      let isCorrect = false;

      if (
        (idImagen === 1 && result.includes("serpiente")) ||
        (idImagen === 2 && result.includes("taxi")) ||
        (idImagen === 3 && result.includes("tenis")) ||
        (idImagen === 4 && result.includes("peine")) ||
        (idImagen === 5 && result.includes("tijera")) ||
        (idImagen === 6 && result.includes("manzana")) ||
        (idImagen === 7 && result.includes("cuchara")) ||
        (idImagen === 8 && result.includes("vaso")) ||
        (idImagen === 9 && result.includes("pájaro")) ||
        (idImagen === 10 && result.includes("flor")) ||
        (idImagen === 11 && result.includes("perro")) ||
        (idImagen === 12 && result.includes("sol")) ||
        (idImagen === 13 && result.includes("gato"))
      ) {
        respuesta = "¡Correcto!";
        isCorrect = true;
      }

      if (isCorrect) {
        setCorrectCount((prevCount) => prevCount + 1);
        setIdImagen(Math.floor(Math.random() * 13) + 1); // Cambia a otra imagen aleatoria
        if (correctCount === 4) {
          // Agregar un delay de 3 segundos antes de redirigir
          setTimeout(() => {
            navigate('/Inicio');
          }, 1400); 
        }
      } else {
        setCorrectCount(0); // Reinicia el contador si se falla
      }

      setMessage(respuesta);
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
      setMessage("Hubo un error al procesar tu voz.");
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => setMessage(""), 1300); // Limpia el mensaje después de 1 segundos
    };

    recognition.start();
  };

  return (
    <div className="observa-container">
      <h2 className="observa-title">Observa y realiza una oración</h2>
      <div className="observa-row">
        <img
          src={`/assets/Juego1/g1${idImagen}.svg`} // Cambia esta ruta según tu imagen
          alt="Ejemplo"
          className="observa-image"
        />
        <button
          className={`mic-button ${isListening ? "listening" : ""}`}
          onClick={startListening}
          disabled={isListening} // Deshabilita el botón durante la escucha
        >
          <img
            src="/assets/microfono.svg" // Ruta de la imagen del micrófono
            alt="Micrófono"
            className="mic-icon"
          />
        </button>
      </div>
      <div className="observa-transcript">
        <input
          type="text"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)} // Actualiza el estado `transcript`
          placeholder="Presiona el micrófono para hablar..."
          className="transcript-input"
        />
      </div>

      <div>
        {message && (
          <>
            {correctCount === 5 && message === "¡Correcto!" ? (
              <ModalGanar text={"¡Felicidades! Respondiste correctamente 5 veces seguidas."} />
            ) : (
              <>
                {message === "¡Correcto!" ? (
                  <ModalGanar text={"¡CORRECTO!"} />
                ) : (
                  <ModalPerder text={"¡INCORRECTO!"} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ObservaYRealiza;


