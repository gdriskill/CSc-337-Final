/**
 * File name: code.js
 * Project: CSC 337 final
 * Purpose: The javascript code for the spider clicking game. After
 *  starting, spiders are adding at random positions on screen and a
 *  timer is started. User can remove a spider by clicking. If all the 
 *  spiders are cleared by the timer runs out, the win the game. If the
 *  user wins is sent back to the server and stored in the User's data.
 */

let inPlay = false;
let count = 30;
let score = 0;
timeleft = 30000;

/**
 * Adds a new spider to the screen to a random location in the game
 * area div. 
 */
function newSpider(){
    var spider = $('<span onclick="hit(this);"><img src="spider.png" alt="spider"></span>')
    $('#gameArea').append(spider);
    let maxHeight = $('#gameArea').height() - 50;
    let maxWidth = $('#gameArea').width() - 50;
    let height = getRandomNumber(0, maxHeight) + 'px';
    let width = getRandomNumber(0, maxWidth) + 'px';
    spider.css({'top': '0px',
                'position': 'absolute',
                'left': '0px',
                'margin': '5px'});
    spider.css('left', width);
    spider.css('top', height);
}

/**
 * Returns a random integer in the specified range
 * @param {number} min 
 * @param {number} max 
 * @returns  a random integer in the specified range
 */
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}

/**
 * Function that is called when spider is clicked on. Removed spider
 * from the screen. Increments score and decrements count of total
 * spiders.
 * @param {*} e html element, the spider just clicked
 */
function hit(e){
  if(inPlay){
    e.remove();
    count--;
  }
}

/**
 * Starts the game play. Should be called when start button is clicked
 */
function startGame(){
    inPlay = true;
    $('#startButton').remove();
    for(let i=0; i<count; i++){
        newSpider();
    }

    timer = window.setInterval(gamePlay, 10);
    if(!inPlay)
        clearInterval(timer);
}

/**
 * Formats milliseconds to seconds and updates time element on
 * page
 * @param {*} time   the elasped time in milliseconds 
 */
 function updateClock(time){
   
    timeString = (time/1000).toFixed(2) + " seconds";

    $('#time').text(timeString);
}

/**
 * The game play loop. Creates a new spider. Checks that the count
 * of spiders hasn't reached the maximun or else ends the game.
 */
function gamePlay(){
    if(inPlay){
        timeleft-=10;
        updateClock(timeleft);
        if(timeleft==0 || count==0){
            inPlay = false;
            endGame();
        }
    }
}

/**
 * Displays end of game messaage, score and return button. Sends user's
 * ending score to the server.
 */
function endGame(){
    // show result message
    if(count==0){
        score = 1;
        $("#message").text("You got all the spiders!");
    }
    else{
        $("#message").text("Oh no :( the spiders got ya");
    }

    $('#returnButton').show();

    // send score to server
    _data = {
        game :'spiders',
        score : score
    }
    
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
}

/**
 *  User returns to main game.
 */
function returnToGame(){
    $.ajax({
        url : '/index',
        type: 'get',
        }).done(function(response){
            console.log("back to main game");
        })
}