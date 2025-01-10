import React, { useState, useEffect } from "react";
import './ModalEstilo.css';
import ModalCorrecto from '../assets/iconos/correcto.svg'

const ModalBien = ({ text, activarBoton, resetGame }) => {
  const [isActivate, setIsActivate] = useState(false);

  // Verifica si activarBoton tiene el valor "si"
  useEffect(() => {
    if (activarBoton === "si") {
      setIsActivate(true);
    }
  }, [activarBoton]); // Ejecuta el efecto cada vez que activarBoton cambie

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
      </div>
    </div>
  );
};

export default ModalBien;
