import React, { useState, useEffect } from 'react'; 
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    const palabra = "NASA";
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [opacity, setOpacity] = useState(0); 

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
            } else {
                setTimeout(() => {
                    setShowCursor(false);
                }, 3000); 
            }
        }, typingSpeed); 
  
        return () => clearTimeout(timer); 
    }, [index]);

    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev); 
        }, 500); 

        return () => clearInterval(cursorTimer); 
    }, []);

    return (
        <div className="container" style={{ opacity: opacity }}> 
            <h1>
                {displayText}
                {showCursor ? '|' : ' '} 
            </h1>
            
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="images/ribbon.png" className="d-block w-100" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/as.png" className="d-block w-100" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/WR31.png" className="d-block w-100" alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/galaxy.png" className="d-block w-100" alt="Fourth slide" />
                    </div>
                    <div className="carousel-item">
                        <img src="images/as2.png" className="d-block w-100" alt="Fifth slide" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default App;
