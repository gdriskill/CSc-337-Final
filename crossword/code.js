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

var score = 0;

/**
 * Checks the contents of each input square against the correct solution.
 * If the solution is incorrect, the percentage of the board that's correct
 * is shown to the user.
 * If the solution is correct, the user is told and check button is removed.
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
        score = 1;
        $('#results').text("Correct Solution!");
        $('#checkButton').remove();
    }
    // Player didn't solve crossword
    else{
        percent = correct/total*100 + '%';
        $('#results').text('Keep trying... You\'re '+ percent + ' correct');
    }
}

/**
 * Sends the user's score back to the server and closes the window
 */
function returnToGame(){
    // check board if score is zero, in case user solved puzzle but
    // didn't click the check button
    if(score==0){
        checkBoard();
    }

    $("body").html("Game over. Exit this window.");
    $("body").css("font-size", "200%");

    // post score to server
    _data = {
        game: 'crossword',
        score: score
    };

    var post_url = "/save/minigame/score/"; 
    var request_method = "post";

    $.ajax({
        url : post_url,
        type: request_method,
        data: _data, 
        dataType:'json',
        }).done(function(response){
            console.log('game data saved');
        })

    window.close();
}
