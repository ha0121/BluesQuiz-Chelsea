// JS for option selection
const quizData = [
    {
        question: "What is Chelsea's home stadium called?",
        options: [
            "Old Trafford",
            "Stamford Bridge",
            "Wembley",
            "Emirates",
            "Etihad Stadium"
        ],
        correct: 1
    },
    {
        question: "Which color is associated with Chelsea’s home kit?",
        options: [
            "Red",
            "White",
            "Blue",
            "Yellow",
            "Green"
        ],
        correct: 2
    },
    {
        question: "Who was Chelsea’s captain during the 2012 Champions League final?",
        options: [
            "Petr Čech",
            "Frank Lampard",
            "John Obi Mikel",
            "Ramires",
            "John Terry"
        ],
        correct: 1
    },
    {
        question: "Who was Chelsea’s manager when they first won the Premier League in 2004–05?",
        options: [
            "Claudio Ranieri",
            "Carlo Ancelotti",
            "José Mourinho",
            "Avram Grant",
            "Roberto Di Matteo"
        ],
        correct: 2
    },
    {
        question: "Which Chelsea player was known for the celebration \"knee slide with arms wide open\" ?",
        options: [
            "Fernando Torres",
            "Eden Hazard",
            "Didier Drogba",
            "Nicolas Anelka",
            "Frank Lampard"
        ],
        correct: 2
    },
    {
        question: "How many Champions League titles has Chelsea won (as of 2025)?",
        options: [
            "1",
            "2",
            "3",
            "4",
            "5"
        ],
        correct: 1
    },
    {
        question: "Which year did Eden Hazard leave Chelsea for Real Madrid?",
        options: [
            "2017",
            "2018",
            "2019",
            "2020",
            "2016"
        ],
        correct: 2
    },
    {
        question: "Chelsea won the Europa League in 2013 by beating which team in the final?",
        options: [
            "Benfica",
            "Sevilla",
            "Villarreal",
            "Inter Milan",
            "Arsenal"
        ],
        correct: 0
    },
    {
        question: "Which academy graduate scored the opening goal in the 2021 Champions League final?",
        options: [
            "Reece James",
            "Callum Hudson-Odoi",
            "Mason Mount",
            "Kai Havertz",
            "Tammy Abraham"
        ],
        correct: 3
    },
    {
        question: "Who holds the record for most Chelsea appearances of all time?",
        options: [
            "John Terry",
            "Peter Bonetti",
            "Frank Lampard",
            "Steve Clarke",
            "Ron Harris"
        ],
        correct: 1
    },
    {
        question: "Who scored the winning penalty in the 2012 Champions League final?",
        options: [
            "Frank Lampard",
            "Didier Drogba",
            "Juan Mata",
            "Ashley Cole",
            "David Luiz"
        ],
        correct: 1
    },
    {
        question: "Which club did Chelsea sign N’Golo Kanté from?",
        options: [
            "Leicester City",
            "Arsenal",
            "PSG",
            "Monaco",
            "Marseille"
        ],
        correct: 0
    },
    {
        question: "Who is Chelsea’s all-time top scorer?",
        options: [
            "Didier Drogba",
            "Frank Lampard",
            "Gianfranco Zola",
            "Cole Palmer",
            "Nicolas Anelka"
        ],
        correct: 1
    },
    {
        question: "Which year did Chelsea first win the Premier League?",
        options: [
            "2003-04",
            "2004-05",
            "2005-06",
            "2006-07",
            "2002-03"
        ],
        correct: 1
    },
    {
        question: "Who was Chelsea’s manager before José Mourinho’s first spell?",
        options: [
            "Claudio Ranieri",
            "Avram Grant",
            "Carlo Ancelotti",
            "Guus Hiddink",
            "Gianluca Vialli"
        ],
        correct: 0
    },
    {
        question: "Which Chelsea player scored a hat-trick against Manchester United in 2010?",
        options: [
            "Didier Drogba",
            "Frank Lampard",
            "Nicolas Anelka",
            "Salomon Kalou",
            "Florent Malouda"
        ],
        correct: 3
    },
    {
        question: "Who did Chelsea beat in the 2021 Champions League semi-final?",
        options: [
            "Real Madrid",
            "Atletico Madrid",
            "Bayern Munich",
            "Barcelona",
            "Juventus"
        ],
        correct: 0
    },
    {
        question: "Which number did John Terry wear at Chelsea?",
        options: [
            "4",
            "5",
            "6",
            "26",
            "8"
        ],
        correct: 3
    },
    {
        question: "Who was Chelsea’s main goalkeeper in the 2004-05 title-winning season?",
        options: [
            "Carlo Cudicini",
            "Petr Čech",
            "Thibaut Courtois",
            "Ed de Goey",
            "Mark Bosnich"
        ],
        correct: 1
    },
    {
        question: "Which country is Chelsea legend Gianfranco Zola from?",
        options: [
            "Spain",
            "Italy",
            "France",
            "Portugal",
            "Germany"
        ],
        correct: 1
    }
];

