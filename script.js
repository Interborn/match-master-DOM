const cards = document.querySelectorAll(".card");
const simpleCards = document.querySelectorAll(".cardSimple");
const easyCards = document.querySelectorAll(".cardEasy");
const normalCards = document.querySelectorAll(".cardNormal");
const hardCards = document.querySelectorAll(".cardHard");
const expertCards = document.querySelectorAll(".cardExpert");

const simpleGameboard = document.querySelector(".gameboardSimple");
const easyGameboard = document.querySelector(".gameboardEasy");
const normalGameboard = document.querySelector(".gameboardNormal");
const hardGameboard = document.querySelector(".gameboardHard");
const expertGameboard = document.querySelector(".gameboardExpert");

timeTag = document.querySelector(".time b");
flipsZeroTag = document.querySelector(".flips0 b");
flipsOneTag = document.querySelector(".flips1 b");
scoreZeroTag = document.querySelector(".score0 b");
scoreOneTag = document.querySelector(".score1 b");
restartBtn = document.querySelector(".restart");
simpleBtn = document.querySelector(".simple");
easyBtn = document.querySelector(".easy");
normalBtn = document.querySelector(".normal");
hardBtn = document.querySelector(".hard");
expertBtn = document.querySelector(".expert");

let maxTime = 30;
let timeLeft = maxTime;
let flipsZero = 0;
let flipsOne = 0;
let scoreZero = 0;
let scoreOne = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let isActiveZero = 0;
let isActiveOne = 0;
let cardOne, cardTwo, timer, gamemode;

