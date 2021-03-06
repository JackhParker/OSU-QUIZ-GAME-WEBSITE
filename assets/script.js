var timer = 60;
var runningTimer;
var score = 0;
var username = "";
var qNumber;
var finalScore;
const MAX_HIGH_SCORES = 7;

const startButton = document.getElementById("startButton");
const qContainer = document.getElementById("questionsContainer");
const qElement = document.getElementById("question");
const answerButtons = document.getElementById("answers");
const countdown = document.getElementById("timerArea");
const scoreArea = document.getElementById("scoreArea");
const highScoresButton = document.getElementById("showScoresButton");

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

startButton.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayScores);

function startGame() {
  startButton.classList.add("hide");
  scoreArea.classList.add("hide");
  answerButtons.classList.remove("hide");
  qNumber = 0;
  qContainer.classList.remove("hide");
  scoreArea.innerHTML = "";
  startTimer();
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  showQuestion(questions[qNumber]);
}

function showQuestion(question) {
  qElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function startTimer() {
  countdown.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
    gameOver();
  } else {
    timer -= 1;
    runningTimer = setTimeout(startTimer, 1000);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  if (!selectedButton.dataset.correct) {
    timer = timer - 10;
    console.log(timer);
  }
  if (qNumber == questions.length - 1) {
    gameOver();
  } else {
    clearQuestion();
    qNumber++;
    showQuestion(questions[qNumber]);
    console.log(score);
  }
}

function clearQuestion() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function gameOver() {
  clearInterval(runningTimer);
  countdown.innerHTML = "Finished";
  clearQuestion();
  showResults();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");
  timer = 60;
  score = 0;
}

function showResults() {
  finalScore = timer;
  if (finalScore < 0) {
    finalScore = 0;
  }
  qElement.innerText = "";
  scoreArea.classList.remove("hide");
  answerButtons.classList.add("hide");
  scoreArea.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn btn" onclick="submitScores(event)" disabled>Save</button>`;
  username = document.getElementById("initials");
  saveButton = document.getElementById("save-btn");
  username.addEventListener("keyup", function () {
    saveButton.disabled = !username.value;
  });
}

function submitScores(e) {
  const score = {
    score: finalScore,
    name: username.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(MAX_HIGH_SCORES);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  displayScores();
}


function displayScores() {
  clearInterval(runningTimer);
  countdown.innerHTML = "";
  clearQuestion();
  qElement.innerText = "";
  scoreArea.classList.remove("hide");

  scoreArea.innerHTML = `<h2>High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="scoresList">${score.name} - ${score.score}</li>`;
    })
    .join("");
  startButton.classList.remove("hide");
  highScoresButton.classList.add("hide");
}


function clearScores() {
  highScores = [];
  highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
  document.getElementById("clearScores").classList.add("hide");
}


const questions = [
  {
    question: "What is the closest part of the US to Africa?",
    answers: [
      { text: "Florida", correct: false },
      { text: "Main", correct: true },
      { text: "New York", correct: false },
      { text: "North Carolina", correct: false }
    ]
  },
  {
    question: "What is the rarest color of Diamonds?",
    answers: [
      { text: "Yellow", correct: false },
      { text: "Blue", correct: false },
      { text: "Clear", correct: false },
      { text: "Red", correct: true }
    ]
  },
  {
    question: "How long is the life span of a Parrot?",
    answers: [
      { text: "Over 40 years", correct: true },
      { text: "Under 40 years", correct: false }
    ]
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Mississippi", correct: false },
      { text: "Yellow", correct: false },
      { text: "Nile", correct: true },
      { text: "Amazon", correct: false }
    ]
  },
  {
    question: "What is the Capital of New Zealand?",
    answers: [
      { text: "Auckland", correct: true },
      { text: "Wellington", correct: false },
      { text: "Queensland", correct: false },
      { text: "Rotorua", correct: false }
    ]
  },
  {
    question: "Who is the Oldest Member to sign the Deceleration of Independence?",
    answers: [
      { text: "John Hancock", correct: false },
      { text: "Thomas Jefferson", correct: false },
      { text: "Benjamin Franklin", correct: true },
      { text: "John Adams", correct: false }
    ]
  },
  {
    question: "Where is the worlds deepest lake?",
    answers: [
      { text: "Russia", correct: true },
      { text: "India", correct: false },
      { text: "USA", correct: false },
      { text: "Norway", correct: false }
    ]
  },
];