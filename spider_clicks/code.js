/**
 * File name: code.js
 * Project: CSC 337 final
 * Purpose: The javascript code for the spider clicking game. After
 *  starting, adds a new spider to the screen at a set interval. User
 *  can remove a spider by clicking. If the amount of spiders currently
 *  on screen reaches a maximun, the game ends. User's score is how 
 *  many spiders they clicked. This score is send back to the server 
 *  and stored in the User's data.
 */
const maxSpiders = 15;
const newSpiderTime = 500;
let inPlay = false;
let count = 0;
let score = 0;

/**
 * Adds a new spider to the screen to a random location in the game
 * area div. Increments the total count of spiders.
 */
function newSpider(){
    var spider = $('<span onclick="hit(this);"><img src="spider.jpg" alt="spider"></span>')
    $('#gameArea').append(spider);
    let maxHeight = $('#gameArea').height();
    let maxWidth = $('#gameArea').width();
    let height = getRandomNumber(0, maxHeight) + 'px';
    let width = getRandomNumber(0, maxWidth) + 'px';
    spider.css({'top': '0px',
                'position': 'absolute',
                'left': '0px',
                'margin': '5px'});
    spider.css('left', width);
    spider.css('top', height);
    count++;
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
    score++;
    count--;
  }
}

/**
 * Starts the game play. Should be called when start button is clicked
 */
function startGame(){
    inPlay = true;
    $('#startButton').remove();
    count = 0;
    score = 0;
    timer = window.setInterval(gamePlay, newSpiderTime);
    if(!inPlay)
        clearInterval(timer);
}

/**
 * The game play look. Creates a new spider. Checks that the count
 * of spiders hasn't reached the maximun or else ends the game.
 */
function gamePlay(){
    if(inPlay){
        newSpider();
        if(count > maxSpiders){
            inPlay = false;
            console.log(':(');
            endGame();
        }
    }
}

/**
 * Displays end of game messaage, score and return button. Sends user's
 * ending score to the server.
 */
function endGame(){
    $("#message").text("Oh no :( the spiders got ya");
    $("#results").text("Your score was " + score + " spiders killed!");
    $("#returnButton").show();
    //TODO send user's score to server
}

/**
 * Closes the window, so user returns to main game.
 */
function returnToGame(){
    // change window to the main game or close window?
    Window.close();
}