// Spin Battle Royale Multiplayer Mode for Flappy Bird Game
// This system allows 10 players to compete in real-time spin battles

// Battle Royale configuration
const battleRoyaleConfig = {
    // Number of players required for a battle
    playersRequired: 10,
    
    // Match duration in seconds
    matchDuration: 120,
    
    // Entry fee in tokens
    entryFee: 5,
    
    // Minimum prize pool
    minimumPrizePool: 50,
    
    // Prize distribution (percentage of pool)
    prizeDistribution: {
        first: 50,    // 50% to first place
        second: 30,   // 30% to second place
        third: 15,    // 15% to third place
        others: 5     // 5% distributed among other participants
    },
    
    // Matchmaking timeout in seconds
    matchmakingTimeout: 60,
    
    // Firebase configuration (would be replaced with actual config)
    firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    }
};

// Battle Royale system state
let battleRoyaleSystem = {
    isInitialized: false,
    isConnected: false,
    currentMatch: null,
    playerData: {
        id: null,
        name: null,
        avatar: null,
        score: 0,
        rank: 0,
        isReady: false
    },
    matchHistory: [],
    totalWinnings: 0,
    isInMatchmaking: false,
    matchmakingTimer: 0
};

// Initialize Battle Royale system
function initBattleRoyaleSystem() {
    console.log("Initializing Battle Royale system...");
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
        console.warn("Firebase not available, loading from CDN...");
        loadFirebaseSDK();
        return; // Will continue initialization after SDK loads
    }
    
    // Continue initialization
    continueBattleRoyaleInit();
}

// Load Firebase SDK from CDN
function loadFirebaseSDK() {
    const firebaseScript = document.createElement('script');
    firebaseScript.src = 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
    firebaseScript.onload = () => {
        const firebaseAuthScript = document.createElement('script');
        firebaseAuthScript.src = 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
        
        const firebaseDatabaseScript = document.createElement('script');
        firebaseDatabaseScript.src = 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
        
        // After all scripts are loaded, continue initialization
        firebaseDatabaseScript.onload = continueBattleRoyaleInit;
        
        document.head.appendChild(firebaseAuthScript);
        document.head.appendChild(firebaseDatabaseScript);
    };
    
    document.head.appendChild(firebaseScript);
}

// Continue Battle Royale initialization after Firebase is loaded
function continueBattleRoyaleInit() {
    // Initialize Firebase (in a real implementation)
    // firebase.initializeApp(battleRoyaleConfig.firebaseConfig);
    
    // Load data from localStorage
    loadBattleRoyaleData();
    
    // Generate player ID if not exists
    if (!battleRoyaleSystem.playerData.id) {
        battleRoyaleSystem.playerData.id = generatePlayerId();
    }
    
    // Set default player name if not exists
    if (!battleRoyaleSystem.playerData.name) {
        battleRoyaleSystem.playerData.name = "Player" + Math.floor(Math.random() * 10000);
    }
    
    // Add Battle Royale button to game menu
    addBattleRoyaleButton();
    
    // Mark as initialized
    battleRoyaleSystem.isInitialized = true;
    
    // Simulate connection to Firebase
    simulateFirebaseConnection();
    
    console.log("Battle Royale system initialized");
}

// Load Battle Royale data from localStorage
function loadBattleRoyaleData() {
    const savedData = localStorage.getItem('flappyBirdBattleRoyaleData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            battleRoyaleSystem = { ...battleRoyaleSystem, ...parsedData };
            console.log("Loaded Battle Royale data:", battleRoyaleSystem);
        } catch (e) {
            console.error("Error loading Battle Royale data:", e);
        }
    }
}

// Save Battle Royale data to localStorage
function saveBattleRoyaleData() {
    try {
        localStorage.setItem('flappyBirdBattleRoyaleData', JSON.stringify(battleRoyaleSystem));
    } catch (e) {
        console.error("Error saving Battle Royale data:", e);
    }
}

