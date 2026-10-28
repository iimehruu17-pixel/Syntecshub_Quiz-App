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
let ques = document.querySelector('.ques');
let ans = document.querySelector('.ans');
let ansbtns = document.querySelectorAll('.btn');
let next = document.querySelector('.next-btn');
let result = document.querySelector('.result');
let box = document.querySelector('#heading');
let scr = document.querySelector('.score');
let restart = document.querySelector('.Restart');
let score = 0;
let currentIndex = 0;
let answeredByUser = false;
function showQuestion(){
    restart.style.display='none';
    scr.style.display='none';
    let currentQuestion = questions[currentIndex];
    ques.innerText = `${currentIndex + 1}. ${currentQuestion.question}`;
    ansbtns.forEach((btn,i) => {
        btn.innerText = currentQuestion.answers[i].text; 
    });
}
ansbtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        if (answeredByUser) {
            return;
        }
        answeredByUser = true;
        next.style.display = 'block';
        let currentQuestion = questions[currentIndex];
        ansbtns.forEach((button, index) => {
            if (currentQuestion.answers[index].correct) {
                button.classList.add('correct');
            }
        });
        if (currentQuestion.answers[i].correct) {
            score++;
        } else {
            btn.classList.add('incorrect');
        }
    });
});
next.addEventListener('click',()=>{
    answeredByUser = false;
    next.style.display = 'none';
    currentIndex++;
    ansbtns.forEach((btn)=>{
        btn.classList.remove('correct','incorrect');
    })
    if(currentIndex >= questions.length){
         showResult();
         return;
    }
    showQuestion();
})
function showResult(){
    box.style.display ="none";
    ans.style.display ="none";
    scr.style.display='block';
    ques.innerHTML = "<h2><b>Quiz Completed!</b></h2><h3>ScoreBoard</h3>";
    scr.innerHTML = `<h4>Your Score : ${score} / ${questions.length}</h4>`;
    restart.style.display = "block";
    restart.addEventListener('click',()=>{
    score = 0;
    currentIndex = 0;
    answeredByUser = false;
    box.style.display ="block";
    ans.style.display='block';
    showQuestion();
     ansbtns.forEach((btn)=>{
        btn.classList.remove('correct','incorrect');
    })
    })
}
showQuestion();
