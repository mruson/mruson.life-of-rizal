const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
points = document.querySelector(".score span");
playBtn = document.querySelector(".play-btn");
playDiv = document.querySelector(".play");
wrapper = document.querySelector(".wrapper");


function play() {
    wrapper.style.display = "block";
    playDiv.style.display = "none";

    return randomWord();
}


let word, maxGuesses, incorrectLetters = [], correctLetters = [], score=0;


function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = 5;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    points.innerText = score;
    
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        let wrongLetters = incorrectLetters.map(element => element.toUpperCase());
        wrongLetter.innerText = (wrongLetters);
    }
    typingInput.value = "";

    const index = wordList.indexOf(word);
    console.log(wordList);

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            score+=1;

            if (index > -1) { // only splice array when item is found
                wordList.splice(index, 1); // 2nd parameter means remove one item only
            }

            alert(`TUMPAK! Ang sagot ay ${word.toUpperCase()}.`);
            
            return randomWord();
        } else if(maxGuesses < 1) {
            alert(`ENGKKK! Ubos na ang iyong pagkakataong sumagot. Nakakuha ka ng ${score} na puntos.`);
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
            return resetGame();
        }
    }, 100);
}

 function resetGame(a){
    a = 0;
    score = a;

    wrapper.style.display = "none";
    playDiv.style.display = "block";

    return randomWord();
 }


resetBtn.addEventListener("click", resetGame);
playBtn.addEventListener("click", play);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

// need to do:

// random, no repeat
// welcome page (play, add nickname),
// leaderboard