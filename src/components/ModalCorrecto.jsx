import React, { useState } from "react";
import './ModalEstilo.css';
import ModalCorrecto from '../assets/iconos/correcto.svg'

const ModalBien = () => {

  return (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src={ModalCorrecto}
              alt="Ícono de Bien"
              className="modal-icon"
            />
            <p className="modal-text">¡CORRECTO!</p>
          </div>
        </div>
  );
};

export default ModalBien;
