class Question {
    constructor (text, choices, answer, difficulty) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices() {
      for ( let i = this.choices.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]];
       }
    }
}

class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.correctQuestionIndex = 0; 
    }
    getQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    moveToNextQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    shuffleQuestion() { 
        for (let i = this.questions.length -1; i - 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }

    checkAnswer(answer) {
        const currentQuestion = this.getQuestion();
        if (answer === currentQuestion.answer) {
            this.correctAnswers++;
            return true;
        }
        return false;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }


  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  checkAnswer(answer) {
    const currentQuestion = this.getQuestion();
    if (answer === currentQuestion.answer) {
      this.correctAnswers++;
      return true;
    }
    return false;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(question => 
        question.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    if (this.questions.length === 0) return 0;
    
    const totalDifficulty = this.questions.reduce((sum, question) => {
      return sum + question.difficulty;
    }, 0);
    
    return totalDifficulty / this.questions.length;
  }
}


