import React from "react";
import { Link } from "react-router-dom";
import "./Inicio.css";

import ojoIcon from '/assets/iconos/ojo.svg';
import armadoresIcon from '/assets/iconos/armadores.svg';
import cartasIcon from '/assets/iconos/cartas.svg';
import imagenIcon from '/assets/iconos/imagenes.svg';
import objetosIcon from '/assets/iconos/objetos.svg';

const Home = () => {
  const cards = [
    { id: 1, title: "Observa y realiza una oración", img: ojoIcon, link: "/realizar-oración" },
    { id: 2, title: "Armadores con acciones", img: armadoresIcon, link: "/armar-rompecabeza" },
    { id: 3, title: "Encuentra parejas", img: cartasIcon, link: "/encontrar-pares" },
    { id: 4, title: "Asociación con imágenes", img: imagenIcon, link: "/asociar-imagenes" },
    { id: 5, title: "Objetos cotidianos", img: objetosIcon, link: "/buscar-objetos" },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Juegos de Fonoaudiología</h1>
      <div className="card-grid">
        {cards.slice(0, 3).map((card) => (
          <Link to={card.link} key={card.id}>
            <div className="home-card">
              <img src={card.img} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="card-grid2">
        {cards.slice(3, 5).map((card) => (
          <Link to={card.link} key={card.id}>
            <div className="home-card2">
              <img src={card.img} alt={card.title} className="card-image" />
              <h3 className="card-title">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