const quizQuestion = document.querySelector('.quiz-question');
const quizOptions = document.querySelector('.quiz-options');
const progressCurrent = document.querySelector('.quiz-progress-current');
let currentQuestion = 0;
let score = 0;

// Thêm audio click
const clickAudio = new Audio('img/click-234708.mp3');
// Thêm audio đúng/sai
const correctAudio = new Audio('img/collect-5930.mp3');
const wrongAudio = new Audio('img/wrong-47985.mp3');

function renderQuestion(idx) {
    const q = quizData[idx];
    quizQuestion.innerHTML = q.question;
    quizOptions.innerHTML = q.options.map((opt, i) =>
        `<button class="option-btn"><span class="option-number">${i+1}</span>${opt}</button>`
    ).join('');
    progressCurrent.textContent = idx + 1;
    // Ẩn arrow và số câu chỉ khi đã trả lời xong câu cuối cùng
    if (idx === quizData.length - 1) {
        document.querySelector('.next-btn').style.display = '';
        document.querySelector('.quiz-progress').style.display = '';
    } else {
        document.querySelector('.next-btn').style.display = '';
        document.querySelector('.quiz-progress').style.display = '';
    }
    attachOptionEvents();
}

function attachOptionEvents() {
    const optionButtons = document.querySelectorAll('.option-btn');
    let answered = false;
    optionButtons.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            if (answered) return;
            answered = true;
            // Phát âm thanh click
            clickAudio.currentTime = 0;
            clickAudio.play();
            const correct = quizData[currentQuestion].correct;
            // Đầu tiên: chỉ hiện màu xanh dương cho đáp án được chọn
            optionButtons.forEach((b, i) => {
                b.classList.remove('selected', 'wrong', 'correct');
                if (i === idx) {
                    b.classList.add('selected');
                }
            });
            // Sau 2s, hiển thị đúng/sai và phát sound đúng/sai
            setTimeout(() => {
                // Phát sound đúng/sai
                if (idx === correct) {
                    correctAudio.currentTime = 0;
                    correctAudio.play();
                } else {
                    wrongAudio.currentTime = 0;
                    wrongAudio.play();
                }
                // Hiển thị đúng/sai
                optionButtons.forEach((b, i) => {
                    b.classList.remove('selected');
                    if (i === correct) {
                        b.classList.add('correct');
                        b.style.opacity = '1';
                    } else if (i === idx) {
                        b.classList.add(idx === correct ? 'correct' : 'wrong');
                        b.style.opacity = '1';
                    } else {
                        b.style.opacity = '0.4';
                        b.classList.remove('wrong', 'correct');
                    }
                });
                // Sau 2s nữa, chuyển sang câu tiếp theo hoặc tổng kết
                setTimeout(() => {
                    if (idx === correct) score++;
                    if (currentQuestion < quizData.length - 1) {
                        currentQuestion++;
                        renderQuestion(currentQuestion);
                    } else {
                        quizQuestion.innerHTML = `<div class=\"quiz-completed-message\" style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;width:100vw;position:fixed;left:0;top:40vh;z-index:10;font-style:normal;\">\n                            <div style='font-size:2.5rem;color:#fff;font-weight:bold;font-style:normal;'>Congrat!!! You answered correctly <span style='color:#e67e22;'>${score}</span><span style='color:#fff;'>/20</span> questions!</div>\n                            <button id='play-again-btn' style=\"margin-top:24px;padding:12px 32px;font-size:1.2rem;font-family:'Montserrat',Arial,sans-serif;font-weight:600;background:none;color:#fff;border:2px solid #fff;border-radius:8px;cursor:pointer;font-style:normal;\">Play Again</button>\n                        </div>`;
                        quizOptions.innerHTML = '';
                        document.querySelector('.next-btn').style.display = 'none';
                        document.querySelector('.quiz-progress').style.display = 'none';
                        setTimeout(() => {
                            const playAgainBtn = document.getElementById('play-again-btn');
                            if (playAgainBtn) {
                                playAgainBtn.onclick = () => {
                                    shuffleArray(quizData);
                                    currentQuestion = 0;
                                    score = 0;
                                    document.querySelector('.next-btn').style.display = '';
                                    document.querySelector('.quiz-progress').style.display = '';
                                    renderQuestion(currentQuestion);
                                };
                            }
                        }, 0);
                    }
                }, 2000);
            }, 2000);
        });
    });
}


// Hàm xáo trộn mảng câu hỏi
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Tráo câu hỏi mỗi khi load lại trang
shuffleArray(quizData);

renderQuestion(currentQuestion);

// Thêm hiệu ứng hover cho nút Play Again
const style = document.createElement('style');
style.innerHTML = `#play-again-btn:hover { background: #fff !important; color: #000 !important; border: 2px solid #fff !important; }`;
document.head.appendChild(style);