// Generate a unique player ID
function generatePlayerId() {
    return 'player_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Add Battle Royale button to game menu
function addBattleRoyaleButton() {
    // Check if start screen exists
    const startScreen = document.getElementById('start-screen');
    if (!startScreen) return;
    
    // Check if button already exists
    if (document.getElementById('battle-royale-button')) return;
    
    // Create Battle Royale button
    const battleRoyaleButton = document.createElement('button');
    battleRoyaleButton.id = 'battle-royale-button';
    battleRoyaleButton.className = 'overlay-button';
    battleRoyaleButton.style.marginTop = '10px';
    battleRoyaleButton.innerHTML = '<i class="fas fa-trophy"></i> Spin Battle Royale';
    
    // Add event listener
    battleRoyaleButton.addEventListener('click', showBattleRoyaleModal);
    
    // Add to start screen
    startScreen.appendChild(battleRoyaleButton);
}

// Simulate connection to Firebase
function simulateFirebaseConnection() {
    // In a real implementation, this would connect to Firebase
    setTimeout(() => {
        battleRoyaleSystem.isConnected = true;
        console.log("Connected to Battle Royale servers");
    }, 1000);
}

// Show Battle Royale modal
function showBattleRoyaleModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'battle-royale-modal';
    modal.innerHTML = `
        <div class="battle-royale-modal-content">
            <span class="battle-royale-close">&times;</span>
            <h2>Spin Battle Royale</h2>
            
            <div class="battle-royale-info">
                <p>Compete against 9 other players in real-time spin battles!</p>
                <p>Entry Fee: ${battleRoyaleConfig.entryFee} Tokens</p>
                <p>Prize Pool: Minimum ${battleRoyaleConfig.minimumPrizePool} Tokens</p>
                <p>Match Duration: ${battleRoyaleConfig.matchDuration} seconds</p>
            </div>
            
            <div class="player-profile">
                <h3>Your Profile</h3>
                <div class="profile-content">
                    <div class="profile-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="profile-details">
                        <div class="profile-name">
                            <input type="text" id="player-name-input" value="${battleRoyaleSystem.playerData.name}" placeholder="Your Name">
                            <button id="save-name-button"><i class="fas fa-save"></i></button>
                        </div>
                        <div class="profile-stats">
                            <div class="profile-stat">
                                <span class="stat-value">${battleRoyaleSystem.matchHistory.length}</span>
                                <span class="stat-label">Matches</span>
                            </div>
                            <div class="profile-stat">
                                <span class="stat-value">${battleRoyaleSystem.totalWinnings}</span>
                                <span class="stat-label">Winnings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="battle-royale-actions">
                ${battleRoyaleSystem.isInMatchmaking ? 
                    `<div class="matchmaking-status">
                        <p>Finding opponents... <span id="matchmaking-timer">${battleRoyaleSystem.matchmakingTimer}</span>s</p>
                        <div class="matchmaking-progress">
                            <div class="matchmaking-progress-bar"></div>
                        </div>
                        <button id="cancel-matchmaking-button" class="cancel-button">Cancel</button>
                    </div>` 
                    : 
                    `<button id="start-matchmaking-button" class="start-button">Find Match</button>`
                }
            </div>
            
            <div class="match-history">
                <h3>Match History</h3>
                ${battleRoyaleSystem.matchHistory.length > 0 ? 
                    `<div class="history-list">
                        ${battleRoyaleSystem.matchHistory.map((match, index) => `
                            <div class="history-item">
                                <div class="history-rank ${match.rank <= 3 ? 'top-rank' : ''}">
                                    #${match.rank}
                                </div>
                                <div class="history-details">
                                    <div class="history-date">${new Date(match.timestamp).toLocaleDateString()}</div>
                                    <div class="history-prize">${match.prize > 0 ? '+' + match.prize + ' Tokens' : 'No prize'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>` 
                    : 
                    `<div class="empty-history">
                        <p>No matches played yet</p>
                    </div>`
                }
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.querySelector('.battle-royale-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Save name button
    const saveNameButton = document.getElementById('save-name-button');
    if (saveNameButton) {
        saveNameButton.addEventListener('click', () => {
            const nameInput = document.getElementById('player-name-input');
            if (nameInput && nameInput.value.trim()) {
                battleRoyaleSystem.playerData.name = nameInput.value.trim();
                saveBattleRoyaleData();
                showNotification('Name saved!');
            }
        });
    }
    
    // Start matchmaking button
    const startMatchmakingButton = document.getElementById('start-matchmaking-button');
    if (startMatchmakingButton) {
        startMatchmakingButton.addEventListener('click', () => {
            startMatchmaking(modal);
        });
    }
    
    // Cancel matchmaking button
    const cancelMatchmakingButton = document.getElementById('cancel-matchmaking-button');
    if (cancelMatchmakingButton) {
        cancelMatchmakingButton.addEventListener('click', () => {
            cancelMatchmaking(modal);
        });
    }
    
    // Pause game if it's running
    if (typeof pauseGame === 'function' && window.gameState === 'playing') {
        pauseGame();
    }
}

// Start matchmaking
function startMatchmaking(modal) {
    // Check if player has enough tokens
    const playerTokens = getPlayerTokens();
    if (playerTokens < battleRoyaleConfig.entryFee) {
        showNotification(`Not enough tokens! Need ${battleRoyaleConfig.entryFee} tokens to enter.`);
        return;
    }
    
    // Set matchmaking state
    battleRoyaleSystem.isInMatchmaking = true;
    battleRoyaleSystem.matchmakingTimer = battleRoyaleConfig.matchmakingTimeout;
    
    // Update UI
    const actionsContainer = modal.querySelector('.battle-royale-actions');
    actionsContainer.innerHTML = `
        <div class="matchmaking-status">
            <p>Finding opponents... <span id="matchmaking-timer">${battleRoyaleSystem.matchmakingTimer}</span>s</p>
            <div class="matchmaking-progress">
                <div class="matchmaking-progress-bar"></div>
            </div>
            <button id="cancel-matchmaking-button" class="cancel-button">Cancel</button>
        </div>
    `;
    
    // Add event listener to cancel button
    document.getElementById('cancel-matchmaking-button').addEventListener('click', () => {
        cancelMatchmaking(modal);
    });
    
    // Start matchmaking timer
    const matchmakingInterval = setInterval(() => {
        battleRoyaleSystem.matchmakingTimer--;
        
        // Update timer display
        const timerElement = document.getElementById('matchmaking-timer');
        if (timerElement) {
            timerElement.textContent = battleRoyaleSystem.matchmakingTimer;
        }
        
        // Update progress bar
        const progressBar = modal.querySelector('.matchmaking-progress-bar');
        if (progressBar) {
            const progress = 100 - (battleRoyaleSystem.matchmakingTimer / battleRoyaleConfig.matchmakingTimeout * 100);
            progressBar.style.width = `${progress}%`;
        }
        
        // Check if timer expired
        if (battleRoyaleSystem.matchmakingTimer <= 0) {
            clearInterval(matchmakingInterval);
            
            // Simulate finding a match
            const matchFound = Math.random() > 0.2; // 80% chance to find a match
            
            if (matchFound) {
                // Match found, start battle
                startBattleRoyaleMatch(modal);
            } else {
                // Match not found, reset matchmaking
                battleRoyaleSystem.isInMatchmaking = false;
                
                // Update UI
                actionsContainer.innerHTML = `
                    <div class="matchmaking-failed">
                        <p>Couldn't find enough players. Try again!</p>
                        <button id="start-matchmaking-button" class="start-button">Find Match</button>
                    </div>
                `;
                
                // Add event listener to retry button
                document.getElementById('start-matchmaking-button').addEventListener('click', () => {
                    startMatchmaking(modal);
                });
            }
        }
        
        // Simulate players joining (random chance)
        if (Math.random() < 0.1) {
            showNotification('Player joined the lobby!');
        }
        
    }, 1000);
    
    // Store interval ID to clear it if needed
    battleRoyaleSystem.matchmakingInterval = matchmakingInterval;
    
    // Save data
    saveBattleRoyaleData();
}

// Cancel matchmaking
function cancelMatchmaking(modal) {
    // Clear matchmaking interval
    clearInterval(battleRoyaleSystem.matchmakingInterval);
    
    // Reset matchmaking state
    battleRoyaleSystem.isInMatchmaking = false;
    
    // Update UI
    const actionsContainer = modal.querySelector('.battle-royale-actions');
    actionsContainer.innerHTML = `
        <button id="start-matchmaking-button" class="start-button">Find Match</button>
    `;
    
    // Add event listener to start button
    document.getElementById('start-matchmaking-button').addEventListener('click', () => {
        startMatchmaking(modal);
    });
    
    // Save data
    saveBattleRoyaleData();
}

// Start Battle Royale match
function startBattleRoyaleMatch(modal) {
    // Deduct entry fee
    deductEntryFee();
    
    // Create match data
    const matchId = 'match_' + Date.now();
    const players = generateSimulatedPlayers();
    const prizePool = calculatePrizePool(players.length);
    
    battleRoyaleSystem.currentMatch = {
        id: matchId,
        players: players,
        prizePool: prizePool,
        startTime: Date.now(),
        endTime: Date.now() + (battleRoyaleConfig.matchDuration * 1000),
        isActive: true,
        results: []
    };
    
    // Close modal
    modal.remove();
    
    // Show match screen
    showBattleRoyaleMatchScreen();
    
    // Save data
    saveBattleRoyaleData();
}

// Generate simulated players for the match
function generateSimulatedPlayers() {
    const players = [];
    
    // Add current player
    players.push({
        id: battleRoyaleSystem.playerData.id,
        name: battleRoyaleSystem.playerData.name,
        avatar: battleRoyaleSystem.playerData.avatar,
        isHuman: true,
        score: 0,
        spins: 0,
        isReady: true
    });
    
    // Add AI players to reach required count
    const aiCount = battleRoyaleConfig.playersRequired - 1;
    const aiNames = [
        "SpinMaster", "WheelWizard", "LuckySpinner", "FortuneFlyer", 
        "JackpotJumper", "TokenTwister", "PrizePilot", "BonusBird",
        "CoinCollector", "RewardRacer", "SpinDoctor", "WinningWing"
    ];
    
    for (let i = 0; i < aiCount; i++) {
        players.push({
            id: 'ai_' + i,
            name: aiNames[i % aiNames.length] + Math.floor(Math.random() * 100),
            avatar: null,
            isHuman: false,
            score: 0,
            spins: 0,
            isReady: true
        });
    }
    
    return players;
}

// Calculate prize pool based on number of players
function calculatePrizePool(playerCount) {
    const basePool = playerCount * battleRoyaleConfig.entryFee;
    return Math.max(basePool, battleRoyaleConfig.minimumPrizePool);
}

// Deduct entry fee from player
function deductEntryFee() {
    // In a real implementation, this would deduct from player's token balance
    const playerTokens = getPlayerTokens();
    setPlayerTokens(playerTokens - battleRoyaleConfig.entryFee);
}

// Get player tokens
function getPlayerTokens() {
    // In a real implementation, this would get from player's token balance
    // For now, we'll use the tokens from mystery box system if available
    if (typeof mysteryBoxSystem !== 'undefined' && mysteryBoxSystem.inventory && mysteryBoxSystem.inventory.tokens) {
        return mysteryBoxSystem.inventory.tokens;
    }
    
    // Fallback to a default value
    return 100;
}

// Set player tokens
function setPlayerTokens(amount) {
    // In a real implementation, this would set player's token balance
    // For now, we'll use the tokens from mystery box system if available
    if (typeof mysteryBoxSystem !== 'undefined' && mysteryBoxSystem.inventory) {
        mysteryBoxSystem.inventory.tokens = amount;
        
        // Save mystery box data
        if (typeof saveMysteryBoxData === 'function') {
            saveMysteryBoxData();
        }
    }
}

// Show Battle Royale match screen
function showBattleRoyaleMatchScreen() {
    // Create match screen element
    const matchScreen = document.createElement('div');
    matchScreen.id = 'battle-royale-match-screen';
    matchScreen.className = 'game-overlay active';
    
    // Calculate time remaining
    const timeRemaining = Math.max(0, Math.floor((battleRoyaleSystem.currentMatch.endTime - Date.now()) / 1000));
    
    matchScreen.innerHTML = `
        <div class="match-header">
            <h2>Spin Battle Royale</h2>
            <div class="match-timer">
                <i class="fas fa-clock"></i> <span id="match-time-remaining">${timeRemaining}</span>s
            </div>
        </div>
        
        <div class="match-prize-pool">
            <div class="prize-pool-label">Prize Pool</div>
            <div class="prize-pool-amount">${battleRoyaleSystem.currentMatch.prizePool} Tokens</div>
        </div>
        
        <div class="match-players-container">
            <div class="match-players-list" id="match-players-list">
                ${battleRoyaleSystem.currentMatch.players.map((player, index) => `
                    <div class="match-player-item ${player.id === battleRoyaleSystem.playerData.id ? 'current-player' : ''}">
                        <div class="player-rank">#${index + 1}</div>
                        <div class="player-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="player-info">
                            <div class="player-name">${player.name} ${player.isHuman ? '' : '<span class="ai-badge">AI</span>'}</div>
                            <div class="player-score">Score: <span class="score-value">${player.score}</span></div>
                        </div>
                        <div class="player-spins">
                            <i class="fas fa-sync-alt"></i> ${player.spins}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="match-actions">
            <button id="match-spin-button" class="match-spin-button">SPIN</button>
            <button id="match-exit-button" class="match-exit-button">Exit Match</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(matchScreen);
    
    // Add event listeners
    document.getElementById('match-spin-button').addEventListener('click', performBattleRoyaleSpin);
    document.getElementById('match-exit-button').addEventListener('click', exitBattleRoyaleMatch);
    
    // Start match timer
    const matchInterval = setInterval(() => {
        // Update time remaining
        const timeRemainingElement = document.getElementById('match-time-remaining');
        if (timeRemainingElement) {
            const newTimeRemaining = Math.max(0, Math.floor((battleRoyaleSystem.currentMatch.endTime - Date.now()) / 1000));
            timeRemainingElement.textContent = newTimeRemaining;
            
            // Check if match ended
            if (newTimeRemaining <= 0) {
                clearInterval(matchInterval);
                endBattleRoyaleMatch();
            }
        } else {
            // Element not found, clear interval
            clearInterval(matchInterval);
        }
        
        // Simulate AI players spinning (random chance)
        simulateAISpins();
        
        // Update player rankings
        updatePlayerRankings();
        
    }, 1000);
    
    // Store interval ID
    battleRoyaleSystem.matchInterval = matchInterval;
}

// Perform a spin in Battle Royale mode
function performBattleRoyaleSpin() {
    // Find current player in match
    const currentPlayer = battleRoyaleSystem.currentMatch.players.find(
        player => player.id === battleRoyaleSystem.playerData.id
    );
    
    if (!currentPlayer) return;
    
    // Increment spin count
    currentPlayer.spins++;
    
    // Disable spin button temporarily
    const spinButton = document.getElementById('match-spin-button');
    if (spinButton) {
        spinButton.disabled = true;
        spinButton.textContent = 'Spinning...';
    }
    
    // Simulate spin result
    setTimeout(() => {
        // Generate random score increase
        const scoreIncrease = Math.floor(Math.random() * 50) + 10;
        currentPlayer.score += scoreIncrease;
        
        // Show notification
        showNotification(`+${scoreIncrease} points!`);
        
        // Update player display
        updatePlayerDisplay(currentPlayer);
        
        // Re-enable spin button
        if (spinButton) {
            spinButton.disabled = false;
            spinButton.textContent = 'SPIN';
        }
        
        // Update player rankings
        updatePlayerRankings();
        
    }, 2000); // Simulate 2-second spin
}

// Simulate AI players spinning
function simulateAISpins() {
    battleRoyaleSystem.currentMatch.players.forEach(player => {
        if (!player.isHuman && Math.random() < 0.1) { // 10% chance each second
            // Increment spin count
            player.spins++;
            
            // Generate random score increase
            const scoreIncrease = Math.floor(Math.random() * 40) + 5;
            player.score += scoreIncrease;
            
            // Update player display
            updatePlayerDisplay(player);
        }
    });
}

// Update player display in the match screen
function updatePlayerDisplay(player) {
    const playersList = document.getElementById('match-players-list');
    if (!playersList) return;
    
    const playerElements = playersList.querySelectorAll('.match-player-item');
    for (const element of playerElements) {
        const nameElement = element.querySelector('.player-name');
        if (nameElement && nameElement.textContent.includes(player.name)) {
            // Update score
            const scoreElement = element.querySelector('.score-value');
            if (scoreElement) {
                scoreElement.textContent = player.score;
            }
            
            // Update spins
            const spinsElement = element.querySelector('.player-spins');
            if (spinsElement) {
                spinsElement.innerHTML = `<i class="fas fa-sync-alt"></i> ${player.spins}`;
            }
            
            break;
        }
    }
}

// Update player rankings in the match screen
function updatePlayerRankings() {
    // Sort players by score
    const sortedPlayers = [...battleRoyaleSystem.currentMatch.players].sort((a, b) => b.score - a.score);
    
    // Update player ranks
    sortedPlayers.forEach((player, index) => {
        player.rank = index + 1;
    });
    
    // Update UI
    const playersList = document.getElementById('match-players-list');
    if (!playersList) return;
    
    // Clear existing list
    playersList.innerHTML = '';
    
    // Add sorted players
    sortedPlayers.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = `match-player-item ${player.id === battleRoyaleSystem.playerData.id ? 'current-player' : ''}`;
        
        playerElement.innerHTML = `
            <div class="player-rank">#${player.rank}</div>
            <div class="player-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="player-info">
                <div class="player-name">${player.name} ${player.isHuman ? '' : '<span class="ai-badge">AI</span>'}</div>
                <div class="player-score">Score: <span class="score-value">${player.score}</span></div>
            </div>
            <div class="player-spins">
                <i class="fas fa-sync-alt"></i> ${player.spins}
            </div>
        `;
        
        playersList.appendChild(playerElement);
    });
}

