const words = [
    "The first step to greatness is setting a clear goal Once your vision is set take steps to achieve it Success takes effort and perseverance is key Learn from failures surround yourself with support and celebrate small victories",
    "Work life balance is crucial Set boundaries between work and personal time take breaks and prioritize exercise Flexible schedules and remote work improve happiness and productivity",
    "Environmental sustainability is urgent Adopt sustainable practices like reducing waste and conserving water Public transport helps reduce pollution Governments and organizations must implement eco friendly policies",
    "Technology has transformed communication and work The internet enables collaboration but there are challenges like data privacy Use technology responsibly and embrace innovation while maintaining ethical standards",
    "Physical health is key to wellbeing Exercise a balanced diet and sleep improve mood and reduce stress Preventive care detects health issues early Mental and physical health are linked",
    "Education empowers growth providing knowledge and skills for success It fosters critical thinking creativity and empathy Access to quality education is vital for personal and societal improvement",
    "Mental health awareness is growing Conversations about mental health are more open now Practices like mindfulness and therapy help manage stress Prioritizing mental health is essential for a fulfilling life",
    "The arts enrich culture and inspire creativity Music painting literature and performance express emotions reflect society and promote self discovery Supporting the arts fosters imagination and community",
    "Financial literacy is crucial for managing money Budgeting saving and investing help make informed decisions Financial education builds stability avoids debt and ensures a secure future",
    "Volunteer work positively impacts society It promotes empathy social responsibility and personal growth Volunteering fosters community connection and provides fulfillment and purpose"
];

let display_text = document.querySelector('.display_text');
let input_text = document.getElementById('input_text');
let startBtn = document.querySelector('#btn');
let time = document.querySelector('.time');
let result = document.querySelector('.result');
let show_wpm = document.querySelector('.wpm');
let show_acc = document.querySelector('.acc');

let text, cursor, typedChar = 0, timerInterval, startTime;
let timeLeft = 30;

startBtn.addEventListener('click', start);

function start() {
    text = words[Math.floor(Math.random() * words.length)];
    display_text.innerText = '';
    cursor = 0;
    typedChar = 0;
    timeLeft = 30;
    show_wpm.innerText = '';
    show_acc.innerText = '';

    clearInterval(timerInterval);
    text.split('').forEach((word, index) => {
        const span = document.createElement('span');
        span.innerText = word;
        if (word === ' ') span.classList.add('space');
        if (index === 0) span.classList.add('cursor');
        display_text.appendChild(span);
    });
    input_text.disabled = false;
    input_text.value = '';
    input_text.focus();

    startTime = Date.now();

    time.innerText = `Time: ${timeLeft}`;
    timerInterval = setInterval(updateTimer, 1000);

    input_text.addEventListener('input', startTyping);
}

function startTyping() {
    const typedText = input_text.value.split('');
    typedChar = typedText.length;

    Array.from(display_text.children).forEach((span, index) => {
        const expChar = span.innerText.trim();
        const typed = typedText[index];
        span.classList.remove('cursor', 'correct', 'incorrect');

        if (typed == null) {
            span.classList.remove('correct', 'incorrect');
        } else if (expChar === typed) {
            span.classList.add('correct');
        } else {
            span.classList.add('incorrect');
        }
    });

    if (typedText.length < display_text.children.length) {
        display_text.children[typedText.length].classList.add('cursor');
    }

    if (typedText.length === display_text.children.length) {
        clearInterval(timerInterval);
        showResults();
    }
}

function updateTimer() {
    timeLeft--;
    time.innerText = `Time: ${timeLeft}`;

    if (timeLeft < 0) {
        clearInterval(timerInterval);
        time.innerText = "Time Over";
        input_text.removeEventListener('input', startTyping);
        input_text.disabled = true;

        const currentCursor = display_text.querySelector('.cursor');
        if (currentCursor) {
            currentCursor.classList.remove('cursor');
        }

        showResults();
    }
}

function showResults() {
    let timeTaken = 30 - timeLeft;
    let wordsTyped = typedChar / 5;

    let correctChars = 0;
    const typedText = input_text.value.split('');
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === text[i] && typedText[i] != ' ') {
            correctChars++;
        }
    }

    const acc = typedChar === 0 ? 0 : Math.round((correctChars / typedChar) * 100);
    const wpm = Math.round(((wordsTyped / timeTaken) * 60) * (acc / 100));
    show_wpm.innerText = `WPM: ${wpm}`;
    show_acc.innerText = `ACC: ${acc}`;
}
