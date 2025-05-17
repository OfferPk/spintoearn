// Mystery Box / Spin Crate System for Flappy Bird Game
// This system rewards players with mystery boxes after a certain number of spins

// Mystery Box configuration
const mysteryBoxConfig = {
    // Number of spins required to earn a mystery box
    spinsRequired: 5,
    
    // Types of rewards with their probabilities and values
    rewards: {
        bonusSpin: {
            name: "Bonus Spin",
            probability: 30,
            min: 1,
            max: 3,
            icon: "fa-sync-alt"
        },
        avatar: {
            name: "Avatar Item",
            probability: 25,
            items: [
                { id: "hat_1", name: "Pilot Hat", rarity: "common", icon: "fa-hat-cowboy" },
                { id: "hat_2", name: "Crown", rarity: "rare", icon: "fa-crown" },
                { id: "glasses_1", name: "Sunglasses", rarity: "common", icon: "fa-glasses" },
                { id: "cape_1", name: "Hero Cape", rarity: "rare", icon: "fa-mask" },
                { id: "wings_1", name: "Golden Wings", rarity: "epic", icon: "fa-feather-alt" }
            ],
            icon: "fa-user-astronaut"
        },
        cryptoDrop: {
            name: "Crypto Drop",
            probability: 15,
            min: 0.0001,
            max: 0.01,
            icon: "fa-coins"
        },
        token: {
            name: "Game Token",
            probability: 20,
            min: 5,
            max: 50,
            icon: "fa-ticket-alt"
        },
        booster: {
            name: "Score Booster",
            probability: 10,
            items: [
                { id: "score_2x", name: "2x Score", duration: 60, icon: "fa-tachometer-alt" },
                { id: "invincible", name: "Invincibility", duration: 30, icon: "fa-shield-alt" },
                { id: "magnet", name: "Coin Magnet", duration: 45, icon: "fa-magnet" }
            ],
            icon: "fa-bolt"
        }
    },
    
    // Animation settings
    animation: {
        openDuration: 2000,
        particleCount: 50
    }
};

// Mystery Box system state
let mysteryBoxSystem = {
    spinCount: 0,
    boxesEarned: 0,
    boxesOpened: 0,
    inventory: {
        boxes: 0,
        bonusSpins: 0,
        avatars: [],
        tokens: 0,
        boosters: []
    },
    rewardHistory: []
};

// Initialize Mystery Box system
function initMysteryBoxSystem() {
    console.log("Initializing Mystery Box system...");
    
    // Load data from localStorage
    loadMysteryBoxData();
    
    // Add Mystery Box button to game menu
    addMysteryBoxButton();
    
    // Check for pending notifications
    checkPendingNotifications();
    
    console.log("Mystery Box system initialized");
}

// Load Mystery Box data from localStorage
function loadMysteryBoxData() {
    const savedData = localStorage.getItem('flappyBirdMysteryBoxData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            mysteryBoxSystem = { ...mysteryBoxSystem, ...parsedData };
            console.log("Loaded Mystery Box data:", mysteryBoxSystem);
        } catch (e) {
            console.error("Error loading Mystery Box data:", e);
        }
    }
}

// Save Mystery Box data to localStorage
function saveMysteryBoxData() {
    try {
        localStorage.setItem('flappyBirdMysteryBoxData', JSON.stringify(mysteryBoxSystem));
    } catch (e) {
        console.error("Error saving Mystery Box data:", e);
    }
}

// Add Mystery Box button to game menu
function addMysteryBoxButton() {
    // Check if start screen exists
    const startScreen = document.getElementById('start-screen');
    if (!startScreen) return;
    
    // Check if button already exists
    if (document.getElementById('mystery-box-button')) return;
    
    // Create Mystery Box button
    const mysteryBoxButton = document.createElement('button');
    mysteryBoxButton.id = 'mystery-box-button';
    mysteryBoxButton.className = 'overlay-button';
    mysteryBoxButton.style.marginTop = '10px';
    mysteryBoxButton.innerHTML = `<i class="fas fa-box-open"></i> Mystery Boxes <span class="box-count">${mysteryBoxSystem.inventory.boxes}</span>`;
    
    // Add event listener
    mysteryBoxButton.addEventListener('click', showMysteryBoxModal);
    
    // Add to start screen
    startScreen.appendChild(mysteryBoxButton);
    
    // Update box count
    updateMysteryBoxCount();
}