// Exit Battle Royale match
function exitBattleRoyaleMatch() {
    // Confirm exit
    if (!confirm('Are you sure you want to exit the match? You will forfeit any potential winnings.')) {
        return;
    }
    
    // Clear match interval
    clearInterval(battleRoyaleSystem.matchInterval);
    
    // Set match as inactive
    battleRoyaleSystem.currentMatch.isActive = false;
    
    // Remove match screen
    const matchScreen = document.getElementById('battle-royale-match-screen');
    if (matchScreen) {
        matchScreen.remove();
    }
    
    // Show start screen
    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.classList.add('active');
    }
    
    // Save data
    saveBattleRoyaleData();
}

// End Battle Royale match
function endBattleRoyaleMatch() {
    // Clear match interval
    clearInterval(battleRoyaleSystem.matchInterval);
    
    // Set match as inactive
    battleRoyaleSystem.currentMatch.isActive = false;
    
    // Calculate final rankings and prizes
    const finalRankings = [...battleRoyaleSystem.currentMatch.players].sort((a, b) => b.score - a.score);
    
    // Assign prizes based on rankings
    const prizePool = battleRoyaleSystem.currentMatch.prizePool;
    const prizeDistribution = battleRoyaleConfig.prizeDistribution;
    
    finalRankings.forEach((player, index) => {
        let prize = 0;
        
        if (index === 0) {
            // First place
            prize = Math.floor(prizePool * (prizeDistribution.first / 100));
        } else if (index === 1) {
            // Second place
            prize = Math.floor(prizePool * (prizeDistribution.second / 100));
        } else if (index === 2) {
            // Third place
            prize = Math.floor(prizePool * (prizeDistribution.third / 100));
        } else {
            // Other places
            const othersShare = prizeDistribution.others / 100;
            const remainingPlayers = finalRankings.length - 3;
            if (remainingPlayers > 0) {
                prize = Math.floor(prizePool * (othersShare / remainingPlayers));
            }
        }
        
        player.prize = prize;
        
        // Add to player's winnings if it's the current player
        if (player.id === battleRoyaleSystem.playerData.id) {
            battleRoyaleSystem.totalWinnings += prize;
            
            // Add tokens to player's balance
            const currentTokens = getPlayerTokens();
            setPlayerTokens(currentTokens + prize);
        }
    });
    
    // Store match results
    const matchResult = {
        id: battleRoyaleSystem.currentMatch.id,
        timestamp: Date.now(),
        rank: finalRankings.find(p => p.id === battleRoyaleSystem.playerData.id)?.rank || 0,
        prize: finalRankings.find(p => p.id === battleRoyaleSystem.playerData.id)?.prize || 0,
        totalPlayers: finalRankings.length
    };
    
    battleRoyaleSystem.matchHistory.unshift(matchResult);
    
    // Limit history to last 10 matches
    if (battleRoyaleSystem.matchHistory.length > 10) {
        battleRoyaleSystem.matchHistory = battleRoyaleSystem.matchHistory.slice(0, 10);
    }
    
    // Show results screen
    showBattleRoyaleResults(finalRankings);
    
    // Save data
    saveBattleRoyaleData();
}

