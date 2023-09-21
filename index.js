// Define players
const players = [
    {
        id: 1,
        cards: [],
        sum: 0,
        hasBlackJack: false,
        isAlive: true
    },
    {
        id: 2,
        cards: [],
        sum: 0,
        hasBlackJack: false,
        isAlive: true
    },
    {
        id: 3,
        cards: [],
        sum: 0,
        hasBlackJack: false,
        isAlive: true
    }
];

// Function to get a random card
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

// Function to start a game for a player
function startGame(playerId) {
    const player = players.find(p => p.id === playerId);
    player.cards = [getRandomCard(), getRandomCard()];
    player.sum = player.cards.reduce((acc, card) => acc + card, 0);
    renderGame(player);
    if (player.sum === 21) {
        document.getElementById(`message-el${player.id}`).textContent = "Yeah, you got a Blackjack!";
    }
}

// Function to render the game for a player
function renderGame(player) {
    const messageEl = document.getElementById(`message-el${player.id}`);
    const cardsEl = document.getElementById(`cards-el${player.id}`);
    const sumEl = document.getElementById(`sum-el${player.id}`);
    
    // Update the DOM elements based on the player's data
    messageEl.textContent = "Want to play a round?";
    cardsEl.textContent = `Cards: ${player.cards.join(", ")}`;
    sumEl.textContent = `Sum: ${player.sum}`;
}

// Function to draw a new card for a player
function newCard(playerId) {
    const player = players.find(p => p.id === playerId);
    
    // Check if the game has started for the player
    if (player.cards.length === 0) {
        document.getElementById(`message-el${player.id}`).textContent = "Start the game first!";
        return; // Exit the function without drawing a card
    }
    
    const card = getRandomCard();
    player.cards.push(card);
    player.sum += card;
    
    renderGame(player); // Always render the game
    if (player.sum === 21) {
        document.getElementById(`message-el${player.id}`).textContent = "Yeah, you got a Blackjack!";
    }
    if (player.sum > 21) {
        player.isAlive = false;
        document.getElementById(`message-el${player.id}`).textContent = "You are out of the game!";
    }
}




// Function to start a new game for a player
function newGame(playerId) {
    const player = players.find(p => p.id === playerId);
    player.cards = [];
    player.sum = 0;
    player.hasBlackJack = false;
    player.isAlive = true;
    renderGame(player);
}
