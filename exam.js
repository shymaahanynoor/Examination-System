
var objname = JSON.parse(localStorage.getItem("name")) || {};
function Arrayrandom(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function Answer(text, correct) {
this.text = text;

  this.correct = correct;
}

// Constructor function for question objects
function Question(question, answers) {
  this.question = question;
  this.answers = answers;
}

// Create instances of question objects using the constructors
const question1 = new Question(
  "Which is the largest animal in the world?",
  [
    new Answer("Shark", false),
    new Answer("Blue whale", true),
    new Answer("Elephant", false),
    new Answer("Giraffe", false),
  ]
);

const question2 = new Question(
  "Which is the smallest continent in the world?",
  [
    new Answer("Asia", false),
    new Answer("Australia", true),
    new Answer("Arctic", false),
    new Answer("Africa", false),
  ]
);

const question3 = new Question(
  "What is the correct HTML element for inserting a line break?",
  [
    new Answer("break", false),
    new Answer("lb", false),
    new Answer("br", true),
    new Answer("h", false),
  ]
);

// Store the questions in an array
const questions = [question1, question2, question3];

const questionElement = document.getElementById("questions");
const answerButton = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-button");
const addAnswerDiv = document.querySelector(".addanswer");
const markAnswer = document.getElementById("mark-button");
const subAnswer = document.getElementById("sub");
const prevanswer = document.getElementById("per-button");
const questionNumber = document.getElementById("question-number");
const progress = document.getElementById("progress");
const countdownContainer = document.getElementById("countdown-container");
const cnve = document.getElementById("canvas");
const show = document.getElementById("showbitton");


const answeredQuestions = {};

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion(answered = {}) {
  resetState();
  let currentQuestion = answered.index !== undefined ? questions[answered.index] : questions[currentQuestionIndex];
  if (answered.index !== undefined) {
    currentQuestionIndex = answered.index;
  }
  let questionNo = currentQuestionIndex + 1;
  progress.style.width = `${currentQuestionIndex * 100 / questions.length}%`
  questionNumber.innerHTML = Math.min(questionNo, questions.length);
  questionElement.innerHTML = ` ${currentQuestion.question}`;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answered.text) {
      if (answer.text === answered.text) {
        button.classList.add("selected-bg");
      }
      button.disabled = false;
    }
    else {
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    }
    answerButton.appendChild(button);

  });

  nextButton.innerHTML = `Next`;
  if (currentQuestionIndex === 0) {
    prevanswer.style.display = "none";
  }
}

function resetState() {
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  const allButtons = answerButton.querySelectorAll('button');
  allButtons.forEach(button => {
    if (button.classList.contains('selected-bg')) {
      button.classList.remove('selected-bg');
    }
  });

  selectBtn.classList.add("selected-bg");

  answeredQuestions[`${currentQuestionIndex}`] = { isCorrect, text: e.target.textContent };

  if (isCorrect) {
    score++;
  }
}


function showScore() {
  clearTimeout(timer)
  document.body.innerHTML = `<div class="mestimeout"><p> ${objname.firstName} ${objname.lastName}</p>
  <p>Your score: ${score} out of ${questions.length}</p></div>`
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    if (currentQuestionIndex === 1) {
      prevanswer.style.display = "inline-block";
    }
    showQuestion(answeredQuestions[currentQuestionIndex]);
    applyPreviousAnswer();
  } else {
    questionElement.innerHTML = 'No more questions! If you are sure, click submit';
    progress.style.width = `100%`
    answerButton.style.display = "none";
    nextButton.style.display = "none";
    markAnswer.style.display = "none";
    prevanswer.style.display = "inline-block";
    addAnswerDiv.style.display = "none";
    questionNumber.style.display = "none";
    cnve.style.display = "none";


  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

let markedQuestions = []; // Array to store indices of marked questions

function addQuestion() {
  const questionNo = currentQuestionIndex + 1;

  // Check if the question is already marked
  if (markedQuestions.includes(currentQuestionIndex)) {
    // If the question is already marked, do not proceed
    alert(`Question ${questionNo} is already marked`);
    return; // Exit the function early
  } else {
    const questionParagraph = document.createElement("p");
    questionParagraph.textContent = `Question number ${questionNo} `;
    addAnswerDiv.appendChild(questionParagraph);
    questionParagraph.classList.add("prg");

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
   
    questionParagraph.appendChild(closeButton);

    closeButton.addEventListener("click", function () {
      questionParagraph.style.display = "none"
      //  show.style.display="inline-block";
      markedQuestions = markedQuestions.filter((el, index) => index + 1 !== questionNo);
    });
 


    let question = {};
    if (answeredQuestions[currentQuestionIndex]) {
      question = {
        ...answeredQuestions[currentQuestionIndex],
        index: currentQuestionIndex
      };
    } else {
      question = { index: currentQuestionIndex };
    }

    questionParagraph.addEventListener("click", function () {
      showQuestion(question);
    });

    // Mark the question and add its index to the markedQuestions array
    console.log(`Question ${questionNo} marked.`);
    markedQuestions.push(currentQuestionIndex);
  }
}

function previousAnswer() {
  currentQuestionIndex--;

  if (currentQuestionIndex >= 0) {
    showQuestion(answeredQuestions[`${currentQuestionIndex}`]);
    applyPreviousAnswer();
  }

  if (currentQuestionIndex === 0) {
    prevanswer.style.display = "none";
  }

  nextButton.style.display = "inline-block";
  answerButton.style.display = "block";
  questionNumber.style.display = "inline-block";
  markAnswer.style.display = "inline-block";
  addAnswerDiv.style.display = "inline-block";
}

function applyPreviousAnswer() {
  const prevAnswer = answeredQuestions[`${currentQuestionIndex}`];
  if (prevAnswer && answerButton.childNodes.length > 0) {
    const buttons = answerButton.childNodes;
    buttons.forEach((button) => {
      button.disabled = false; //all button has abilty
      if (button.textContent === prevAnswer.text) {
        button.classList.add("selected-bg");
      } else {
        button.classList.remove("selected-bg");
      }
      button.addEventListener("click", selectAnswer); // to choose
    });
  }
}

markAnswer.addEventListener("click", addQuestion);
subAnswer.addEventListener("click", showScore);
prevanswer.addEventListener("click", previousAnswer);
markAnswer.addEventListener("click", addQuestion);
Arrayrandom(questions);
startQuiz();


let startTime = new Date().getTime();
let quarterHour = 20 * 1000;
let endTime = startTime + quarterHour;

let timer = setInterval(() => {
let currentTime = new Date().getTime();
let timeRemaining = endTime - currentTime;

  let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.querySelector(".countdown").innerHTML = `${minutes} minutes ${seconds} seconds`;

  // Calculate and update the width of the progress indicator
  let progress = 100 - (timeRemaining / quarterHour) * 100;
  progress = Math.min(100, progress);
  document.getElementById("progressIndicator").style.width = `${progress}%`;

  if (timeRemaining <= 0) {
    clearInterval(timer);

    document.body.style.backgroundColor = "#407cff86";
    document.body.style.marginTop = "20%"
    document.body.style.color = "red";
    document.body.style.textAlign = "center";
    document.body.style.fontSize = "30px";
    document.body.style.fontWeight = "600";
    document.body.innerHTML = `Time is out ${objname.firstName} ${objname.lastName} !!!`;
    document.body.innerHTML = `<div class="mestimeout"><p>Time is out ${objname.firstName} ${objname.lastName} !!!</p>
    <p>Your score: ${score}</p></div>`

  }
}, 1000);
