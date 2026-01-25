document.addEventListener("DOMContentLoaded"), () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    function showQuestion() {
  const question = quiz.getQuestion();
  questionContainer.textContent = question.text;
  const progress = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  questionCounter.textContent = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
  choiceContainer.innerHTML = '';
  question.choices.forEach((choice, index) => {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'choice';
    radio.id = `choice-${index}`;
    radio.value = choice;
    const label = document.createElement('label');
    label.htmlFor = `choice-${index}`;
    label.textContent = choice;

    const choiceDiv = document.createElement('div');
    choiceDiv.classList.add('choice');
    choiceDiv.appendChild(radio);
    choiceDiv.appendChild(label);
    
    choiceContainer.appendChild(choiceDiv);
  });
}
    
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

  }

    let selectedAnswer; // A variable to store the selected answer value
    function nextButtonHandler() {
  // Get all radio inputs
  const choices = document.querySelectorAll('input[name="choice"]');
  let selectedAnswer = null;
  
  // Find selected answer
  choices.forEach(choice => {
    if (choice.checked) {
      selectedAnswer = choice.value;
    }
  });
  
  // If answer selected
  if (selectedAnswer !== null) {
    // Check if correct
    quiz.checkAnswer(selectedAnswer);
    
    // Move to next question
    quiz.moveToNextQuestion();
    
    if (quiz.hasEnded()) {
      showResults();
    } else {
      showQuestion();
    }
  } else {
    alert('Please select an answer!');
  }
}
  }

function showResults() {
  quizView.style.display = 'none';
  endView.style.display = 'block';
  const score = document.getElementById('score');
  score.textContent = `${quiz.correctAnswers} out of ${quiz.questions.length}`;
}

let timer;

function startTimer() {
  timer = setInterval(() => {
    quiz.timeRemaining--;
    
    const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    
    if (quiz.timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    }
  }, 1000);
}

function showResults() {
  clearInterval(timer);
  
  quizView.style.display = "none";
  endView.style.display = "flex";
  resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
}

function resetQuizHandler() {
  clearInterval(timer);
  
  quiz.currentQuestionIndex = 0;
  quiz.correctAnswers = 0;
  quiz.timeRemaining = quiz.timeLimit;
  
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  
  startTimer();
  showQuestion();
}