class AudioController {
    constructor() {
        this.flipSound = new Audio('Assets/Audio/flip.wav');
        this.matchSound = new Audio('Assets/Audio/match.wav');
        this.victorySound = new Audio('Assets/Audio/victory.wav');
        this.specificSounds = {
            'bee': new Audio('Assets/Audio/beebuzz.mp3'),
            'cat': new Audio('Assets/Audio/catmeow.mp3'),
            'cow': new Audio('Assets/Audio/cowmoo.mp3'),
            'cricket': new Audio('Assets/Audio/cricketnoise.mp3'),
            'dog': new Audio('Assets/Audio/dogbark.mp3'),
            'dove': new Audio('Assets/Audio/dovecoo.mp3'),
            'duck': new Audio('Assets/Audio/duckquack.mp3'),
            'elephant': new Audio('Assets/Audio/Elephanttoot.mp3'),
            'frog': new Audio('Assets/Audio/frogcroak.mp3'),
            'horse': new Audio('Assets/Audio/horsesnort.mp3'),
            'monkey': new Audio('Assets/Audio/monkeyscreech.mp3'),
            'rat': new Audio('Assets/Audio/mousesqueak.mp3'),
            'owl': new Audio('Assets/Audio/owlhoot.mp3'),
            'pig': new Audio('Assets/Audio/pig-squeak.mp3'),
            'rooster': new Audio('Assets/Audio/roosterkukuryku.mp3'),
            'seal': new Audio('Assets/Audio/sealhonk.mp3'),
            'snake': new Audio('Assets/Audio/snakessss.mp3'),
            'tiger': new Audio('Assets/Audio/tigerroar.mp3'),
            'turkey': new Audio('Assets/Audio/turkeygobble.mp3'),
            'whale': new Audio('Assets/Audio/whalesound.mp3'),
        };
    }

    flip(cardType) {
        if (this.specificSounds[cardType]) {
            this.specificSounds[cardType].play();
        } else {
            this.flipSound.play();
        }
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.victorySound.play();
    }
}

class GraMemory {
    constructor(cards, username) {
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
        this.timerElement = document.getElementById('timer');
        this.audioController = new AudioController();
        this.totalClicks = 0;
        this.matchedCards = [];
        this.busy = false;
        this.cardToCheck = null;
        this.sessionTime = 5 * 60; // 2 minutes in seconds
        this.sessionActive = true;
        this.sessionEnded = false;
        this.username = username;
        this.sessionInterval = null;
        this.startTime = null; // New property to store the start timestamp
        console.log(`Initialized game for user: ${username}`);
        this.loadSessionState();
    }

    startGame() {
        console.log('Starting game...');
        this.totalClicks = 0;
        this.matchedCards = [];
        this.busy = true;
        this.cardToCheck = null;
        const shuffled = this.loadShuffledOrder();
        console.log('Shuffled order loaded:', shuffled);
        if (!shuffled) {
            this.shuffleCards(this.cardsArray);
        }
        this.hideCards();
        this.ticker.innerText = this.totalClicks;
        this.busy = false;
        this.startTime = Date.now();
    }

    startSession() {
        console.log('Starting session...');
        const lastSessionDateKey = `lastSessionDate_${this.username}`;
        const lastSessionDate = localStorage.getItem(lastSessionDateKey);
        const today = new Date().toLocaleDateString();

        if (lastSessionDate === today && this.sessionEnded) {
            alert('Dziękujemy za grę. Prosimy wrócić jutro.');
            window.location.href = 'index.html';
            return;
        }

        localStorage.setItem(lastSessionDateKey, today);
        if (!this.loadSessionState()) {
            this.startGame();
        }
        this.startTimer();
    }