// Update Mystery Box count on button
function updateMysteryBoxCount() {
    const boxCountElement = document.querySelector('#mystery-box-button .box-count');
    if (boxCountElement) {
        boxCountElement.textContent = mysteryBoxSystem.inventory.boxes;
        
        // Highlight if boxes available
        if (mysteryBoxSystem.inventory.boxes > 0) {
            document.getElementById('mystery-box-button').classList.add('has-boxes');
        } else {
            document.getElementById('mystery-box-button').classList.remove('has-boxes');
        }
    }
}

// Show Mystery Box modal
function showMysteryBoxModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'mystery-box-modal';
    modal.innerHTML = `
        <div class="mystery-box-modal-content">
            <span class="mystery-box-close">&times;</span>
            <h2>Mystery Boxes</h2>
            
            <div class="mystery-box-stats">
                <div class="mystery-box-stat">
                    <span class="stat-value">${mysteryBoxSystem.inventory.boxes}</span>
                    <span class="stat-label">Available Boxes</span>
                </div>
                <div class="mystery-box-stat">
                    <span class="stat-value">${mysteryBoxSystem.spinCount}/${mysteryBoxConfig.spinsRequired}</span>
                    <span class="stat-label">Spins to Next Box</span>
                </div>
                <div class="mystery-box-stat">
                    <span class="stat-value">${mysteryBoxSystem.boxesOpened}</span>
                    <span class="stat-label">Boxes Opened</span>
                </div>
            </div>
            
            <div class="mystery-box-container">
                ${mysteryBoxSystem.inventory.boxes > 0 ? 
                    `<div class="mystery-box">
                        <div class="box-lid"></div>
                        <div class="box-body"></div>
                    </div>
                    <button id="open-box-button" class="open-box-button">OPEN BOX</button>` 
                    : 
                    `<div class="empty-box-message">
                        <p>You don't have any Mystery Boxes yet!</p>
                        <p>Spin the wheel ${mysteryBoxConfig.spinsRequired - mysteryBoxSystem.spinCount} more times to earn one.</p>
                    </div>`
                }
            </div>
            
            <div class="inventory-section">
                <h3>Your Inventory</h3>
                <div class="inventory-tabs">
                    <button class="inventory-tab active" data-tab="bonusSpins">Bonus Spins</button>
                    <button class="inventory-tab" data-tab="avatars">Avatars</button>
                    <button class="inventory-tab" data-tab="tokens">Tokens</button>
                    <button class="inventory-tab" data-tab="boosters">Boosters</button>
                </div>
                
                <div class="inventory-content active" id="bonusSpins-content">
                    <div class="bonus-spins-display">
                        <span class="bonus-spins-count">${mysteryBoxSystem.inventory.bonusSpins}</span>
                        <span class="bonus-spins-label">Bonus Spins Available</span>
                        ${mysteryBoxSystem.inventory.bonusSpins > 0 ? 
                            `<button id="use-bonus-spin" class="use-item-button">Use Bonus Spin</button>` 
                            : ''}
                    </div>
                </div>
                
                <div class="inventory-content" id="avatars-content">
                    ${mysteryBoxSystem.inventory.avatars.length > 0 ? 
                        `<div class="avatars-grid">
                            ${mysteryBoxSystem.inventory.avatars.map(avatar => 
                                `<div class="avatar-item ${avatar.equipped ? 'equipped' : ''}" data-id="${avatar.id}">
                                    <div class="avatar-icon"><i class="fas ${avatar.icon}"></i></div>
                                    <div class="avatar-name">${avatar.name}</div>
                                    <div class="avatar-rarity ${avatar.rarity}">${avatar.rarity}</div>
                                    <button class="equip-avatar-button">${avatar.equipped ? 'Equipped' : 'Equip'}</button>
                                </div>`
                            ).join('')}
                        </div>` 
                        : 
                        `<div class="empty-inventory-message">No avatar items yet!</div>`
                    }
                </div>
                
                <div class="inventory-content" id="tokens-content">
                    <div class="tokens-display">
                        <span class="tokens-count">${mysteryBoxSystem.inventory.tokens}</span>
                        <span class="tokens-label">Game Tokens</span>
                        ${mysteryBoxSystem.inventory.tokens >= 10 ? 
                            `<button id="exchange-tokens" class="use-item-button">Exchange for Spin</button>` 
                            : ''}
                    </div>
                </div>
                
                <div class="inventory-content" id="boosters-content">
                    ${mysteryBoxSystem.inventory.boosters.length > 0 ? 
                        `<div class="boosters-list">
                            ${mysteryBoxSystem.inventory.boosters.map(booster => 
                                `<div class="booster-item" data-id="${booster.id}">
                                    <div class="booster-icon"><i class="fas ${booster.icon}"></i></div>
                                    <div class="booster-info">
                                        <div class="booster-name">${booster.name}</div>
                                        <div class="booster-duration">Duration: ${booster.duration}s</div>
                                    </div>
                                    <button class="use-booster-button">Use</button>
                                </div>`
                            ).join('')}
                        </div>` 
                        : 
                        `<div class="empty-inventory-message">No boosters yet!</div>`
                    }
                </div>
            </div>
            
            <div class="possible-rewards">
                <h3>Possible Rewards</h3>
                <div class="rewards-grid">
                    ${Object.entries(mysteryBoxConfig.rewards).map(([key, reward]) => 
                        `<div class="reward-item">
                            <div class="reward-icon"><i class="fas ${reward.icon}"></i></div>
                            <div class="reward-name">${reward.name}</div>
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    document.querySelector('.mystery-box-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Open box button
    const openBoxButton = document.getElementById('open-box-button');
    if (openBoxButton) {
        openBoxButton.addEventListener('click', () => {
            openMysteryBox(modal);
        });
    }
    
    // Inventory tab switching
    document.querySelectorAll('.inventory-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.inventory-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.inventory-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(`${tabName}-content`).classList.add('active');
        });
    });
    
    // Use bonus spin button
    const useBonusSpinButton = document.getElementById('use-bonus-spin');
    if (useBonusSpinButton) {
        useBonusSpinButton.addEventListener('click', () => {
            useBonusSpin();
            modal.remove();
        });
    }
    
    // Exchange tokens button
    const exchangeTokensButton = document.getElementById('exchange-tokens');
    if (exchangeTokensButton) {
        exchangeTokensButton.addEventListener('click', () => {
            exchangeTokensForSpin();
            modal.remove();
        });
    }
    
    // Equip avatar buttons
    document.querySelectorAll('.equip-avatar-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const avatarItem = e.target.closest('.avatar-item');
            const avatarId = avatarItem.getAttribute('data-id');
            equipAvatar(avatarId);
            
            // Update UI
            document.querySelectorAll('.avatar-item').forEach(item => {
                item.classList.remove('equipped');
                item.querySelector('.equip-avatar-button').textContent = 'Equip';
            });
            avatarItem.classList.add('equipped');
            button.textContent = 'Equipped';
        });
    });
    
    // Use booster buttons
    document.querySelectorAll('.use-booster-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const boosterItem = e.target.closest('.booster-item');
            const boosterId = boosterItem.getAttribute('data-id');
            useBooster(boosterId);
            boosterItem.remove();
            
            // Show notification
            showNotification('Booster activated!');
        });
    });
    
    // Pause game if it's running
    if (typeof pauseGame === 'function' && window.gameState === 'playing') {
        pauseGame();
    }
}

