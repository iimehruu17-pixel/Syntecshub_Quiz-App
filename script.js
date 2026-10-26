
const getQues = document.querySelector(".ques");
const buttons = document.querySelectorAll(".btn");
const nxtButton = document.querySelector(".next-btn");

let currentIdx = 0;
let score = 0;
let answered = false;

const questions = [
    {
        question: "What is the brain of a computer?",
        answers: [
            { text: "CPU", correct: true },
            { text: "Mouse", correct: false },
            { text: "Keyboard", correct: false },
            { text: "Monitor", correct: false }
        ]
    },
    {
        question: "Which language is used for web styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "C++", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "<>", correct: false },
            { text: "**", correct: false }
        ]
    },
    {
        question: "Which tag creates the largest heading in HTML?",
        answers: [
            { text: "<h6>", correct: false },
            { text: "<head>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<title>", correct: false }
        ]
    },
    {
        question: "Which method converts JSON into a JavaScript object?",
        answers: [
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.parse()", correct: true },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.object()", correct: false }
        ]
    },
    {
        question: "Which loop runs while a condition is true?",
        answers: [
            { text: "if", correct: false },
            { text: "switch", correct: false },
            { text: "while", correct: true },
            { text: "break", correct: false }
        ]
    },
    {
        question: "Which data type stores true or false?",
        answers: [
            { text: "String", correct: false },
            { text: "Boolean", correct: true },
            { text: "Number", correct: false },
            { text: "Array", correct: false }
        ]
    },
    {
        question: "Which operator is used for addition?",
        answers: [
            { text: "-", correct: false },
            { text: "*", correct: false },
            { text: "+", correct: true },
            { text: "/", correct: false }
        ]
    },
    {
        question: "Which method removes the last array element?",
        answers: [
            { text: "push()", correct: false },
            { text: "pop()", correct: true },
            { text: "shift()", correct: false },
            { text: "unshift()", correct: false }
        ]
    },
    {
        question: "Which HTML tag inserts a line break?",
        answers: [
            { text: "<p>", correct: false },
            { text: "<hr>", correct: false },
            { text: "<br>", correct: true },
            { text: "<line>", correct: false }
        ]
    },
    {
        question: "Which keyword is used to define a function?",
        answers: [
            { text: "function", correct: true },
            { text: "method", correct: false },
            { text: "define", correct: false },
            { text: "func", correct: false }
        ]
    },
    {
        question: "Which method selects the first matching CSS selector?",
        answers: [
            { text: "getElementById()", correct: false },
            { text: "querySelector()", correct: true },
            { text: "querySelectorAll()", correct: false },
            { text: "createElement()", correct: false }
        ]
    }
];

function showQuestion() {
    resetState();

    const currentQues = questions[currentIdx];

    getQues.textContent =
        `${currentIdx + 1}. ${currentQues.question}`;

    buttons.forEach((button, i) => {
        button.textContent = currentQues.answers[i].text;
        button.style.display = "block";
    });
}

function resetState() {
    answered = false;
    nxtButton.style.display = "none";

    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
        delete button.dataset.correct;
    });
}

function selectAnswer(event) {
    if (answered) return;

    answered = true;

    const selectedButton = event.currentTarget;
    const currentQues = questions[currentIdx];
    const selectedIndex = Array.from(buttons).indexOf(selectedButton);
    const selectedAnswer = currentQues.answers[selectedIndex];

    if (selectedAnswer.correct) {
        score++;
    }

    buttons.forEach((button, i) => {
        if (currentQues.answers[i].correct) {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }

        button.disabled = true;
    });

    nxtButton.style.display = "block";
}

buttons.forEach(button => {
    button.addEventListener("click", selectAnswer);
});

nxtButton.addEventListener("click", () => {
    if (currentIdx < questions.length - 1) {
        currentIdx++;
        showQuestion();
    } else if (currentIdx === questions.length - 1) {
        showResult();
    } else {
        currentIdx = 0;
        score = 0;
        nxtButton.textContent = "Next";
        showQuestion();
    }
});

function showResult() {
    resetState();

    getQues.textContent =
        `Quiz Finished! Your score is ${score}/${questions.length}`;

    buttons.forEach(button => {
        button.style.display = "none";
    });

    nxtButton.textContent = "Play Again";
    nxtButton.style.display = "block";

    currentIdx = questions.length;
}

showQuestion();
