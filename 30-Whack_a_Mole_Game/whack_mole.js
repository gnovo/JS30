const holes = document.querySelectorAll('.hole'),
  scoreBoard = document.querySelector('.score'),
  moles = document.querySelectorAll('.mole'),
  hammerSound = document.querySelector('.hammer-sound');

let lastHole,
  timeUp = false,
  score = 0
  highscore = localStorage.getItem("highscore"),
  // Scenarios' Variables
  instructionsScenario = document.getElementById("instructions"),
  instructionsScenarioImg = document.getElementById("instructions-img"),
  winScenario = document.getElementById("win"),
  winScenarioImg = document.getElementById("win-img"),
  loseScenario = document.getElementById("lose"),
  loseScenarioImg = document.getElementById("lose-img"),
  game = document.getElementById("game");

document.getElementById("high-score").innerHTML = localStorage.getItem("highscore");

function highScore() {
  if(highscore !== null){
    if (score > highscore) {
      localStorage.setItem("highscore", score);      
    }
  }
  else{
    localStorage.setItem("highscore", score);
  }
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length),
    hole = holes[idx];
  if (hole === lastHole) {
    console.log('No good, pick a different hole!');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(600, 1000),
    hole = randomHole(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  if (score < highscore) {
    document.getElementById("high-score").innerHTML = localStorage.getItem("highscore");
  }

  instructionsScenario.style.display = 'none';
  instructionsScenarioImg.style.display = 'none';

  winScenario.style.display = 'none';
  winScenarioImg.style.display = 'none';

  loseScenario.style.display = 'none';
  loseScenarioImg.style.display = 'none';

  game.style.background = "url(images/grass.png) bottom center no-repeat";

  peep();
  setTimeout(() => {
    timeUp = true;
    scenario();
  }, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  highScore();
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
  hammerSound.currentTime = 0; // restart audio
  hammerSound.play();
}

moles.forEach(mole => mole.addEventListener('click', bonk));
highScore();

// Instructions Button
let instructionsButton = document.querySelector('.instructions');

instructionsButton.addEventListener('click', function (event) {
  let next = this.nextElementSibling;

  if (instructionsScenario.style.display === 'none' && instructionsScenarioImg.style.display === 'none') {
    instructionsScenario.style.display = 'block';
    instructionsScenarioImg.style.display = 'block';

    winScenario.style.display = 'none';
    winScenarioImg.style.display = 'none';

    loseScenario.style.display = 'none';
    loseScenarioImg.style.display = 'none';

    game.style.background = "rgba(255,255,255,0.8)";
  } else {
    instructionsScenario.style.display = 'none';
    instructionsScenarioImg.style.display = 'none'

    game.style.background = "url(images/grass.png) bottom center no-repeat";
  }
});

function scenario() {
  if (timeUp === true && score >= 10) {
    instructionsScenario.style.display = 'none';
    instructionsScenarioImg.style.display = 'none';

    winScenario.style.display = 'block';
    winScenarioImg.style.display = 'block';

    loseScenario.style.display = 'none';
    loseScenarioImg.style.display = 'none';

    game.style.background = "rgba(255,255,255,0.8)";
  } else {
    instructionsScenario.style.display = 'none';
    instructionsScenarioImg.style.display = 'none';

    winScenario.style.display = 'none';
    winScenarioImg.style.display = 'none';

    loseScenario.style.display = 'block';
    loseScenarioImg.style.display = 'block';

    game.style.background = "rgba(255,255,255,0.8)";
  }
};