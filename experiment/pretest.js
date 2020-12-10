/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
 

/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


  const myQuestions = [
    {
      question: "Which among the following factors affect/s the output voltage of a regulated power supply?",  ///// Write the question inside double quotes
      answers: {
        a: "Load current",                  ///// Write the option 1 inside double quotes
        b: "Input voltage",                  ///// Write the option 2 inside double quotes
        c: "Temperature",                  ///// Write the option 3 inside double quotes
        d: "All of the above"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
    },

    {
     question: "Due to operation of series pass transistor in an active region of linear voltage regulator, ___________",  ///// Write the question inside double quotes
      answers: {
        a: "The ripple contents in o/p voltage waveform is very low",                  ///// Write the option 1 inside double quotes
        b: "Then there is no necessity of using high speed transitor",                  ///// Write the option 2 inside double quotes
        c: "Both a and b",                  ///// Write the option 3 inside double quotes
        d: "None of the above"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },


    {
     question: "Which performance parameter of a regulator is defined as the change in regulated load voltage due to variation in line voltage in a specified range at a constant load current?",  ///// Write the question inside double quotes
      answers: {
        a: "Load regulation",                  ///// Write the option 1 inside double quotes
        b: "Line regulation",                  ///// Write the option 2 inside double quotes
        c: "Temperature stability factor",                  ///// Write the option 3 inside double quotes
        d: "None of these"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "b"                ///// Write the correct option inside double quotes
    }, 


    {
     question: "State the reason for thermal shutdown of IC regulator?",  ///// Write the question inside double quotes
      answers: {
        a: "Spikes in temperature",                  ///// Write the option 1 inside double quotes
        b: "Decrease in temperature",                  ///// Write the option 2 inside double quotes
        c: "Fluctuation in temperature",                  ///// Write the option 3 inside double quotes
        d: "Increase in temperature"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
    }, 


    {
     question: "Which of the following is not a characteristic of adjustable voltage regulators?",  ///// Write the question inside double quotes
      answers: {
        a: "Non-versatile",                  ///// Write the option 1 inside double quotes
        b: "Better performance",                  ///// Write the option 2 inside double quotes
        c: "Increased reliability",                  ///// Write the option 3 inside double quotes
        d: "None of the mentioned"                   ///// Write the option 4 inside double quotes
      },
      correctAnswer: "a"                ///// Write the correct option inside double quotes
    },                                   ///// To add more questions, copy the section below 
    									                  ///// this line


    /* To add more MCQ's, copy the below section, starting from open curly braces ( { )
        till closing curly braces comma ( }, )

        and paste it below the curly braces comma ( below correct answer }, ) of above 
        question

    Copy below section

    {
      question: "This is question n?",
      answers: {
        a: "Option 1",
        b: "Option 2",
        c: "Option 3",
        d: "Option 4"
      },
      correctAnswer: "c"
    },

    Copy above section

    */




  ];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////