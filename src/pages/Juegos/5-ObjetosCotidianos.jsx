import React, { useEffect, useState } from "react";
import './5-ObjetosCotidianos.css';
import { useNavigate } from "react-router-dom";
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

const Game = () => {
    const [feedback, setFeedback] = useState("");
    const [dropped, setDropped] = useState(false);
    const [idItem, setIdItem] = useState(Math.floor(Math.random() * 3) + 1);
    const [options, setOptions] = useState([])
    const navigate = useNavigate();

    const optionsAll = [
        { id: 1, src: "/assets/Juego5/g51.svg", titulo: "taza cafe", text: "Tomar una taza de café" },
        { id: 2, src: "/assets/Juego5/g52.svg", titulo: "papel roto", text: "Cortar papeles" },
        { id: 3, src: "/assets/Juego5/g53.svg", titulo: "sonrisa", text: "Cepillarme los dientes" },
        { id: 4, src: "/assets/Juego5/g54.svg", titulo: "plato de sopa", text: "Comer un plato de sopa" },
        { id: 5, src: "/assets/Juego5/g55.svg", titulo: "cama", text: "Dormir en una cama" },
        { id: 6, src: "/assets/Juego5/g56.svg", titulo: "lavar platos", text: "Lavar platos sucios" },
        { id: 7, src: "/assets/Juego5/g57.svg", titulo: "almohadas", text: "Dormir con una almohada" },
    ];

    const items = [
        { id: 1, src: "/assets/Juego5/gp51.svg", opcion: "¿Uso la cucharrilla para?", titulo: "taza cafe" },
        { id: 2, src: "/assets/Juego5/gp52.svg", opcion: "¿Utilizo una tijera para?", titulo: "papel roto" },
        { id: 3, src: "/assets/Juego5/gp53.svg", opcion: "¿Utilizo un cepillo de dientes para?", titulo: "sonrisa" },
    ];

    useEffect(() => {
        const itemSeleccionado = items.find((item) => item.id === idItem);
        const tituloSeleccionado = itemSeleccionado.titulo;

        const opcionesFiltradas = optionsAll.filter(
            (option) => option.titulo !== tituloSeleccionado
        );

        const opcionesAdicionales = [];
        while (opcionesAdicionales.length < 3) {
            const indexAleatorio = Math.floor(Math.random() * opcionesFiltradas.length);
            const opcionSeleccionada = opcionesFiltradas[indexAleatorio];

            // Evitar duplicados
            if (!opcionesAdicionales.includes(opcionSeleccionada)) {
                opcionesAdicionales.push(opcionSeleccionada);
            }
        }

        const nuevoOptions = [
            ...opcionesAdicionales,
            optionsAll.find((option) => option.titulo === tituloSeleccionado),
        ];

        const opcionesFinales = nuevoOptions.sort(() => Math.random() - 0.5);

        setOptions(opcionesFinales);

    }, [idItem]);

    const questionItem = items.find((item) => item.id === idItem);

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData("text/plain", item.titulo);
    };

    const handleDrop = (e, option) => {
        e.preventDefault();
        const draggedPair = e.dataTransfer.getData("text/plain");
        if (draggedPair === option.titulo) {
            setFeedback("Bien");
            setDropped(true);
            setTimeout(() => {
                navigate('/Inicio');
              }, 1400);
        } else {
            setFeedback("Mal");
            setDropped(true);
            setTimeout(() => {
                navigate('/Inicio');
              }, 1400);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="game-container">
            <div className="options-container">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className="option"
                        onDrop={(e) => handleDrop(e, option)}
                        onDragOver={handleDragOver}

                    >
                        <img
                            src={option.src}
                            alt={option.titulo}
                            style={{ width: "100px", height: "100px" }}
                        />
                        <p>{option.text}</p>
                    </div>
                ))}
            </div>

            <div className="question-container">
                <p>{questionItem.opcion} </p>
                <img
                    src={questionItem.src}
                    alt={questionItem.titulo}
                    draggable={!dropped}
                    onDragStart={(e) => handleDragStart(e, questionItem)}
                    style={{
                        width: "140px",
                        cursor: "grab",
                        opacity: dropped ? 0.5 : 1,
                    }}
                />
            </div>

            {feedback && (
                <>
                    {feedback === 'Bien' ? (
                        <ModalGanar text={"¡CORECCTO!"} />) :
                        (<ModalPerder text={"¡INCORRECTO!"} />)}
                </>
            )}
        </div>
    );
};

export default Game;
