import React, { useState } from "react";
import "./1-Observa RealizaOracion.css";

const ObservaYRealiza = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(Math.floor(Math.random() * 8) + 1);
  

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

      // Comprobar si la palabra "serpiente" está en el resultado
      let respuesta = "¡Incorrecto!";
      if(index === 1 && result.includes("serpiente")){
        respuesta = "¡Correcto!"
      }else if(index === 2 && result.includes("taxi")){
        respuesta = "¡Correcto!"
      }else if(index === 3 && result.includes("tenis")){
        respuesta = "¡Correcto!"
      }else if(index === 4 && result.includes("peine")){
        respuesta = "¡Correcto!"
      }else if(index === 5 && result.includes("tijera")){
        respuesta = "¡Correcto!"
      }else if(index === 6 && result.includes("manzana")){
        respuesta = "¡Correcto!"
      }else if(index === 7 && result.includes("cuchara")){
        respuesta = "¡Correcto!"
      }else if(index === 8 && result.includes("vaso")){
        respuesta = "¡Correcto!"
      }

      
      setMessage(respuesta);
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
      setMessage("Hubo un error al procesar tu voz.");
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => setMessage(""), 3000); // Limpia el mensaje después de 3 segundos
    };

    recognition.start();
  };

  return (
    <div className="observa-container">
      <h2 className="observa-title">Observa y realiza una oración</h2>
      <div className="observa-row">
        <img
          src={`/src/assets/g1${index}.svg`} // Cambia esta ruta según tu imagen
          alt="Ejemplo"
          className="observa-image"
        />
        <button
          className={`mic-button ${isListening ? "listening" : ""}`}
          onClick={startListening}
          disabled={isListening} // Deshabilita el botón durante la escucha
        >
          <img
            src="/src/assets/microfono.svg" // Ruta de la imagen del micrófono
            alt="Micrófono"
            className="mic-icon"
          />
        </button>
      </div>
      <div className="observa-transcript">
        {transcript ? transcript : "Presiona el micrófono para hablar..."}
      </div>
      {message && (
        <div className={`message ${message === "¡Correcto!" ? "correct" : "incorrect"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ObservaYRealiza;