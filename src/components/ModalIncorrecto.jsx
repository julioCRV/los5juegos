import React, { useState } from "react";
import './ModalEstilo.css';
import IconIncorrecto from '../assets/iconos/incorrecto.svg';

const ModalMal = () => {

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <img
                    src={IconIncorrecto}
                    alt="Ícono de Mal"
                    className="modal-icon"
                />
                <p className="modal-text">¡INCORRECTO!</p>
            </div>
        </div>
    );
};

export default ModalMal;
