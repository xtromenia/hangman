// DOM Components
const hiddenWordDisplay = document.getElementById("word-to-guess");
const guessedLetterList = document.getElementById("guessed-letters");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessedLettersText = document.getElementById("guessed-letters-text");
const lifeCounter = document.getElementById("life-counter");

var guessedLetters;
var lives;
var wordToGuess;

startGame();

// Resets and starts game
function startGame() {
    lives = 6;
    guessedLetters = []
    wordToGuess = randomizeWord();
    guessedLettersText.innerHTML = "Guessed letters: "
    hiddenWordDisplay.innerHTML = "";
    guessedLetterList.innerHTML = "";
    guessBtn.value = "Guess";
    printHiddenWord();
    printLives();
}

//Guess a word when clicking on guess button.
guessBtn.addEventListener("click", () => {
    if (lives !== 0) {
        var guessedLetter = guessInput.value.toLowerCase();
        guessLetter(guessedLetter);
        printHiddenWord();
        printGuessedLetters();
        printLives();
        checkConditions();
    } else {
        startGame();
    }
});

//If you press enter in the input, guess.
guessInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        guessBtn.click();
    }
});

//Print the remaining amount of lives.
function printLives() {
    lifeCounter.innerHTML = "";
    for (var i = 0; i < lives; i++) {
        lifeCounter.append("❤");
    }
}

//Controll if the player lost or won.
function checkConditions() {
    if (hiddenWordDisplay.innerHTML == wordToGuess) {
        guessedLettersText.innerHTML = "Congratulations, you won!";
        guessBtn.value = "Play Again";
    } else if (lives == 0) {
        guessedLettersText.innerHTML = "Better luck next time, you lost..."
        guessBtn.value = "Try Again";
    }
}

//At beginning of game randomize word to pick
function randomizeWord() {
    const wordsToGuess = ["paper", "rock", "scissor", "banana", "pear", "apple", "flingvin"];
    var randomNum = Math.floor(((Math.random() * wordsToGuess.length)));
    return wordsToGuess[randomNum];
}

//Print out letters of the hidden word, if they're guessed do not print out underscore.
function printHiddenWord() {
    hiddenWordDisplay.innerHTML = "";
    for (let index = 0; index < wordToGuess.length; index++) {
        var letter = wordToGuess[index];
        if (!guessedLetters.includes(letter)) {
            hiddenWordDisplay.append("_")
        } else {
            hiddenWordDisplay.append(letter)
        }
    }
}

//Everytime player guesses print out a letter to remind the player of what they've guessed on.
function printGuessedLetters() {
    guessedLetterList.innerHTML = "";
    guessedLetters.forEach(letter => {
        var letterLi = document.createElement("li");
        letterLi.innerHTML = letter;
        guessedLetterList.appendChild(letterLi);
    });
}

//Check if the guessed letter appears in the hidden word.
function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!wordToGuess.includes(letter)) {
            lives--;
        }
    } else {
        guessedLettersText.innerHTML = "Already guessed the letter: " + letter;
    }
    guessInput.value = "";
}