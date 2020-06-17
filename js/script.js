let nextQuestion = 0;
let shuffledQuestions;
const pointsPerWrong = 10;
let score;
let timerId;

// document elements

// start page
const startButton = document.getElementById("start-button");
const startPage = document.getElementById("start-prompt");

// quizPage
const quizPage = document.getElementById("quiz");

const question = document.querySelector(".question");
const answerList = document.querySelector(".answers-list");
const scoreElement = document.getElementById("score");
const scoreFinalElement = document.getElementById("score-final");
const timer = document.getElementById("time-remaining");

// Final score Page
const submitInitials = document.getElementById("submit-initials");
const initials = document.getElementById("initials");
const finalScore = document.getElementById("final-score");

// Final ranking page

const cornifyBtn = document.getElementById("cornify-btn");
const rankingList = document.getElementById("ranking-list");
const finalRanking = document.getElementById("final-ranking");
const errorEnterInitials = document.getElementById("error-enter-initials");

// const retakeBtn = document.querySelector(".retake");

const startQuiz = () => {
  console.log("start quiz");
  // set the timer and score

  time = questions.length * 15;
  score = time;

  nextQuestion = 0;

  // hide the start quiz prompt and show the first questions

  startPage.classList.add("hide");
  finalScore.classList.add("hide");
  finalRanking.classList.add("hide");
  // hide the error message
  errorEnterInitials.classList.add("hide");

  //  show the quiz
  quizPage.classList.remove("hide");
  // shuffle questions in a random order
  shuffledQuestions = questions.sort(() => {
    return Math.random() - 0.5;
  });
  setNextQuestion();

  // start timer and begin the countdown and scoring
  timerId = setInterval(countDown, 1000);
};

countDown = () => {
  // update time
  time--;
  score = time;
  timer.textContent = time;
  setScore();
  if (time <= 0) {
    endQuiz();
  }
};
const setScore = () => {
  scoreElement.innerHTML = score;
  scoreFinalElement.innerHTML = score;
};
const endQuiz = () => {
  // stop timer
  clearInterval(timerId);
  // hide questions
  quiz.classList.add("hide");
  // show summary
  finalScore.classList.remove("hide");
  //  store score
};

const setNextQuestion = () => {
  if (nextQuestion < shuffledQuestions.length) {
    let markup = shuffledQuestions[nextQuestion].choices.map((choice) => {
      return `<li class="list-group-item"><button class="btn btn-primary btn-block" 
     onclick="selectAnswer()" ${
       choice.correct ? 'data-correct="correct"' : ""
     }>${choice.text}</button></li>`;
    });
    question.innerHTML = shuffledQuestions[nextQuestion].title;
    answerList.innerHTML = markup.join("");

    nextQuestion++;
  } else {
    endQuiz();
    // stop timer
    // show score
  }
};

const selectAnswer = () => {
  if (event.target.dataset.correct === "correct") {
    setNextQuestion();
  } else {
    time -= pointsPerWrong;
  }
};

const storeInitials = () => {
  let initial = initials.value.trim();

  // make sure value wasn't empty
  if (initial !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    let highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    let newScore = {
      score: time,
      initials: initial,
    };

    // save to localstorage
    highscores.push(newScore);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    getRankings();
  } else {
    // show prompt please enter initials

    errorEnterInitials.classList.remove("hide");
  }
};
const getRankings = () => {
  finalScore.classList.add("hide");
  finalRanking.classList.remove("hide");

  highscores = JSON.parse(localStorage.getItem("highscores")).sort((a, b) =>
    a.score < b.score ? 1 : a.score > b.score ? -1 : 0
  );

  let myscores = highscores.map((rank) => {
    return `<li class="list-group-item">${rank.initials} ${rank.score}</li>`;
  });

  rankingList.innerHTML = myscores.join("");
};

startButton.addEventListener("click", startQuiz);
submitInitials.addEventListener("click", storeInitials);
// retakeBtn.addEventListener("click", startQuiz); //  set in html
cornifyBtn.addEventListener("click", () => {
  cornify_add();
});
// uncomment to test get ranking section
// getRankings();
