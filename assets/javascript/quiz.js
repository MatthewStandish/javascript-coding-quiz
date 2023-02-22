const questions = [
  {
    question: "What does 'DOM' stand for?",
    options: [
      "Document Object Model",
      "Document Order Model",
      "Digital Order Management",
      "Department of Management",
    ],
    answer: "Document Object Model",
  },
  {
    question: "What keyword declares a variable?",
    options: ["var", "variable", "decl", "let"],
    answer: "var",
  },
  {
    question: "What is the correct syntax for an 'if' statement?",
    options: [
      "if (x == y) {}",
      "if x == y {}",
      "if [x == y] {}",
      "if {x == y}",
    ],
    answer: "if (x == y) {}",
  },
  {
    question: "What is the result of 2 + '2'?",
    options: ["4", "22", "NaN", "Undefined"],
    answer: "22",
  },
  {
    question: "Which method removes the last element from an array?",
    options: [".shift()", ".unshift()", ".pop()", ".push()"],
    answer: ".pop()",
  },
];

const timerElement = document.getElementById("timer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const startButton = document.getElementById("start");

const timerDuration = 60;

let currentQuestionIndex = 0;
let timeLeft = timerDuration;
let score = 0;
let timerInterval;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = currentQuestion.options[i];

    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", function () {
      if (option === currentQuestion.answer) {
        score++;
      } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
          endQuiz();
        }
      }
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    });

    optionsElement.appendChild(button);
  }
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time: ${timeLeft}`;

  if (timeLeft < 0) {
    endQuiz();
  }
}

function startQuiz() {
  startButton.remove();
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion();
}

function endQuiz() {
  clearInterval(timerInterval);

  const initials = prompt("Quiz over! Enter your initials:");

  if (initials) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.href = "high-scores.html";
  }
}

startButton.addEventListener("click", startQuiz);
