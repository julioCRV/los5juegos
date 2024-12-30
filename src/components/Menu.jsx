import React from "react";
import "./Menu.css";
import juego1 from "../assets/juego1.svg";
import juego2 from "../assets/juego2.svg";
import juego3 from "../assets/juego3.svg";
import juego4 from "../assets/juego4.svg";
import juego5 from "../assets/juego5.svg";

const Menu = () => {
  const buttons = [
    { id: 1, text: "Observa Y realiza una oracion", imgSrc: juego1 },
    { id: 2, text: "Armadores con acciones", imgSrc: juego2 },
    { id: 3, text: "Encuentra parejas", imgSrc: juego3 },
    { id: 4, text: "Asociacion con Imagenes", imgSrc: juego4 },
    { id: 5, text: "Objetos cotidiantes", imgSrc: juego5 },
  ];

  return (
    <div className="menu-container">
      <h1 className="menu-title">Juegos de Fonoaudiología</h1>
      <div className="menu-buttons">
        {buttons.map((button) => (
          <div key={button.id} className="menu-button">
            <img src={button.imgSrc} alt={button.text} className="menu-image" />
            <p className="menu-text">{button.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
