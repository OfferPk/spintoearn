/* Screen rotation styles for Flappy Bird */
.orientation-toggle {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    display: none; /* Hidden by default, shown on mobile */
}

.orientation-toggle:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateX(-50%) scale(1.1);
}

.orientation-toggle i {
    font-size: 20px;
}

/* Portrait mode styles */
#game-container.portrait-mode {
    transform: rotate(90deg);
    transform-origin: center center;
    height: 100vw;
    width: 100vh;
    max-width: none;
    max-height: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    margin: 0;
}

/* Adjust UI elements in portrait mode */
#game-container.portrait-mode #score-display {
    transform: rotate(-90deg);
    right: 10px;
    top: 50px;
}

#game-container.portrait-mode #health-bar-container,
#game-container.portrait-mode #power-bar-container {
    transform: rotate(-90deg);
    left: auto;
    right: 20px;
    top: auto;
    bottom: 100px;
}

#game-container.portrait-mode #power-bar-container {
    bottom: 150px;
}

#game-container.portrait-mode #mobile-controls {
    transform: rotate(-90deg);
    bottom: auto;
    top: 80%;
    left: 20px;
}

#game-container.portrait-mode #combat-controls {
    transform: rotate(-90deg);
    right: auto;
    left: 20px;
    bottom: 20%;
}

/* Responsive adjustments for portrait mode */
@media (max-width: 768px) {
    #game-container.portrait-mode {
        border-width: 4px;
    }
    
    #game-container.portrait-mode #score-display {
        font-size: 28px;
        padding: 8px 20px;
    }
    
    #game-container.portrait-mode .mobile-button,
    #game-container.portrait-mode .combat-button {
        width: 50px;
        height: 50px;
    }
}

/* Adjust game overlays in portrait mode */
#game-container.portrait-mode .game-overlay {
    transform: rotate(-90deg);
}

/* Adjust spin wheel in portrait mode */
#game-container.portrait-mode .spin-wheel-container {
    transform: rotate(-90deg);
    margin: 30px auto;
}

#game-container.portrait-mode .currency-options,
#game-container.portrait-mode .spin-button,
#game-container.portrait-mode .result-display,
#game-container.portrait-mode .overlay-button {
    transform: rotate(-90deg);
}
