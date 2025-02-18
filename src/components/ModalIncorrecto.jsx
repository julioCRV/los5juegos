import React, { useState, useEffect } from "react";
import './ModalEstilo.css';
import IconIncorrecto from '/assets/iconos/incorrecto.svg';

const ModalMal = ({ text, activarBoton, resetGame, id }) => {

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
            <p className="modal-text">{text}</p>
                <img
                    src={IconIncorrecto}
                    alt="Ícono de Mal"
                    className="modal-icon"
                />
     
                {isActivate && (
                    <>
                        <p>Secuencia correcta de imagenes: </p>
                        <img src={`/assets/Juego2/e${id}.svg`} alt="Timer" className="juego2-icon" />
                    </>
                )}
            </div>
        </div>
    );
};

export default ModalMal;
