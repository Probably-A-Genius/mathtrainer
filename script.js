let timer;
let timeLimit;
let numProblems;
let currentProblem = 0;
let correctAnswers = 0;
let problemTimes = []; // Array to store time spent on each problem
let startTime; // To track start time for each problem

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
    const a11 = Math.floor(Math.random() * 10);
    const a12 = Math.floor(Math.random() * 10);
    const a21 = Math.floor(Math.random() * 10);
    const a22 = Math.floor(Math.random() * 10);
    
    const b11 = Math.floor(Math.random() * 10);
    const b12 = Math.floor(Math.random() * 10);
    const b21 = Math.floor(Math.random() * 10);
    const b22 = Math.floor(Math.random() * 10);
    
    // Display the matrices in the input fields
    document.getElementById("a11").value = a11;
    document.getElementById("a12").value = a12;
    document.getElementById("a21").value = a21;
    document.getElementById("a22").value = a22;
    
    document.getElementById("b11").value = b11;
    document.getElementById("b12").value = b12;
    document.getElementById("b21").value = b21;
    document.getElementById("b22").value = b22;
    
    // Start timer for the problem
    startTimer(a11, a12, a21, a22, b11, b12, b21, b22);
}

function startTimer(a11, a12, a21, a22, b11, b12, b21, b22) {
    let timeLeft = timeLimit;
    document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;
    
    startTime = Date.now(); // Record the start time for this problem
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showAnswer(a11, a12, a21, a22, b11, b12, b21, b22);
        }
    }, 1000);
}

function showAnswer(a11, a12, a21, a22, b11, b12, b21, b22) {
    const c11 = a11 * b11 + a12 * b21;
    const c12 = a11 * b12 + a12 * b22;
    const c21 = a21 * b11 + a22 * b21;
    const c22 = a21 * b12 + a22 * b22;
    
    // Show result one number over another
    document.getElementById("result").innerHTML = `
        Result:
        <p>${c11}</p>
        <p>${c12}</p>
        <p>${c21}</p>
        <p>${c22}</p>
    `;
    
    // Track the time spent on this problem
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000; // Time spent in seconds
    problemTimes.push(timeSpent);

    // Move to next problem after a delay
    currentProblem++;
    if (currentProblem < numProblems) {
        setTimeout(() => {
            document.getElementById("quiz-progress").innerHTML = `Problem ${currentProblem + 1} of ${numProblems}`;
            generateProblem();
        }, 2000); // Wait for 2 seconds before showing next problem
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

function multiplyMatrices() {
    // This will be a fallback function in case you want to manually multiply matrices
    // This will be used only if you want to solve the matrix manually instead of the quiz timer
    const a11 = parseFloat(document.getElementById("a11").value);
    const a12 = parseFloat(document.getElementById("a12").value);
    const a21 = parseFloat(document.getElementById("a21").value);
    const a22 = parseFloat(document.getElementById("a22").value);
    
    const b11 = parseFloat(document.getElementById("b11").value);
    const b12 = parseFloat(document.getElementById("b12").value);
    const b21 = parseFloat(document.getElementById("b21").value);
    const b22 = parseFloat(document.getElementById("b22").value);
    
    const c11 = a11 * b11 + a12 * b21;
    const c12 = a11 * b12 + a12 * b22;
    const c21 = a21 * b11 + a22 * b21;
    const c22 = a21 * b12 + a22 * b22;
    
    // Show result one number over another
    document.getElementById("result").innerHTML = `
        Result:
        <p>${c11}</p>
        <p>${c12}</p>
        <p>${c21}</p>
        <p>${c22}</p>
    `;
}
