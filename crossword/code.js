/**
 * File name: code.js
 * Project: CSC 337 final
 * Purpose: The javascript code for the crossword game. On loading the 
 *  page, a timer is started which is used to calculate a user's score
 *  after they solve the puzzle. When the check board button is clicked,
 *  the program compares each square the user filled to the correct 
 *  solution and calculates what percentage of the squares are correct. 
 *  if the board is perfect, the score is send back to the server and 
 *  stored in the User's data.
 */

// solved board
const solution = [
    [null, null,null,null,null,null,null,null,null,null,null,"f",null,null,null],
    [null, null,null,null,null,null,null,null,null,null,null,"r",null,null,null],
    ["t", null,null,null,null,"t","r","i","c","k",null,"e",null,null,null],
    ["i", null,null,null,null,null,"e",null,null,null,null,"e",null,null,null],
    ["m", null, null, null, null, null,"i",,null,null,null,"w",null,null,null],
    ["e", "x", "i", "s", "t", "e", "n", "t", "i", "a", "l", "i", "s", "m",null],
    ["w", null,null,null,null,null,"c",null,null,null,null,"l",null,null,null],
    ["a", null,null,null,null,null,"a",null,null,null,null,"l","o","o","p"],
    ["r", null,null,null,null,null,"r",null,null,null,null,null,null,null,null],
    ["p", null,null,null,null,null,"n",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,null,"a",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,null,"t",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,"n","i","g","h","t","m","a","r","e",null],
    [null, null,null,null,null,null,"o",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,"i","n","f","i","n","i","t","y",null,null]
];
var elaspedTime = 0;
var score = 0;

/**
 * Starts the on screen timer
 */
function start(){
    startTime = Date.now()
    setInterval(function (){
        elaspedTime = Date.now() - startTime;
        updateClock(elaspedTime);
    }, 10);
}

/**
 * Formats milliseconds to hours, minutes and seconds. Updates the time on 
 * screen.
 * @param {*} time   the elasped time in milliseconds 
 */
function updateClock(time){
    let decimalHours = time/3600000;
    let hours = Math.floor(decimalHours);
    let decimalMins = (decimalHours - hours)*60;
    let mins = Math.floor(decimalMins);
    let decimalSec = (decimalMins - mins) * 60;
    let secs = Math.floor(decimalSec);
    let decimalMS = (decimalSec - secs) * 60;
    let millis = Math.floor(decimalMS);

    hh = hours.toString().padStart(2, "0");
    mm = mins.toString().padStart(2, "0");
    ss = secs.toString().padStart(2, "0");
    ms = millis.toString().padStart(2, "0");

    timeString = `${hh}:${mm}:${ss}.${ms}`;

    $('#time').text(timeString);
}

/**
 * Checks the contents of each input square against the correct solution.
 * If the solution is incorrect, the percentage of the board that's correct
 * is shown to the user and the score is updated to be that percent.
 * If the solution is correct, the user is told and a score is calculated 
 * based on the time they took to complete.
 */
function checkBoard(){
    correct = 0;
    total = 0
    allInputs = $("input");
    $.each(allInputs, function(i){
        input = allInputs[i];
        idSplit = input.id.split(",");
        row = parseInt(idSplit[0]);
        col = parseInt(idSplit[1]);
        expected = solution[row][col];
        console.log(input.value.toLowerCase() + " " 
        + expected);
        if(expected === input.value.toLowerCase()){
            console.log("nice!");
            correct ++;
        }
        total ++;
    })
     
    // Player solved the crossword
    if(correct == total){
        score = (600000 - elaspedTime)/60000;
        if(score<100)
            score = 100;
        $('#results').text("Correct Solution! You're score is " + score);
        $('#checkButton').remove();
    }
    // Player didn't solve crossword
    else{
        percent = correct/total*100 + '%';
        score = Math.floor(percent);
        $('#results').text('Keep trying... You\'re '+ percent + ' correct');
    }
}

/**
 * Sends the user's score back to the server and closed the window
 */
function returnToGame(){
    //TODO how do you close a window/ send user back to game???
    //TODO send score back to server
    alert('still need to implement this lolz');
}