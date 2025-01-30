import React, { useState, useEffect } from "react";
import './ModalEstilo.css';
import ModalCorrecto from '/assets/iconos/correcto.svg'

const ModalBien = ({ text, activarBoton, resetGame, activarTiempo, time }) => {
  const [isActivate, setIsActivate] = useState(false);
  const [isActivateTime, setIsActivateTime] = useState(false);

  // Verifica si activarBoton tiene el valor "si"
  useEffect(() => {
    if (activarBoton === "si") {
      setIsActivate(true);
    }

    if (activarTiempo === "si") {
      setIsActivateTime(true);
    }
  }, [activarBoton, activarTiempo]); // Ejecuta el efecto cada vez que activarBoton cambie

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={ModalCorrecto}
          alt="Ícono de Bien"
          className="modal-icon"
        />
        <p className="modal-text">{text}</p>
        {isActivate && (
          <button className="button" onClick={resetGame}>Reiniciar</button>
        )}

        {isActivateTime && (
          <p>⏱️ {time} s</p>
        )}
      </div>
    </div>
  );
};

export default ModalBien;
