let timer;
let timeLimit;
let numProblems;
let currentProblem = 0;
let correctAnswers = 0;
let problemTimes = []; // Array to store time spent on each problem
let startTime; // To track start time for each problem
let currentNumbers; // To store the current problem's numbers

function startQuiz() {
    timeLimit = parseInt(document.getElementById("time-limit").value);
    numProblems = parseInt(document.getElementById("num-problems").value);
    currentProblem = 0;
    correctAnswers = 0;
    problemTimes = []; // Reset problem times
    document.getElementById("result").innerHTML = "";
    document.getElementById("quiz-progress").innerHTML = `Problem 1 of ${numProblems}`;
    document.getElementById("timer").innerHTML = "";
    generateProblem();
}

function generateProblem() {
    const num1 = Math.floor(Math.random() * 90) + 10; // Random 2-digit number (10-99)
    const num2 = Math.floor(Math.random() * 90) + 10; // Random 2-digit number (10-99)
    
    currentNumbers = { num1, num2 };

    // Display the problem vertically
    document.getElementById("problem").innerHTML = `
        <p>${num1}</p>
        <p>${num2}</p>
    `;

    // Start timer for the problem
    startTimer(num1, num2);
}

function startTimer(num1, num2) {
    let timeLeft = timeLimit;
    document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;
    
    startTime = Date.now(); // Record the start time for this problem
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showAnswer(num1, num2);
        }
    }, 1000);
}

function showAnswer(num1, num2) {
    const result = num1 * num2;
    
    // Show the result automatically after time runs out
    document.getElementById("result").innerHTML = `
        Answer: ${result}
    `;
    
    // Track the time spent on this problem
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000; // Time spent in seconds
    problemTimes.push(timeSpent);

    // Move to the next problem after a delay
    currentProblem++;
    if (currentProblem < numProblems) {
        setTimeout(() => {
            document.getElementById("quiz-progress").innerHTML = `Problem ${currentProblem + 1} of ${numProblems}`;
            generateProblem();
        }, 2000); // Wait for 2 seconds before showing the next problem
    } else {
        setTimeout(showReport, 2000); // Show the report after all problems are done
    }
}

function showReport() {
    let reportHTML = `<h3>Quiz Report</h3>`;
    reportHTML += `<p>Total Problems: ${numProblems}</p>`;
    reportHTML += `<p>Correct Answers: ${correctAnswers}</p>`;
    reportHTML += `<p>Time Spent on Each Problem (in seconds):</p>`;
    reportHTML += `<ul>`;
    
    problemTimes.forEach((time, index) => {
        reportHTML += `<li>Problem ${index + 1}: ${time.toFixed(2)}s</li>`;
    });
    
    const totalTime = problemTimes.reduce((acc, time) => acc + time, 0);
    reportHTML += `</ul>`;
    reportHTML += `<p>Total Time Spent: ${totalTime.toFixed(2)}s</p>`;
    
    document.getElementById("result").innerHTML = reportHTML;
}