// Show Battle Royale results
function showBattleRoyaleResults(finalRankings) {
    // Create results screen element
    const resultsScreen = document.createElement('div');
    resultsScreen.id = 'battle-royale-results-screen';
    resultsScreen.className = 'game-overlay active';
    
    // Find current player's result
    const playerResult = finalRankings.find(p => p.id === battleRoyaleSystem.playerData.id);
    const playerRank = playerResult?.rank || 0;
    const playerPrize = playerResult?.prize || 0;
    
    resultsScreen.innerHTML = `
        <div class="results-header">
            <h2>Battle Royale Results</h2>
        </div>
        
        <div class="player-result">
            <div class="result-rank ${playerRank <= 3 ? 'top-rank' : ''}">
                #${playerRank}
            </div>
            <div class="result-message">
                ${playerRank === 1 ? 'Congratulations! You won the Battle Royale!' :
                  playerRank <= 3 ? 'Great job! You placed in the top 3!' :
                  'Better luck next time!'}
            </div>
            <div class="result-prize">
                ${playerPrize > 0 ? `You won ${playerPrize} Tokens!` : 'No prize won'}
            </div>
        </div>
        
        <div class="results-leaderboard">
            <h3>Final Standings</h3>
            <div class="results-list">
                ${finalRankings.slice(0, 5).map(player => `
                    <div class="result-player-item ${player.id === battleRoyaleSystem.playerData.id ? 'current-player' : ''}">
                        <div class="player-rank ${player.rank <= 3 ? 'top-rank' : ''}">#${player.rank}</div>
                        <div class="player-info">
                            <div class="player-name">${player.name} ${player.isHuman ? '' : '<span class="ai-badge">AI</span>'}</div>
                            <div class="player-score">Score: ${player.score}</div>
                        </div>
                        <div class="player-prize">
                            ${player.prize > 0 ? `+${player.prize}` : '0'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="results-actions">
            <button id="play-again-button" class="play-again-button">Play Again</button>
            <button id="return-to-menu-button" class="return-button">Return to Menu</button>
        </div>
    `;
    
    // Remove match screen if exists
    const matchScreen = document.getElementById('battle-royale-match-screen');
    if (matchScreen) {
        matchScreen.remove();
    }
    
    // Add to document
    document.body.appendChild(resultsScreen);
    
    // Add event listeners
    document.getElementById('play-again-button').addEventListener('click', () => {
        // Remove results screen
        resultsScreen.remove();
        
        // Show Battle Royale modal to start a new match
        showBattleRoyaleModal();
    });
    
    document.getElementById('return-to-menu-button').addEventListener('click', () => {
        // Remove results screen
        resultsScreen.remove();
        
        // Show start screen
        const startScreen = document.getElementById('start-screen');
        if (startScreen) {
            startScreen.classList.add('active');
        }
    });
    
    // Create celebration effects for winners
    if (playerRank <= 3) {
        createWinnerCelebration(playerRank);
    }
}

// Create celebration effects for winners
function createWinnerCelebration(rank) {
    // Number of particles based on rank
    const particleCount = rank === 1 ? 100 : rank === 2 ? 70 : 40;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'battle-royale-particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random size
        const size = 5 + Math.random() * 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color based on rank
        let colors;
        if (rank === 1) {
            colors = ['#FFD700', '#FFC107', '#FFEB3B']; // Gold
        } else if (rank === 2) {
            colors = ['#C0C0C0', '#BDBDBD', '#E0E0E0']; // Silver
        } else {
            colors = ['#CD7F32', '#BF360C', '#E65100']; // Bronze
        }
        
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Add to document
        document.body.appendChild(particle);
        
        // Animate particle
        const animation = particle.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        });
        
        // Remove particle after animation
        animation.onfinish = () => {
            particle.remove();
        };
    }
    
    // Play sound effect (would be implemented in a real game)
    // playWinnerSound(rank);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'battle-royale-notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add this to game initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Battle Royale system after game is initialized
    const originalInitGame = window.initGame;
    if (originalInitGame) {
        window.initGame = function() {
            originalInitGame();
            initBattleRoyaleSystem();
        };
    } else {
        // Fallback if initGame isn't available yet
        setTimeout(initBattleRoyaleSystem, 1000);
    }
});
