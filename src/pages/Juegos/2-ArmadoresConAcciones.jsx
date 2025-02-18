// Importando hooks y CSS necesarios para el componente
import React, { useState, useEffect } from 'react';
import './2-ArmadoresConAcciones.css';
import { useNavigate } from 'react-router-dom';
import ModalGanar from "../../components/ModalCorrecto";
import ModalPerder from "../../components/ModalIncorrecto";

// Componente principal del juego
const GameComponent = () => {
    const idusuario = localStorage.getItem('idusuario');
    // Matriz correcta que contiene la secuencia de imágenes (filas y columnas)
    const correct = [
        [1, 2, 3], // Primera fila
        [4, 5, 6], // Segunda fila
    ];
    const navigate = useNavigate();
    const numeros = [1, 2, 3, 4, 5, 6]; 5
    const [numero, setNumero] = useState(Math.floor(Math.random() * 4) + 1);

    // Definición de los estados usando useState
    const [failedAttempts, setFailedAttempts] = useState(0); // Intentos fallidos del jugador
    const [timeElapsed, setTimeElapsed] = useState(0); // Tiempo transcurrido desde que comenzó el juego
    const [availableImages, setAvailableImages] = useState([]);
    const [sequence, setSequence] = useState(Array(6).fill(null)); // Secuencia actual de imágenes colocadas en el tablero
    const [gameMatrix, setGameMatrix] = useState([
        [0, 0, 0], // Primera fila
        [0, 0, 0], // Segunda fila
    ]);
    const maxAvailableSlots = 6; // Número máximo de espacios disponibles para las imágenes

    // Menu para la navegación entre juegos
    const [ganar, setGanar] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const images = [
            { id: numeros[0], src: `/assets/Juego2/g2${numero}${numeros[0]}.svg` },
            { id: numeros[1], src: `/assets/Juego2/g2${numero}${numeros[1]}.svg` },
            { id: numeros[2], src: `/assets/Juego2/g2${numero}${numeros[2]}.svg` },
            { id: numeros[3], src: `/assets/Juego2/g2${numero}${numeros[3]}.svg` },
            { id: numeros[4], src: `/assets/Juego2/g2${numero}${numeros[4]}.svg` },
            { id: numeros[5], src: `/assets/Juego2/g2${numero}${numeros[5]}.svg` },
        ];

        setAvailableImages(shuffleArray(images)); // Mezcla y establece las imágenes
    }, []); // Se ejecuta solo una vez al cargar el componente

    // useEffect para crear un temporizador que aumenta cada segundo
    useEffect(() => {
        if (!ganar) { // Solo inicia si no se ha ganado aún
            const timer = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);

            return () => clearInterval(timer); // Limpia el temporizador al desmontar
        }
    }, [ganar]); // Se ejecuta cada vez que 'ganar' cambia


    // Maneja el inicio del arrastre (drag) de una imagen
    const handleDragStart = (event, image, sourceType) => {
        if (failedAttempts === 1) {
            setGanar(false);
            setMostrarModal(true);
            // Agregar un delay de 3 segundos antes de redirigir
            setTimeout(() => {
                (async () => {
                    await guardarPuntaje('https://afhasiajuegos.tech/juegos/over_2.php');
                    navigate('/Inicio');
                })();
            }, 4000);
        } else {
            event.dataTransfer.setData('imageId', image.id);
            event.dataTransfer.setData('sourceType', sourceType);
        }
    };

    // Maneja el evento de soltar (drop) una imagen en un lugar específico
    const handleDrop = (event, index, targetType) => {
        const imageId = parseInt(event.dataTransfer.getData('imageId'), 10);
        const sourceType = event.dataTransfer.getData('sourceType');

        const draggedImage =
            sourceType === 'available'
                ? availableImages.find((img) => img.id === imageId)
                : sequence.find((img) => img && img.id === imageId);

        if (draggedImage) {
            const newSequence = [...sequence];
            const newAvailableImages = [...availableImages];
            const newGameMatrix = [...gameMatrix.map(row => [...row])];

            if (sourceType === 'available') {
                newAvailableImages.splice(
                    newAvailableImages.findIndex((img) => img.id === imageId),
                    1
                );
            } else {
                newSequence[newSequence.findIndex((img) => img && img.id === imageId)] = null;
            }

            if (targetType === 'available') {
                if (availableImages.length < maxAvailableSlots) {
                    newAvailableImages.push(draggedImage);
                }
            } else {
                if (newSequence[index]) {
                    newAvailableImages.push(newSequence[index]);
                }
                newSequence[index] = draggedImage;

                // Actualizar la matriz del juego según la posición
                const row = Math.floor(index / 3);
                const col = index % 3;
                newGameMatrix[row][col] = draggedImage.id;
            }

            // Validar si el tablero coincide con la matriz correcta
            const isWin = newGameMatrix.every((row, rowIndex) =>
                row.every((cell, colIndex) => cell === correct[rowIndex][colIndex])
            );

            if (isWin) {
                setGanar(true);
                setMostrarModal(true);
                setTimeout(() => {
                    (async () => {
                        await guardarPuntaje('https://afhasiajuegos.tech/juegos/winner_2.php');
                        navigate('/Inicio');
                    })();
                }, 1400);
            }

            // Actualizar estados
            setSequence(newSequence);
            setAvailableImages(newAvailableImages);
            setGameMatrix(newGameMatrix);

            // Incrementar intentos fallidos si la imagen no corresponde a la posición correcta
            const row = Math.floor(index / 3);
            const col = index % 3;
            if (draggedImage.id !== correct[row][col]) {
                setFailedAttempts((prev) => prev + 1);
            }
        }
    };

    // Permite el evento de arrastre en un área específica
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    //Metodo para guarda el resultado del juego
    const guardarPuntaje = async (url) => {
        const body = {
            cod_user: idusuario,
            time: timeElapsed
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
            <div className="game2-container">
                <h2 className="observa-title">Armadores con acciones</h2>
                <p className='again'>Intentos fallidos: {failedAttempts}/1</p>
                <div className="game-board">
                    <div className="available-images">
                        <div className="title-row">
                            <h3>Imágenes disponibles:</h3>
                            <img src="../assets/timer.svg" alt="Timer" className="timer-icon" />
                            <div>{timeElapsed} s</div>
                        </div>
                        <div className="images-row">
                            {Array.from({ length: maxAvailableSlots }).map((_, index) => (
                                <div
                                    key={index}
                                    className="available-slot"
                                    onDrop={(event) => handleDrop(event, null, 'available')}
                                    onDragOver={handleDragOver}
                                >
                                    {availableImages[index] ? (
                                        <img
                                            src={availableImages[index].src}
                                            alt={`Imagen ${availableImages[index].id}`}
                                            draggable
                                            onDragStart={(event) =>
                                                handleDragStart(event, availableImages[index], 'available')
                                            }
                                            className="draggable-image"
                                        />
                                    ) : (
                                        <span className="placeholder">Soltar aquí</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sequence-board">
                        <h3>Ordena la secuencia</h3>
                        <div className="sequence-grid">
                            {sequence.map((image, index) => (
                                <div
                                    key={index}
                                    className="sequence-slot"
                                    onDrop={(event) => handleDrop(event, index, 'sequence')}
                                    onDragOver={handleDragOver}
                                >
                                    {image ? (
                                        <img
                                            src={image.src}
                                            alt={`Imagen ${image.id}`}
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, image, 'sequence')}
                                            className="sequence-image"
                                        />
                                    ) : (
                                        <span className="placeholder">Soltar aquí</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {mostrarModal && (
                    <>
                        {ganar === true ? (<ModalGanar text={"¡CORRECTO!"} activarTiempo={"si"} time={timeElapsed} />) : (<ModalPerder text={"¡INCORRECTO!"} activarBoton={"si"} id={numero}/>)}
                    </>
                )}
            </div>
        </>

    );
};

export default GameComponent;