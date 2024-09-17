// Get references to the points display elements
const team1PointsElement = document.getElementById('team1-points');
const team2PointsElement = document.getElementById('team2-points');
const team1nameElement = document.getElementById("team1-name");
const team2nameElement = document.getElementById("team2-name");

var disabledDivs = [];
let i = 0;
var currentChoices = [];
var currentAnswer = "";
// Function to update the displayed scores
function updateScores() {
    const team1Points = localStorage.getItem('team1Points');
    const team2Points = localStorage.getItem('team2Points');
    const team1name = localStorage.getItem('team1name');
    const team2name = localStorage.getItem('team2name');
    // Update the DOM with the latest scores from localStorage
    if (team1Points) {
        team1PointsElement.textContent = team1Points;
    }
    if (team2Points) {
        team2PointsElement.textContent = team2Points;
    }
    if (team1name) {
        team1nameElement.textContent = team1name;
    }
    if (team2name) {
        team2nameElement.textContent = team2name;
    }
}
function getQuestion(id) {
    fetch(`http://127.0.0.1:8080/question/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(question => {
            document.getElementById("question-text").textContent = question.question;
            document.getElementById("choices-text").textContent ="";
            document.getElementById("answer-text").textContent ="";
            currentChoices = question.answers;
            currentAnswer = question.correctAnswer;
            document.getElementById('popup').classList.add('show');
            document.getElementById('popup').style.display = "block";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function closePopup() {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('popup').style.display = "none";
}

function buttonClicked(idd)
{
    disabledDivs.push(idd);
    var div = document.getElementById(idd);
    div.classList.add('disabled');
    getQuestion(idd);
}

function resetQuest() {
    while(i < disabledDivs.length){
    div = document.getElementById(disabledDivs[i]);
    div.classList.remove('disabled');
    i=i+1;
    }
    disabledDivs = []
    i=0;
}
function showChoices() {
    if (!document.getElementById("choices-text").hasChildNodes()){
    const container = document.getElementById("choices-text");
    const ul = document.createElement('ul');
    currentChoices.forEach(item => {
        const li = document.createElement('li'); // Create a new <li> element
        li.textContent = item; // Set the text content
        ul.appendChild(li); // Append <li> to <ul>
    });

    // Append the <ul> to the container
    container.appendChild(ul);
}
}

// Function to show the correct answer
function showCorrectAnswer() {
    if (!document.getElementById("answer-text").hasChildNodes()){
        const container = document.getElementById("answer-text");
        container.textContent = currentAnswer;
    }
}
// Listen for changes in localStorage
window.addEventListener('storage', (event) => {
    if (event.key === 'team1Points' || event.key === 'team2Points' || event.key === 'team1name' || event.key === 'team2name') {
        updateScores();
    }
});

// Update the scores initially when the page loads
updateScores();
