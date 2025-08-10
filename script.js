const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Machine Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: 1
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: 0
    }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

function startQuiz() {
    startBtn.classList.add("hide");
    quizBox.classList.remove("hide");
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        }
    }, 1000);

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(index));
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    clearInterval(timer);
}

function endQuiz() {
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    resultBox.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}
