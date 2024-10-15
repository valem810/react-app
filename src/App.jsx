import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const images = [
    {
        src: '/images/hourglass.jpg',
        info: 'En 1996, el telescopio Hubble de la NASA reveló la forma de reloj de arena de esta joven nebulosa planetaria ubicada a unos 8,000 años luz de distancia. En imágenes previas tomadas desde la Tierra, la nebulosa parecía un par de grandes anillos externos con un anillo central más pequeño, pero no se podían ver los detalles más finos.Las nebulosas planetarias son creadas por la muerte de estrellas similares al Sol: la estrella colapsa para formar una densa y caliente enana blanca.Al mismo tiempo, la estrella moribunda expulsa sus capas externas de material, formando una elaborada nube de gas y polvo conocida como nebulosa planetaria.Este no es un fenómeno raro, pero esta estrella en forma de "ojo" es un poco única: debería estar en el centro de la nebulosa, pero está desplazada.' },
    {
            src: '/images/as.png',
            info: 'Estas fotos fueron tomadas por astronautas de la NASA mientras salían de la Estación Espacial Internacional para hacer mejoras y actualizaciones.Descripción de las imágenes: El astronauta Andrew Morgan, en un traje espacial blanco con un visor reflectante, listo para tomar una foto. La astronauta Christina Koch toma una selfie con la Tierra detrás. El astronauta Ricky Arnold, su rostro cubierto por el visor metálico, toma una selfie durante una caminata espacial crédito: NASA'
        },
    { src: '/images/galaxy.png', 
        info: 'En 2009, los telescopios Hubble, Chandra y Spitzer unieron fuerzas para capturar esta vista deslumbrante del corazón de la Vía Láctea.Descripción de la imagen: Colores arremolinados de rojo, naranja, amarillo, oro, rosa y azul dominan la imagen, con el núcleo galáctico brillando intensamente en la parte inferior derecha.Crédito: NASA/JPL-Caltech/ESA' },
    {
        src: '/images/hurricane.mp4',
        info: 'El astronauta de la NASA, Matthew Dominick, capturó esta vista del huracán desde el espacio en la mañana del miércoles 9 de octubre, cuando la @ISS pasó sobre el Golfo de México. Dominick filmó este video en lapso de tiempo desde la nave espacial Dragon Endeavour de SpaceX, que se acopló a la estación después de llevar a Dominick y sus compañeros de tripulación a órbita en marzo',
        video: '/images/hurricane.mp4'
    },
    {
        src: '/images/WR31.png',
        info: 'Esta brillante estrella en el centro es una estrella Wolf-Rayet conocida como WR 31a, a unos 30,000 años luz de distancia en la constelación Carina. Las estrellas Wolf-Rayet son extremadamente calientes y masivas, con vidas relativamente cortas que terminan en explosivas supernovas. Descripción de la imagen: Un anillo azul de polvo rodea dos estrellas brillantes, con otras estrellas dispersas en el fondo oscuro. Crédito: ESA/Hubble & NASA'
    },
    { src: '/images/sparkle.png', 
        info: ' Hubble capturó esta imagen de Caldwell 104 en 2017.Descripción de la imagen: Un cúmulo de estrellas con un centro brillante que se vuelve más difuso hacia el exterior.Crédito: ESA/Hubble y NASA' },
    {
        src: '/images/ribbon.png',
        info: 'Visto por Hubble, este delicado filamento rojo es un remanente de la supernova SN 1006, que fue vista hace 1,000 años desde 7,000 años luz de distancia. Esta explosión estelar habría sido el objeto más brillante jamás observado por humanos.Descripción de la imagen: Un fino filamento de gas rojo cruza diagonalmente la escena, con detalles en su estructura. Crédito: NASA, ESA, Hubble Heritage Team'
    },
    {
        src: '/images/westerlund.png',
        info: 'Si vivieras en este cúmulo de super estrellas, podrías ver un cielo lleno de cientos de estrellas, cada una tan brillante como la luna llena.'
    },
];

function App() {
    const palabra = "NASA";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [opacity, setOpacity] = useState(0);
    const [isTypingFinished, setIsTypingFinished] = useState(false);

    useEffect(() => {
        const fadeIn = setTimeout(() => {
            setOpacity(1);
        }, 500);

        return () => clearTimeout(fadeIn);
    }, []);

    useEffect(() => {
        const typingSpeed = Math.random() * 800 + 100;

        const timer = setTimeout(() => {
            if (index < palabra.length) {
                setDisplayText(prev => prev + palabra[index]);
                setIndex(prev => prev + 1);
            } else if (!isTypingFinished) {
                setIsTypingFinished(true);
                setShowCursor(false);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [index, isTypingFinished]);

    useEffect(() => {
        if (!isTypingFinished) {
            const cursorTimer = setInterval(() => {
                setShowCursor(prev => !prev);
            }, 500);

            return () => clearInterval(cursorTimer);
        }
    }, [isTypingFinished]);

    return (
        <div className="container" style={{ opacity: opacity }}>
            <h1 className="fixed-title">
                {displayText}
                {!isTypingFinished && (showCursor ? '|' : ' ')}
            </h1>

            <div className="image-container d-flex flex-wrap justify-content-center">
                {images.map((image, index) => (
                    <div key={index} className="flip-card m-2" style={{ width: '374px', height: '321px', position: 'relative' }}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                {image.video ? (
                                    <div className="video-container">
                                        <video
                                            width="374"
                                            height="321"
                                            controls={false} // No mostrar controles
                                            muted
                                            loop
                                            autoPlay
                                            preload="auto"
                                            src={image.video}
                                            alt={`Video ${index + 1}`}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={image.src}
                                        alt={`Image ${index + 1}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} // Estilo opcional
                                    />
                                )}
                            </div>
                            <div className="flip-card-back">
                                <h2>{image.info}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
