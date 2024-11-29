// Questions array
const questions = [
    {
        question:  "1 What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0,
    },
    {
        question: "2.What is the highest mountain in the world?",
        options: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
        correct: 0,
    },
    {
        question: "3. What is the largest country by area?",
        options: ["Russia", "China", "Canada", "United States"],
        correct: 0,
    },
    {
        question: "4. Which is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars"],
        correct: 1,
    },
    {
        question: "5. What is the capital of Canada?",
        options: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
        correct: 3,
    },
];





// Load progress from session storage
const loadProgress = () => {
    const progress = JSON.parse(sessionStorage.getItem("progress")) || [];
    return progress;
};

// Save progress to session storage
const saveProgress = (progress) => {
    sessionStorage.setItem("progress", JSON.stringify(progress));
};

// Save score to local storage
const saveScore = (score) => {
    localStorage.setItem("score", score);
};

// Render the quiz
const renderQuiz = () => {
    const quizContainer = document.getElementById("quiz");
    const progress = loadProgress();

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        // Display question text
        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionDiv.appendChild(questionText);

        // Display options
        question.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement("label");
            optionLabel.innerHTML = `
                <input type="radio" name="question-${index}" value="${optionIndex}" ${
                progress[index] === optionIndex ? "checked" : ""
            }>
                ${option}
            `;
            optionLabel.addEventListener("change", () => {
                progress[index] = optionIndex;
                saveProgress(progress);
            });
            questionDiv.appendChild(optionLabel);
        });

        quizContainer.appendChild(questionDiv);
    });
};

// Calculate and display the score
const submitQuiz = () => {
    const progress = loadProgress();
    let score = 0;

    questions.forEach((question, index) => {
        if (progress[index] === question.correct) {
            score++;
        }
    });

    // Display score
    const scoreDiv = document.getElementById("score");
    scoreDiv.textContent = `Your score is ${score} out of ${questions.length}.`;

    // Save score 
    saveScore(score);
};

// Initialize the quiz
const initQuiz = () => {
    renderQuiz();

    // Submit button 
    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submitQuiz);

    // Show stored score if exists
    const storedScore = localStorage.getItem("score");
    if (storedScore !== null) {
        const scoreDiv = document.getElementById("score");
        scoreDiv.textContent = `Last saved score: ${storedScore} out of ${questions.length}.`;
    }
};


document.addEventListener("DOMContentLoaded", initQuiz);
