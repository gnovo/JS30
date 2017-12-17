const holes = document.querySelectorAll('.hole'),
  scoreBoard = document.querySelector('.score'),
  moles = document.querySelectorAll('.mole'),
  hammerSound = document.querySelector('.hammer-sound');

let lastHole,
  timeUp = false,
  score = 0
  highscore = localStorage.getItem("highscore");

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
  // document.getElementById("high-score").innerHTML = localStorage.getItem("highscore");
  peep();
  setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  highScore();
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
  hammerSound.play();
}

moles.forEach(mole => mole.addEventListener('click', bonk));
highScore();