
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A) Hyper Text Markup Language", correct: true },
            { text: "B) High Transfer Machine Language", correct: false },
            { text: "C) Hyper Tool Multi Language", correct: false },
            { text: "D) Home Text Management Language", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "A) <link>", correct: false },
            { text: "B) <a>", correct: true },
            { text: "C) <href>", correct: false },
            { text: "D) <url>", correct: false }
        ]
    },
    {
        question: "Which HTML attribute provides alternative text for an image?",
        answers: [
            { text: "A) title", correct: false },
            { text: "B) src", correct: false },
            { text: "C) alt", correct: true },
            { text: "D) href", correct: false }
        ]
    },
    {
        question: "Which CSS property changes the text color?",
        answers: [
            { text: "A) font-style", correct: false },
            { text: "B) background-color", correct: false },
            { text: "C) text-style", correct: false },
            { text: "D) color", correct: true }
        ]
    },
    {
        question: "Which CSS property adds space inside an element's border?",
        answers: [
            { text: "A) margin", correct: false },
            { text: "B) padding", correct: true },
            { text: "C) outline", correct: false },
            { text: "D) spacing", correct: false }
        ]
    },
    {
        question: "Which CSS property makes text bold?",
        answers: [
            { text: "A) font-weight", correct: true },
            { text: "B) text-decoration", correct: false },
            { text: "C) font-style", correct: false },
            { text: "D) text-align", correct: false }
        ]
    },
    {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        answers: [
            { text: "A) const", correct: false },
            { text: "B) static", correct: false },
            { text: "C) let", correct: true },
            { text: "D) fixed", correct: false }
        ]
    },
    {
        question: "What does document.querySelector() do?",
        answers: [
            { text: "A) Creates a new HTML element", correct: false },
            { text: "B) Selects the first element matching a CSS selector", correct: true },
            { text: "C) Deletes an HTML element", correct: false },
            { text: "D) Changes the page title automatically", correct: false }
        ]
    },
    {
        question: "Which method adds an element to the end of an array?",
        answers: [
            { text: "A) push()", correct: true },
            { text: "B) pop()", correct: false },
            { text: "C) shift()", correct: false },
            { text: "D) slice()", correct: false }
        ]
    },
    {
        question: "What is the result of typeof 'Hello' in JavaScript?",
        answers: [
            { text: "A) number", correct: false },
            { text: "B) boolean", correct: false },
            { text: "C) object", correct: false },
            { text: "D) string", correct: true }
        ]
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        answers: [
            { text: "A) JSON.stringify()", correct: false },
            { text: "B) JSON.parse()", correct: true },
            { text: "C) JSON.convert()", correct: false },
            { text: "D) JSON.object()", correct: false }
        ]
    },
    {
        question: "What does addEventListener() do?",
        answers: [
            { text: "A) Adds CSS to an element", correct: false },
            { text: "B) Creates an HTML element", correct: false },
            { text: "C) Registers a function to respond to an event", correct: true },
            { text: "D) Removes an element from the DOM", correct: false }
        ]
    }
];

// HTML elements
const getQues = document.querySelector(".ques");
const getAns = document.querySelector(".ans");
const nxtButton = document.querySelector(".next-btn");

// Quiz variables
let currentIdx = 0;
let score = 0;
let answered = false;

// Start the quiz
function startQuiz() {
    currentIdx = 0;
    score = 0;
    answered = false;

    nxtButton.innerHTML = "Next";
    showQuestion();
}

// Display question and answers
function showQuestion() {
    resetState();

    const currentQues = questions[currentIdx];

    getQues.innerHTML = `${currentIdx + 1}. ${currentQues.question}`;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAns);

        getAns.appendChild(button);
    });
}

// Clear old answers
function resetState() {
    getAns.innerHTML = "";
    nxtButton.style.display = "none";
    answered = false;
}

// Select an answer
function selectAns(evt) {
    if (answered) return;

    answered = true;

    const selectedBtn = evt.currentTarget;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Highlight the correct answer
    Array.from(getAns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    // Change button text on the last question
    if (currentIdx === questions.length - 1) {
        nxtButton.innerHTML = "Show Result";
    } else {
        nxtButton.innerHTML = "Next";
    }

    nxtButton.style.display = "block";
}

// Next question or show result
function handleNextButton() {
    if (!answered) return;

    if (currentIdx < questions.length - 1) {
        currentIdx++;
        showQuestion();
    } else {
        showScore();
    }
}

// Display final score
function showScore() {
    resetState();

    const percentage = Math.round((score / questions.length) * 100);

    getQues.innerHTML = `Your Score: ${score}/${questions.length}`;

    let message;

    if (percentage === 100) {
        message = "Excellent! Perfect score!";
    } else if (percentage >= 70) {
        message = "Great job! Well done!";
    } else if (percentage >= 40) {
        message = "Good effort! Keep practicing!";
    } else {
        message = "Keep learning! You can do better!";
    }

    getAns.innerHTML = `
        <p class="result-message">${percentage}%</p>
        <p class="result-message">${message}</p>
    `;

    nxtButton.innerHTML = "Play Again";
    nxtButton.style.display = "block";
}

// Next button click
nxtButton.addEventListener("click", function () {
    if (nxtButton.innerHTML === "Play Again") {
        startQuiz();
    } else {
        handleNextButton();
    }
});

// Run quiz
startQuiz();
