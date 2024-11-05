const questions = [
  {
    question: "What is Your name",
    answers: [
      { text: "Arnav", correct: true },
      { text: "Alec", correct: false },
      { text: "Aron", correct: false },
      { text: "Ava", correct: false },
    ],
  },
  {
    question: "Where do you Live",
    answers: [
      { text: "Delhi", correct: false },
      { text: "Goa", correct: false },
      { text: "bengaluru", correct: true },
      { text: "Mumbai", correct: false },
    ],
  },
  {
    question: "What is your Country?",
    answers: [
      { text: "India", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "USA", correct: false },
    ],
  },
  {
    question: "Favourite Sports",
    answers: [
      { text: "Football", correct: false },
      { text: "Cricket", correct: false },
      { text: "Tennis", correct: false },
      { text: "Formula 1", correct: true },
    ],
  }
];
const questionElment = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const NextButton = document.getElementById("next-btn");

let score = 0;
let currentQuestionIndex = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    NextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion()
{
  resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElment.innerHTML = questionNo+"." + " " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
       
      }
      button.addEventListener('click',selectAnswer,false)

    });
}

function resetState() {
  NextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect)
  {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled= true;
  });
  NextButton.style.display = "block";
}

function showScore()
{
  resetState();
  questionElment.innerHTML = `You scored ${score} out of ${questions.length}`
  NextButton.innerHTML = "Play Again"
  NextButton.display = "block";
}

function handlenextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  }
  else {
    showScore();
  }
}
NextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handlenextButton();
  }
  else {
    startQuiz();
  }
},false)
startQuiz();