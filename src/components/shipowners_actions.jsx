// Importando hooks y CSS necesarios para el componente
import React, { useState, useEffect } from 'react';
import './shipowners_actions.css';

// Componente principal del juego
const GameComponent = () => {
    // Matriz correcta que contiene la secuencia de imágenes (filas y columnas)
    const correct = [
        [1, 2, 3], // Primera fila
        [4, 5, 6], // Segunda fila
    ];

    // Definición de los estados usando useState
    const [failedAttempts, setFailedAttempts] = useState(0); // Intentos fallidos del jugador
    const [timeElapsed, setTimeElapsed] = useState(0); // Tiempo transcurrido desde que comenzó el juego
    const [availableImages, setAvailableImages] = useState([
        { id: 1, src: 'image1.jpg' },
        { id: 2, src: 'image2.jpg' },
        { id: 3, src: 'image3.jpg' },
        { id: 4, src: 'image4.jpg' },
        { id: 5, src: 'image5.jpg' },
        { id: 6, src: 'image6.jpg' },
    ]);
    const [sequence, setSequence] = useState(Array(6).fill(null)); // Secuencia actual de imágenes colocadas en el tablero
    const [gameMatrix, setGameMatrix] = useState([
        [0, 0, 0], // Primera fila
        [0, 0, 0], // Segunda fila
    ]);
    const maxAvailableSlots = 6; // Número máximo de espacios disponibles para las imágenes

    // useEffect para crear un temporizador que aumenta cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1); // Aumenta el contador de tiempo
        }, 1000);
        return () => clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte
    }, []);

    // Maneja el inicio del arrastre (drag) de una imagen
    const handleDragStart = (event, image, sourceType) => {
        if (failedAttempts === 3) {
            alert('¡Perdiste!');
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
                alert('¡Ganaste!');
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

    return (
        <div className="game-container">
            <div className="header">
                <div>Intentos fallidos: {failedAttempts}/3</div>
                <div>Armadores con acciones</div>
            </div>
            <div className="game-board">
                <div className="available-images">
                    <div className="title-row">
                        <h3>Imágenes disponibles:</h3>
                        <img src="../src/assets/timer.svg" alt="Timer" className="timer-icon" />
                        <div>{timeElapsed}s</div>
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
    );
};

export default GameComponent;
