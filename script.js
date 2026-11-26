
// ARRAY OF OBJECTS

const questions = [

    {
        question: "1. What is the capital of Somalia?",
        options: ["Hargeisa", "Mogadishu", "Kismayo", "Garowe"],
        answer: "Mogadishu"
    },

    {
        question: "2. Which language runs in a web browser?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: "JavaScript"
    },

    {
        question: "3. Which symbol is used for an array?",
        options: ["{}", "[]", "()", "<>"],
        answer: "[]"
    },

    {
        question: "4. Which keyword creates a constant?",
        options: ["var", "let", "const", "if"],
        answer: "const"
    },

    {
        question: "5. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "6. Which method selects an element by ID?",
        options: [
            "getElementById()",
            "getClass()",
            "queryById()",
            "selectId()"
        ],
        answer: "getElementById()"
    },

    {
        question: "7. Which statement checks a condition?",
        options: ["for", "if", "print", "array"],
        answer: "if"
    },

    {
        question: "8. Which data type stores true or false?",
        options: ["String", "Number", "Boolean", "Array"],
        answer: "Boolean"
    }

];


// VARIABLES

let currentQuestion = 0;
let score = 0;
let answered = false;


// SELECT HTML ELEMENTS

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");

const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");


// START GAME

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    quizScreen.classList.remove("hidden");

    showQuestion();

}


// SHOW QUESTION

function showQuestion() {

    answered = false;

    let q = questions[currentQuestion];

    questionElement.innerText = q.question;

    questionNumber.innerText =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    scoreElement.innerText = "Score: " + score;

    feedbackElement.innerText = "";

    answersElement.innerHTML = "";

    nextBtn.classList.add("hidden");

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";


    // DISPLAY ANSWER OPTIONS

    q.options.forEach(function(option) {

        let button = document.createElement("button");

        button.innerText = option;

        button.addEventListener("click", function() {

            checkAnswer(option, button);

        });

        answersElement.appendChild(button);

    });

}


// CHECK ANSWER USING IF / ELSE

function checkAnswer(selectedAnswer, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    let correctAnswer = questions[currentQuestion].answer;

    let buttons = answersElement.querySelectorAll("button");


    // DISABLE ALL ANSWERS

    buttons.forEach(function(button) {

        button.disabled = true;

        if (button.innerText === correctAnswer) {

            button.classList.add("correct");

        }

    });


    // CHECK SELECTED ANSWER

    if (selectedAnswer === correctAnswer) {

        score++;

        feedbackElement.innerText = "Correct! 🎉";

        feedbackElement.style.color = "green";

    } else {

        selectedButton.classList.add("wrong");

        feedbackElement.innerText =
            "Wrong! Correct answer: " + correctAnswer;

        feedbackElement.style.color = "red";

    }


    // UPDATE SCORE

    scoreElement.innerText = "Score: " + score;

    nextBtn.classList.remove("hidden");

    if (currentQuestion === questions.length - 1) {

        nextBtn.innerText = "Finish Quiz";

    } else {

        nextBtn.innerText = "Next Question";

    }

}


// NEXT QUESTION

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showResult();

    }

}


// SHOW FINAL RESULT

function showResult() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    let percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("finalScore").innerText =
        "Your Score: " + score + " / " + questions.length;

    document.getElementById("percentage").innerText =
        "Percentage: " + percentage + "%";


    // WIN OR LOSE CONDITION

    if (percentage >= 50) {

        document.getElementById("resultTitle").innerText =
            "🏆 YOU WIN!";

        document.getElementById("resultTitle").style.color =
            "green";

        document.getElementById("resultMessage").innerText =
            "Excellent work! You passed the quiz. Keep it up!";

    } else {

        document.getElementById("resultTitle").innerText =
            "😔 TRY AGAIN!";

        document.getElementById("resultTitle").style.color =
            "red";

        document.getElementById("resultMessage").innerText =
            "You did not reach the passing score. Practice and try again!";

    }

}


// RESTART GAME

restartBtn.addEventListener("click", startQuiz);
