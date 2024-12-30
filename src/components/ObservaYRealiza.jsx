import React, { useState } from "react";
import "./ObservaYRealiza.css";

const ObservaYRealiza = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");

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
      if (result.includes("serpiente")) {
        setMessage("¡Correcto!");
      } else {
        setMessage("¡Incorrecto!");
      }
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
          src="/src/assets/g11.svg" // Cambia esta ruta según tu imagen
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
