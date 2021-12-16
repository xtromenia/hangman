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

guessInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        guessBtn.click();
    }
});

function printLives() {
    lifeCounter.innerHTML = "";
    for (var i = 0; i < lives; i++) {
        lifeCounter.append("❤");
    }
}

function checkConditions() {
    if (hiddenWordDisplay.innerHTML == wordToGuess) {
        guessedLettersText.innerHTML = "Congratulations, you won!";
        guessBtn.value = "Play Again";
    } else if (lives == 0) {
        guessedLettersText.innerHTML = "Better luck next time, you lost..."
        guessBtn.value = "Try Again";
    }
}

function randomizeWord() {
    const wordsToGuess = ["paper", "rock", "scissor", "banana", "pear", "apple", "flingvin"];
    var randomNum = Math.floor(((Math.random() * wordsToGuess.length)));
    return wordsToGuess[randomNum];
}

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

function printGuessedLetters() {
    guessedLetterList.innerHTML = "";
    guessedLetters.forEach(letter => {
        var letterLi = document.createElement("li");
        letterLi.innerHTML = letter;
        guessedLetterList.appendChild(letterLi);
    });
}

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