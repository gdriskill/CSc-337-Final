const solution = [
    [null, null,null,null,null,null,null,null,null,null,null,"f",null,null,null],
    [null, null,null,null,null,null,null,null,null,null,null,"r",null,null,null],
    ["t", null,null,null,null,null,"r",null,null,null,null,"e",null,null,null],
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

function start(){
    startTime = Date.now()
    setInterval( function (){
        elaspedTime = Date.now() - startTime;
        updateClock(elaspedTime);
    }, 10);
}

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
        if(expected == input.value){
            correct ++;
        }
        total ++;
    })
     
    // Player solved the crossword
    if(correct == total){
        score = (600000 - elaspedTime)/60000;
        $('#results').text("Correct Solution! You're score is " + score);
        //TODO send score back to server
    }
    // Player didn't solve crossword
    else{
        percent = correct/total*100 + '%';
        $('#results').text('Not quite... You\'re '+ percent + ' correct');
    }
}

function returnToGame(){
    //TODO how do you close a window/ send user back to game???
    alert('still need to implement this lolz');
}