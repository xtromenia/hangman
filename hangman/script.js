// DOM Components
const hiddenWordDisplay = document.getElementById("word-to-guess");
const guessedLetterList = document.getElementById("guessed-letters");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessedLettersText = document.getElementById("guessed-letters-text");
const lifeCounter = document.getElementById("life-counter");
const word = document.getElementById("word");
const wordinfoWrapper = document.getElementById("wordinfo-wrapper");
const wordDef = document.getElementById("word-def")
const wordPhonetics = document.getElementById("word-phonetics");
const soundPlayer = document.getElementById("sound-player");

var guessedLetters;
var lives;
var wordToGuess;

startGame();

// Resets and starts game
async function startGame() {
    wordinfoWrapper.style.display = "none";
    lives = 6;
    guessedLetters = []
    wordToGuess = await randomizeWord();
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
guessInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
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
async function checkConditions() {
    if (hiddenWordDisplay.innerHTML == wordToGuess) {
        guessedLettersText.innerHTML = "Congratulations, you won!";
        guessBtn.value = "Play Again";
    } else if (lives == 0) {
        guessedLettersText.innerHTML = "Better luck next time, you lost..."
        guessBtn.value = "Try Again";
    }
    if (hiddenWordDisplay.innerHTML == wordToGuess || lives == 0 ) {
        
        word.innerText = "The word was: " + wordToGuess;
        var wordInfo = await getWordInfo();

            wordinfoWrapper.style.display = "block";
            console.log(wordInfo);
            wordDef.innerText = "Origin: " + wordInfo[0].origin;
            wordPhonetics.setAttribute("src", "https:" + wordInfo[0].phonetics[0].audio)
            soundPlayer.load();
    
        // else{
        //     wordDef.innerText = "No defenition found...";
        //     wordPhonetics.setAttribute("src","#");
        // }
    }
}

//At beginning of game randomize word to pick
async function randomizeWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    let data = await response.json();
    return data[0];
}

async function getWordInfo(){
    let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+wordToGuess);
    let data = await response.json();
    return data;
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