// Open Mystery Box animation and reward
function openMysteryBox(modal) {
    if (mysteryBoxSystem.inventory.boxes <= 0) return;
    
    // Disable open button
    const openBoxButton = document.getElementById('open-box-button');
    if (openBoxButton) {
        openBoxButton.disabled = true;
        openBoxButton.textContent = 'Opening...';
    }
    
    // Get box elements
    const boxElement = modal.querySelector('.mystery-box');
    const boxLid = boxElement.querySelector('.box-lid');
    
    // Add opening class to start animation
    boxElement.classList.add('opening');
    
    // Determine reward
    const reward = determineReward();
    
    // After animation delay, show reward
    setTimeout(() => {
        // Create reward element
        const rewardElement = document.createElement('div');
        rewardElement.className = 'mystery-box-reward';
        
        // Create reward content based on type
        let rewardContent = '';
        let rewardDescription = '';
        
        switch (reward.type) {
            case 'bonusSpin':
                rewardContent = `<i class="fas ${mysteryBoxConfig.rewards.bonusSpin.icon}"></i>`;
                rewardDescription = `${reward.value} Bonus ${reward.value === 1 ? 'Spin' : 'Spins'}`;
                break;
            case 'avatar':
                rewardContent = `<i class="fas ${reward.item.icon}"></i>`;
                rewardDescription = `${reward.item.name} (${reward.item.rarity})`;
                break;
            case 'cryptoDrop':
                rewardContent = `<i class="fas ${mysteryBoxConfig.rewards.cryptoDrop.icon}"></i>`;
                rewardDescri
(Content truncated due to size limit. Use line ranges to read in chunks)