    startTimer() {
        console.log('Starting timer...');
        if (this.sessionInterval) {
            clearInterval(this.sessionInterval);
        }
        this.sessionInterval = setInterval(() => {
            if (this.sessionTime > 0) {
                this.sessionTime--;
                this.updateTimerDisplay();
                this.saveSessionState();
            } else {
                clearInterval(this.sessionInterval);
                this.sessionActive = false;
                this.showBugReportModal(); // Show bug report modal before ending session
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.sessionTime / 60);
        const seconds = this.sessionTime % 60;
        this.timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Send victory data to the victory Google Sheet
    sendVictoryData() {
        const url = 'https://script.google.com/macros/s/AKfycbzxI0oIIZ-DNQnuUfEUpOZKjEKd6x0bPkla35YCk_j0NaAq_7b6d9GhloTcymbko4teFA/exec'; // Replace with your victory sheet URL
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Calculate elapsed time dynamically
        const data = {
            id: 'B3', // Added ID
            username: this.username,
            flips: this.totalClicks,
            elapsedTime, // Include dynamically calculated elapsed time
            date: new Date().toLocaleString()
        };

        console.log('Victory data being sent:', data); // Debug log

        fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => console.log('Victory data sent successfully:', data))
        .catch(error => console.error('Error sending victory data:', error));
    }

    // Send bug report data to the bug report Google Sheet
    sendBugReportData(bugReportText) {
        const url = 'https://script.google.com/macros/s/AKfycbw1u007UwU6mXz11YvbcGZIt4Ue8MPW3azls_O7JdYO6Otfo4fX2714wt-89DROO7jd-g/exec'; // Replace with your bug report sheet URL
        const data = {
            id: 'B3', // Added ID
            username: this.username,
            bugReport: bugReportText,
            date: new Date().toLocaleString()
        };

        console.log('Bug report data being sent:', data); // Debug log

        fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => console.log('Bug report data sent successfully:', data))
        .catch(error => console.error('Error sending bug report data:', error));
    }

    // Show bug report modal before ending the session
    showBugReportModal() {
        const modal = document.getElementById('bug-report-modal');
        modal.classList.remove('hidden');
    
        // Attach event listener to the submit button
        document.getElementById('submit-bug-report').addEventListener('click', () => {
            const bugReportText = document.getElementById('bug-report-text').value;
            console.log('Submit button clicked. Bug report text:', bugReportText); // Debug log
    
            if (bugReportText.trim()) {
                this.sendBugReportData(bugReportText); // Send the bug report data
                alert('Dziękujemy za zgłoszenie');
            } else {
                alert('Opisz problem.');
            }
    
            modal.classList.add('hidden');
            this.endSession(); // End the session after the modal is closed
        });
    
        // Attach event listener to the close button
        document.getElementById('close-bug-report').addEventListener('click', () => {
            console.log('Close button clicked. Closing modal.'); // Debug log
            modal.classList.add('hidden');
            this.endSession(); // End the session after the modal is closed
        });
    }
    // End the session
    endSession() {
        console.log('Ending session...');
        this.sessionEnded = true;
        document.getElementById('session-end-text').classList.add('visible');
        this.clearSessionState();
    }

    victory() {
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
        if (this.sessionActive) {
            setTimeout(() => {
                document.getElementById('victory-text').classList.remove('visible');
                this.sendVictoryData(); // Send victory data
                this.clearGameState();
                this.startGame();
            }, 2000);
        }
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {
            const cardType = this.getCardType(card); // Get the card type
            this.audioController.flip(cardType); // Play specific sound based on card type
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
    
            if (this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }

            // Only save the game state if the session is active
            if (this.sessionActive) {
                this.saveGameState();
            }
        }
    }

    checkForCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMismatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.classList.add('visible'); // Ensure matched cards are visible
        card2.classList.add('visible'); // Ensure matched cards are visible
        this.audioController.match();
        console.log('Matched cards:', this.matchedCards.map(card => card.dataset.id));
        if (this.matchedCards.length === this.cardsArray.length) {
            this.victory();
        }
    }

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            // Swap the elements at i and randIndex
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        // Update the order style after shuffling
        cardsArray.forEach((card, index) => {
            card.style.order = index;
        });
        this.saveShuffledOrder(cardsArray);
    }

    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].alt; 
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    saveSessionState() {
        const sessionState = {
            sessionTime: this.sessionTime,
            sessionEnded: this.sessionEnded,
            startTime: this.startTime // Save the start timestamp
        };
        console.log('Saving session state:', sessionState);
        localStorage.setItem(`sessionState_${this.username}`, JSON.stringify(sessionState));
    }

    loadSessionState() {
        const sessionState = JSON.parse(localStorage.getItem(`sessionState_${this.username}`));
        if (sessionState && !sessionState.sessionEnded) {
            console.log('Loading session state:', sessionState);
            this.sessionTime = sessionState.sessionTime;
            this.sessionEnded = sessionState.sessionEnded;
            this.startTime = sessionState.startTime || Date.now(); // Load the start timestamp
            this.updateTimerDisplay();
            this.loadGameState(); // Load game state when loading session
            return true;
        } else {
            console.log('No valid session state found or session has ended.');
            return false;
        }
    }

    clearSessionState() {
        localStorage.removeItem(`sessionState_${this.username}`);
    }

    serializeGameState() {
        const gameState = {
            cards: this.cardsArray.map(card => ({
                id: card.dataset.id,
                visible: card.classList.contains('visible'),
                matched: card.classList.contains('matched')
            })),
            totalClicks: this.totalClicks
        };
        return JSON.stringify(gameState);
    }

    saveGameState() {
        const gameState = this.serializeGameState();
        localStorage.setItem('gameState', gameState);
    }

    loadGameState() {
        const gameState = localStorage.getItem('gameState');
        if (gameState) {
            const { cards, totalClicks } = JSON.parse(gameState);
            this.totalClicks = totalClicks;
            this.ticker.innerText = this.totalClicks;
            if (this.loadShuffledOrder()) {
                cards.forEach((cardState, index) => {
                    const card = this.cardsArray[index];
                    card.dataset.id = cardState.id;
                    if (cardState.matched) {
                        card.classList.add('matched');
                        card.classList.add('visible'); // Ensure matched cards are visible
                        this.matchedCards.push(card);
                    } else {
                        card.classList.remove('visible'); // Ensure unmatched cards are not visible
                    }
                });
            }
        }
    }

    saveShuffledOrder(cardsArray) {
        const shuffledOrder = cardsArray.map(card => card.dataset.id);
        localStorage.setItem('shuffledOrder', JSON.stringify(shuffledOrder));
    }

    loadShuffledOrder() {
        const shuffledOrder = JSON.parse(localStorage.getItem('shuffledOrder'));
        if (shuffledOrder) {
            this.cardsArray.sort((a, b) => {
                return shuffledOrder.indexOf(a.dataset.id) - shuffledOrder.indexOf(b.dataset.id);
            });
            this.cardsArray.forEach((card, index) => {
                card.style.order = index;
            });
            return true;
        }
        return false;
    }

    clearGameState() {
        console.log('Clearing shuffled order and game state...');
        localStorage.removeItem('shuffledOrder');
        localStorage.removeItem('gameState');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    const username = sessionStorage.getItem('username'); // Retrieve the username from session storage
    console.log(`Username from session storage: ${username}`);
    let game = new GraMemory(cards, username);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            console.log('Overlay clicked');
            overlay.classList.remove('visible');
            game.startSession();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });

    window.addEventListener('beforeunload', () => {
        game.saveSessionState();
    });

    game.loadGameState(); // Load game state when the page loads
}