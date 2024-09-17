// Get references to the points display elements
const team1PointsElement = document.getElementById('team1-points');
const team2PointsElement = document.getElementById('team2-points');
const pointsInputElement = document.getElementById('points-input');
const team1name = document.getElementById("team1-name");
const team2name = document.getElementById("team2-name");
const team1nameinput = document.getElementById("team1name");
const team2nameinput = document.getElementById("team2name");

// Retrieve initial values from localStorage (or default values)
let team1Points = localStorage.getItem('team1Points') ? parseInt(localStorage.getItem('team1Points')) : 100;
let team2Points = localStorage.getItem('team2Points') ? parseInt(localStorage.getItem('team2Points')) : 200;
let teamOneName = localStorage.getItem('team1name') ? localStorage.getItem('team1name') : "Team 1";
let teamTwoName = localStorage.getItem('team2name') ? localStorage.getItem('team2name') : "Team 2";

// Update the DOM with the initial points
team1PointsElement.textContent = team1Points;
team2PointsElement.textContent = team2Points;
team1name.textContent = teamOneName;
team2name.textContent = teamTwoName;

// Function to add points to a team
function addPoints(team) {
    const pointsToAdd = parseInt(pointsInputElement.value, 10);

    if (isNaN(pointsToAdd)) {
        alert('Please enter a valid number of points!');
        return;
    }

    if (team === 1) {
        team1Points += pointsToAdd;
        team1PointsElement.textContent = team1Points;
        localStorage.setItem('team1Points', team1Points); // Save to localStorage
    } else if (team === 2) {
        team2Points += pointsToAdd;
        team2PointsElement.textContent = team2Points;
        localStorage.setItem('team2Points', team2Points); // Save to localStorage
    }

    //pointsInputElement.value = ''; // Clear the input field
}
function setNames(){
    const name1 = ((team1nameinput.value) ? team1nameinput.value : "Team 1");
    const name2 = ((team2nameinput.value) ? team2nameinput.value : "Team 2");
    team1name.textContent = name1;
    localStorage.setItem('team1name', name1);
    team2name.textContent = name2;
    localStorage.setItem('team2name', name2);
    team1nameinput.value ='';
    team2nameinput.value ='';
}

// Function to subtract points from a team
function subtractPoints(team) {
    const pointsToSubtract = parseInt(pointsInputElement.value, 10);

    if (isNaN(pointsToSubtract)) {
        alert('Please enter a valid number of points!');
        return;
    }

    if (team === 1) {
        team1Points -= pointsToSubtract;
        if (team1Points < 0) team1Points = 0;
        team1PointsElement.textContent = team1Points;
        localStorage.setItem('team1Points', team1Points); // Save to localStorage
    } else if (team === 2) {
        team2Points -= pointsToSubtract;
        if (team2Points < 0) team2Points = 0;
        team2PointsElement.textContent = team2Points;
        localStorage.setItem('team2Points', team2Points); // Save to localStorage
    }

    //pointsInputElement.value = ''; // Clear the input field
}