// Initialize Timer and Syncronize with FE
function initTimer() {
    if (timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

// Flip Card when Clicked
function flipCard ({target: clickedCard}) {
    // Checks if game is Active
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    
    // Flips Card when Clicked
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        cardOneImg = cardOne.querySelector(".back img").src,
        cardTwoImg = cardTwo.querySelector(".back img").src;
        matchCards(cardOneImg, cardTwoImg);
        // Check if User Zero is Active
        if (isActiveZero == 1 && isActiveOne == 0) {
            // Counts Flips and Stores on FE
            flipsZero++;
            flipsZeroTag.innerText = flipsZero;
            // Give User Zero 2 Turns (4 flips)
            if (flipsZero % 2 == 0) {
                isActiveZero = 0;
                isActiveOne = 1;
            }
        // Check if User One is Active
        } else if (isActiveZero == 0 && isActiveOne == 1) {
            // Counts Flips and Stores on FE
            flipsOne++;
            flipsOneTag.innerText = flipsOne;
            // Give User One 2 Turns (4 flips)
            if (flipsOne % 2 == 0) {
                isActiveZero = 1;
                isActiveOne = 0;
            }
        }
    }
}
// Check if Clicked Cards Match
function matchCards(img1, img2) {
    // Check if Cards Match
    if (img1 === img2) { 
        // Count Matched Pairs
        matchedCard++;
        // Ckeck that Time is Up and Matches don't exceed the num of Cards
        if (matchedCard == document.querySelectorAll(`.card${gamemode}`).length && timeLeft > 0) {
            return clearInterval(timer);
        }
        // Clicked Card Event Listeners
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        // Reset Card One and Two
        cardOne = cardTwo = "";
        // Add Score to User Zero if Active
        if (isActiveZero == 1 && isActiveOne == 0) {
            scoreZero++;
            scoreZeroTag.innerText = scoreZero;  
        }
        // Add Score to User One if Active
        if (isActiveZero == 0 && isActiveOne == 1) {
            scoreOne++;
            scoreOneTag.innerText = scoreOne;
        }
        return disableDeck = false;
    }
    setTimeout (() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout (() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
// Shuffle & Reset Deck
function shuffleCard() {
    isActiveZero = 1;
    isActiveOne = 0;
    timeLeft = maxTime;
    scoreZero = matchedCard = 0;
    scoreOne = matchedCard = 0;
    flipsZero = matchedCard = 0;
    flipsOne = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsZeroTag.innerText = flipsZero;
    flipsOneTag.innerText = flipsOne;
    scoreZeroTag.innerText = scoreZero;
    scoreOneTag.innerText = scoreOne;
    disableDeck = isPlaying = false;
    // Set Array for Match Options and Fill Depending on Gamemode
    let arr = [];  
    if (gamemode === "Simple") {
        arr = [1, 2, 1, 2];
        // Randomly Assign Spots
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        simpleCards.forEach((card, index) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back img");
            setTimeout(() => {
                imgTag.src = `images/img-${arr[index]}.png`;
            }, 500);
            card.addEventListener("click", flipCard);
        });
    }
    if (gamemode === "Easy") {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        // Randomly Assign Spots
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        easyCards.forEach((card, index) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back img");
            setTimeout(() => {
                imgTag.src = `images/img-${arr[index]}.png`;
            }, 500);
            card.addEventListener("click", flipCard);
        });
    }
    if (gamemode === "Normal") {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        // Randomly Assign Spots
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        normalCards.forEach((card, index) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back img");
            setTimeout(() => {
                imgTag.src = `images/img-${arr[index]}.png`;
            }, 500);
            card.addEventListener("click", flipCard);
        });
    }
    if (gamemode === "Hard") {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
        // Randomly Assign Spots
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        hardCards.forEach((card, index) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back img");
            setTimeout(() => {
                imgTag.src = `images/img-${arr[index]}.png`;
            }, 500);
            card.addEventListener("click", flipCard);
        });
    }
    if (gamemode === "Expert") {
        arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,];
        // Randomly Assign Spots
        arr.sort(() => Math.random() > 0.5 ? 1 : -1);
        expertCards.forEach((card, index) => {
            card.classList.remove("flip");
            let imgTag = card.querySelector(".back img");
            setTimeout(() => {
                imgTag.src = `images/img-${arr[index]}.png`;
            }, 500);
            card.addEventListener("click", flipCard);
        });
    }
}
// Change Gamemode Functions (Simple, Easy, Normal, Hard, Expert)
function simpleGamemode() {
    simpleGameboard.style.display = "flex";
    easyGameboard.style.display = "none";
    normalGameboard.style.display = "none";
    hardGameboard.style.display = "none";
    expertGameboard.style.display = "none";
    gamemode = "Simple";
}
function easyGamemode() {
    simpleGameboard.style.display = "none";
    easyGameboard.style.display = "flex";
    normalGameboard.style.display = "none";
    hardGameboard.style.display = "none";
    expertGameboard.style.display = "none";
    gamemode = "Easy";
}
function normalGamemode() {
    simpleGameboard.style.display = "none";
    easyGameboard.style.display = "none";
    normalGameboard.style.display = "flex";
    hardGameboard.style.display = "none";
    expertGameboard.style.display = "none";
    gamemode = "Normal";
}
function hardGamemode() {
    simpleGameboard.style.display = "none";
    easyGameboard.style.display = "none";
    normalGameboard.style.display = "none";
    hardGameboard.style.display = "flex";
    expertGameboard.style.display = "none";
    gamemode = "Hard";
}
function expertGamemode() {
    simpleGameboard.style.display = "none";
    easyGameboard.style.display = "none";
    normalGameboard.style.display = "none";
    hardGameboard.style.display = "none";
    expertGameboard.style.display = "flex";
    gamemode = "Expert";
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////


normalGamemode();
shuffleCard();

restartBtn.addEventListener("click", shuffleCard);
simpleBtn.addEventListener("click", simpleGamemode);
easyBtn.addEventListener("click", easyGamemode);
normalBtn.addEventListener("click", normalGamemode);
hardBtn.addEventListener("click", hardGamemode);
expertBtn.addEventListener("click", expertGamemode);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});