const maxSpiders = 15;
const newSpiderTime = 500;
let inPlay = false;
let spiders = [];
let count = 0;
let score = 0;

function newSpider(){
    //TODO picture of spider
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
    let now = Date.now();
    count++;
}

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}

function hit(e){
    console.log("jsut cliekd");
  if(inPlay){
    delete spiders[e];
    e.remove();
    score++;
    count--;
  }
}

function startGame(e){
    console.log('starting the game');
    inPlay = true;
    $('#startButton').remove();
    count = 0;
    score = 0;
    timer = window.setInterval(gamePlay, newSpiderTime);
    if(!inPlay)
        clearInterval(timer);
}

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

function endGame(){
    $("#message").text("Oh no :( the spiders got ya");
    $("#results").text("Your score was " + score + " spiders killed!");
    $("#returnButton").show();
    //TODO send user's score to server
}

function returnToGame(){
    // change window to the main game or close window?
    Window.close();
}