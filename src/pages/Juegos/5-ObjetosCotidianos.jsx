import React, { useEffect, useState, useRef } from "react";
import './5-ObjetosCotidianos.css';
import { useNavigate } from "react-router-dom";
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

const Game = () => {
    const idusuario = localStorage.getItem('idusuario');
    const [feedback, setFeedback] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const itemRef = useRef(null);
    const [dropped, setDropped] = useState(false);
    const [draggedItem, setDraggedItem] = useState(null);
    const [idItem, setIdItem] = useState(Math.floor(Math.random() * 6) + 1);
    const [options, setOptions] = useState([])
    const navigate = useNavigate();

    const optionsAll = [
        { id: 1, src: "/assets/Juego5/g51.svg", titulo: "taza cafe", text: "Prepararme un café" },
        { id: 2, src: "/assets/Juego5/g52.svg", titulo: "papel roto", text: "Cortar papeles" },
        { id: 3, src: "/assets/Juego5/g53.svg", titulo: "sonrisa", text: "Cepillarme los dientes" },
        { id: 4, src: "/assets/Juego5/g54.svg", titulo: "plato de sopa", text: "Comer un plato de sopa" },
        { id: 5, src: "/assets/Juego5/g55.svg", titulo: "cama", text: "Dormir en una cama" },
        { id: 6, src: "/assets/Juego5/g56.svg", titulo: "lavar platos", text: "Lavar platos sucios" },
        { id: 7, src: "/assets/Juego5/g57.svg", titulo: "almohadas", text: "Dormir con una almohada" },
        { id: 8, src: "/assets/Juego5/g58.svg", titulo: "plato de ensalada", text: "Comer una ensalada" },
        { id: 9, src: "/assets/Juego5/g59.svg", titulo: "olla", text: "Cocinar comida" },
        { id: 10, src: "/assets/Juego5/g510.svg", titulo: "piso", text: "Barrer el piso" },
        { id: 11, src: "/assets/Juego5/g511.svg", titulo: "escribir", text: "Escribir un mensaje" },
        { id: 12, src: "/assets/Juego5/g512.svg", titulo: "pelicula", text: "Ver una pelicula" },
        { id: 13, src: "/assets/Juego5/g513.svg", titulo: "refresco", text: "Tomar refresco" },
        { id: 14, src: "/assets/Juego5/g514.svg", titulo: "hamburguesa", text: "Comer una hamburguesa" },
        { id: 15, src: "/assets/Juego5/g515.svg", titulo: "auto", text: "Conducir un auto" },
        { id: 16, src: "/assets/Juego5/g516.svg", titulo: "llamar", text: "Hacer llamadas" },
        { id: 17, src: "/assets/Juego5/g517.svg", titulo: "leer", text: "Leer un libro" },
        { id: 18, src: "/assets/Juego5/g518.svg", titulo: "secarse", text: "Secarme después de bañarme" },
        { id: 19, src: "/assets/Juego5/g519.svg", titulo: "jugar", text: "Jugar fútbol" },
        { id: 20, src: "/assets/Juego5/g520.svg", titulo: "revista", text: "Leer una revista" },
    ];

    const items = [
        { id: 1, src: "/assets/Juego5/gp51.svg", opcion: "¿Uso la cucharrilla para?", titulo: "taza cafe" },
        { id: 2, src: "/assets/Juego5/gp52.svg", opcion: "¿Utilizo una tijera para?", titulo: "papel roto" },
        { id: 3, src: "/assets/Juego5/gp53.svg", opcion: "¿Utilizo un cepillo de dientes para?", titulo: "sonrisa" },
        { id: 4, src: "/assets/Juego5/gp54.svg", opcion: "¿Uso la escoba para?", titulo: "piso" },
        { id: 5, src: "/assets/Juego5/gp55.svg", opcion: "¿Uso el celular para?", titulo: "llamar" },
        { id: 6, src: "/assets/Juego5/gp56.svg", opcion: "¿Uso la toalla para?", titulo: "secarse" },
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
        setDraggedItem(item);
        e.dataTransfer.setData("text/plain", JSON.stringify(item));
        setPosition({
            x: e.clientX - itemRef.current.getBoundingClientRect().left,
            y: e.clientY - itemRef.current.getBoundingClientRect().top,
        });
    };

    const handleTouchStart = (e, item) => {
        setDraggedItem(item);
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - itemRef.current.getBoundingClientRect().left,
            y: touch.clientY - itemRef.current.getBoundingClientRect().top,
        });
    };

    const handleTouchMove = (e) => {
        if (!draggedItem) return;

        const touch = e.touches[0];
        itemRef.current.style.position = "absolute";
        itemRef.current.style.left = `${touch.clientX - position.x}px`;
        itemRef.current.style.top = `${touch.clientY - position.y}px`;
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();

        // Obtener la posición del toque final
        const touch = e.changedTouches[0]; // Última posición del toque
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        // Verificar con qué opción se superpone el toque
        const selectedOption = options.find((option) => {
            const optionElement = document.querySelector(`[data-id='${option.id}']`);
            if (optionElement) {
                const rect = optionElement.getBoundingClientRect();
                return (
                    touchX >= rect.left &&
                    touchX <= rect.right &&
                    touchY >= rect.top &&
                    touchY <= rect.bottom
                );
            }
            return false;
        });

        if (selectedOption) {
            if (draggedItem.titulo === selectedOption.titulo) {
                setFeedback("Bien");
                setDropped(true);
                setTimeout(() => {
                    (async () => {
                        await guardarPuntaje('https://afhasiajuegos.tech/juegos/winner_5.php');
                        navigate('/Inicio');
                    })();
                }, 1400);
            } else {
                setFeedback("Mal");
                setDropped(true);
                setTimeout(() => {
                    (async () => {
                        await guardarPuntaje('https://afhasiajuegos.tech/juegos/over_5.php');
                        navigate('/Inicio');
                    })();
                }, 1400);
            }
        }
    };


    const handleDrop = (e, option) => {
        e.preventDefault();

        if (draggedItem.titulo === option.titulo) {
            setFeedback("Bien");
            setDropped(true);
            setTimeout(() => {
                (async () => {
                    await guardarPuntaje('https://afhasiajuegos.tech/juegos/winner_5.php');
                    navigate('/Inicio');
                })();
            }, 1400);
        } else {
            setFeedback("Mal");
            setDropped(true);
            setTimeout(() => {
                (async () => {
                    await guardarPuntaje('https://afhasiajuegos.tech/juegos/over_5.php');
                    navigate('/Inicio');
                })();
            }, 1400);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    //Metodo para guarda el resultado del juego
    const guardarPuntaje = async (url) => {
        const body = {
            cod_user: idusuario,
        };

        try {
            // Realizando la solicitud POST
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            // Verificando si la respuesta es exitosa
            if (response.ok) {
                const result = await response.json();
                console.log('Guardado correctamente');
                return result;
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un error en la solicitud:', error);
        }
    };

    return (
        <>
            <h2 className="observa-title">Objetos cotidianos</h2>
            <div className="game-container">
                <div className="question-container">
                    <p>{questionItem.opcion} </p>
                    <img
                        ref={itemRef}
                        src={questionItem.src}
                        alt={questionItem.titulo}
                        draggable={!dropped}
                        onDragStart={(e) => handleDragStart(e, questionItem)}
                        onTouchStart={(e) => handleTouchStart(e, questionItem)}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={(e) => handleTouchEnd(e, questionItem)}
                        style={{
                            width: "80px",
                            height: "80px",
                            padding: "5px",
                            backgroundColor: "white",
                            border: "2px solid black",
                            borderRadius: "50%",
                            cursor: "grab",
                            opacity: dropped ? 0.5 : 1,
                            transition: "all 0.3s ease",
                            // position: draggedItem ? "absolute" : "static",
                        }}
                    />
                </div>

                <div className="options-container">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className="option"
                            data-id={option.id}
                            onDrop={(e) => handleDrop(e, option)}
                            onDragOver={handleDragOver}
                            onTouchEnd={(e) => handleTouchEnd(e, option)}
                        >
                            <img
                                src={option.src}
                                alt={option.titulo}
                                style={{
                                    padding: "5px",
                                    width: "80px", height: "80px",
                                    backgroundColor: "white",
                                    border: "2px solid black",
                                    borderRadius: "50%",
                                }}
                            />
                            <p>{option.text}</p>
                        </div>
                    ))}
                </div>

                {feedback && (
                    <>
                        {feedback === 'Bien' ? (
                            <ModalGanar text={"¡CORRECTO!"} />) :
                            (<ModalPerder text={"¡INCORRECTO!"} />)}
                    </>
                )}
            </div>
        </>
    );
};

export default Game;
