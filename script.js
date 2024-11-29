// Updated JavaScript Code
// Do not change code below this line
const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
      answer: "Everest",
    },
    {
      question: "What is the largest country by area?",
      choices: ["Russia", "China", "Canada", "United States"],
      answer: "Russia",
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];
  
  // HTML element for displaying questions
  const questionsElement = document.getElementById("quiz-container");
  const submitButton = document.getElementById("submit-btn");
  
  // Load user's progress from sessionStorage or initialize an empty object
  let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};
  
  // Render the quiz questions
  function renderQuestions() {
    questionsElement.innerHTML = ""; // Clear previous content
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionElement = document.createElement("div");
      const questionText = document.createElement("p");
      questionText.textContent = `${i + 1}. ${question.question}`;
      questionElement.appendChild(questionText);
  
      // Create radio buttons for choices
      for (let j = 0; j < question.choices.length; j++) {
        const choice = question.choices[j];
        const choiceLabel = document.createElement("label");
        const choiceElement = document.createElement("input");
        choiceElement.setAttribute("type", "radio");
        choiceElement.setAttribute("name", `question-${i}`);
        choiceElement.setAttribute("value", choice);
  
        // Check previously selected answer
        if (userAnswers[`question-${i}`] === choice) {
          choiceElement.setAttribute("checked", true);
        }
  
        // Add event listener to save progress on selection
        choiceElement.addEventListener("change", (event) => {
          userAnswers[`question-${i}`] = event.target.value;
          sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        });
  
        choiceLabel.appendChild(choiceElement);
        choiceLabel.appendChild(document.createTextNode(choice));
        questionElement.appendChild(choiceLabel);
        questionElement.appendChild(document.createElement("br"));
      }
      questionsElement.appendChild(questionElement);
    }
  }
  
  // Calculate and display the user's score
  function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[`question-${i}`] === questions[i].answer) {
        score++;
      }
    }
    return score;
  }
  
  // Handle quiz submission
  submitButton.addEventListener("click", () => {
    const score = calculateScore();
    alert(`Your score is ${score} out of ${questions.length}.`);
    localStorage.setItem("score", score); // Save score in localStorage
    sessionStorage.removeItem("progress"); // Clear progress after submission
  });
  
  // Initial rendering of the quiz
  renderQuestions();
  