
_baseurl = 'http://137.184.33.197:3001'
baseurl = 'http://localhost:3001/'

const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
const port = 3001;

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const { response } = require('express');


const app = express();
app.use(express.json());
app.use(parser.json() );
app.use(parser.urlencoded({ extended: true })); 
app.use(express.static('public_html'));
app.use(express.static('Gameplay'));
app.use(express.static('Gameplay/Locations'));
app.use(express.static('Gameplay/images'));

//app.use(express.static('Gameplay/'));
//app.use(express.static(__dirname + '/Gameplay/index.html'));
app.use(express.static(__dirname + '/public_html' + '/tiktakto'));
app.use(express.static(__dirname + '/public_html' + '/marketplace'));
//app.use(express.static(__dirname + '/public_html' + '/tamagachi'));

//get("/*", (req, res) => {res.redirect("/");});


//app.use(express.static(__dirname));


const db  = mongoose.connection;
const mongoDBURL = "mongodb+srv://root:root@finalprojcluster.nhf3k.mongodb.net/finalprojcluster?retryWrites=true&w=majority";

const NOTSTARTED = 'NOTSTARTED';
const INPROGRESS = 'INPROGRESS';
const COMPLETED = 'COMPLETED';

console.log('connecting to db:' + mongoDBURL);

//Set up default mongoose connection
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log('database connected ');


const timeout = 1000000;

//app.use(cookieParser());



//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: timeout },
    resave: false
}));




var Schema = mongoose.Schema;

var itemSchema = new Schema({ 
    type: String,
    user: String, 
});

var userSchema = new Schema({ 
    name: String,
    items: String,
});

var item = mongoose.model('items', itemSchema );
var user = mongoose.model('users', userSchema );



app.get('/get/my/book/', async function (req, res) {
    //gets the my item list from the database sends this to the client
    var rtn = '';
    var lst = [];
    var user = session.username
    var usr = await db.collection("users").findOne({name: user});
    console.log('usr is: '+ usr)
    var itm = usr.book
    
    console.log('itm is: '+ itm)
    itm = [itm]

    res.send(itm);
});

app.post('/post/book/', async function (req, res) {
    //gets the full item list without my items from the database sends this to the client

    var myusername = session.username
    let mydata = req.body.Book;

    db.collection('users').updateOne(
        { name: myusername},
        { $set: {'book' : mydata}} // need to index into object
    );
    res.send("saved");
});







app.get('/get/books/', async function (req, res) {
    //gets the full item list without my items from the database sends this to the client
    var rtn = '';
    var lst = [];

    session=req.session
    myusername = session.username

    var itmarray = await db.collection("items").find({ user: {$ne: myusername}}).toArray();
    console.log('itmarray is: '+ itmarray)
    itmarray.forEach(element => {
        console.log('itmarray.user is: ' + itmarray.user)
        //if(itmarray.user != session.username){ /// doesnt work
        lst.push(element);
        //}

      });
    console.log('items are:' + lst);
    res.send(lst);
});




app.post('/do/trade/', async function (req, res) {
    console.log('this version reached!')
    const othrsitm = req.body.type;
    const otherusr = req.body.user;

    console.log('to be added type is: ' + othrsitm)
    console.log('to be added user is: ' + otherusr)

    session=req.session
    myusername = session.username
    console.log('myusername is: ' + myusername)
    var myuser = await db.collection('users').findOne({name: myusername});
    var myitem = myuser.book;

    console.log('my item is: ' + myitem)
    console.log('myusermae: ' + myusername)

    if(myitem == null){
        console.log('my item is null')
        res.end('0')

    }
    else{

    db.collection('users').updateOne(
        { name: myusername},
        { $set: {book: othrsitm}}
    );
    db.collection('users').updateOne(
        { name: otherusr},
        { $set: {book: myitem}}
    );
    db.collection('items').updateOne(
        { user: myusername},
        { $set: {type: othrsitm}}
    );
    db.collection('items').updateOne(
        { user: otherusr},
        { $set: {type: myitem}}
    );
    res.end('1')
    }
});

app.post('/tamagachi/timer/', async function (req, res){
    console.log('tamagachi timer server save reached');
    user = session.username;
    data = req.query;
    foodtimerwhenleft = data.foodtimerwhenleft;
    playtimerwhenleft = data.playtimerwhenleft;
    console.log(req);
    console.log('foodtimerwhenleft' + foodtimerwhenleft);
    console.log('playtimerwhenleft' + playtimerwhenleft);

    timeexited = data.timeexited;
    updatestring = {'tamagachifoodtimer': foodtimerwhenleft, 'tamagachiplaytimer': playtimerwhenleft,'timeexitedtamagachi': timeexited };
    
    console.log('updatastring is: ' + updatestring);
    console.log('updatastring tamagachifoodtimer is: ' + updatestring.tamagachifoodtimer);
    console.log('updatastring is tamagachiplaytimer: ' + updatestring.tamagachiplaytimer);
    console.log('timeexitedtamagachi : ' + updatestring.timeexitedtamagachi);



    db.collection('users').updateOne(
        { name: user},
        { $set: {'tamagachitimer' : updatestring}} // need to index into object
    );

    /* db.collection('users').updateOne(
        { name: user},
        { $set: {gamescores: {tamagachiplaytimer: playtimerwhenleft}}} // need to index into object
    );
    db.collection('users').updateOne(
        { name: user},
        { $set: {gamescores: {timeexitedtamagachi: timeexited}}} // need to index into object
    ); */

})

app.get('/tamagachi/my/timer/', async function (req, res){
    console.log('made it to tamagachi get');
    user = session.username;


    var item = await db.collection("users").findOne({"name": user});
    console.log(item);

    if(item.tamagachitimer != null){

        console.log('tamagachi timer is:');
        console.log(item.tamagachitimer)
        mytamtimer = JSON.stringify(item.tamagachitimer)


        res.end(mytamtimer)
    }


});




app.get('/load/game/data', async function (req, res){
    session=req.session
    myusername = session.username

    var user = await db.collection("users").findOne({"name": myusername});

    console.log('my data is:');
    console.log(user.mydata)
    mydata = user.mydata;
    res.end(mydata)
});

app.post('/save/game/', async function (req, res) {
    //gets the full item list without my items from the database sends this to the client

    session=req.session
    myusername = session.username
    let mydata = req.body.playerData;

    db.collection('users').updateOne(
        { name: myusername},
        { $set: {'mydata' : mydata}} // need to index into object
    );
    res.send("saved");
});





app.get('/tamagachi', (req, res) => {
    console.log('/tamagachi')
    session=req.session;
    username = session.username // REPLACE W /login/user, req.body.username
    res.sendFile(__dirname + "/public_html/tamagachi/tamagachi.html");
});





// NEW STUFF BELOW:::





app.get('/market', (req, res) => {
    console.log('/market')
   // session=req.session;
   // session.username = req.session // REPLACE W /login/user, req.body.username
    res.sendFile(__dirname + "/public_html/marketplace/marketplace.html");
});


app.get('/tiktaktoe', (req, res) => {
    //window.location.href = '/public_html/tiktakto/tiktaktoe.html'
    console.log('/tiktaktoe')
 // REPLACE W /login/user, req.body.username
    res.sendFile(__dirname + "/public_html/tiktakto/tiktaktoe.html");
});

/*
app.get('/gameplay', (req, res) => {
    //window.location.href = '/public_html/tiktakto/tiktaktoe.html'
    console.log('/tiktaktoe')
    // REPLACE W /login/user, req.body.username
    res.sendFile(__dirname + "/Gameplay/index.html");
});
 */


app.get('/*', (req, res) => {
    console.log('/index')
    session=req.session;
    if(session.username !== undefined){
        console.log('userfound')
        res.sendFile(__dirname+"/Gameplay/index.html"); // if session exists:  /gameplay/idex.html
    }
    else{
        console.log('user not found')
        res.sendFile(__dirname + "/public_html/index.html"); //If session doesnt exist: login page
    }
});

app.post('/add/user/', function (req, res) {
    //adds a new user to the database based on the username typed in the body to the 
    // corresponding form 
    const username = req.body.username;
    const password = req.body.password;
    min = Math.ceil(10);
    max = Math.floor(40);
    const mysalt = Math.floor(Math.random() * (max - min) + min); 
    hashedpassword = getHash(password, mysalt)



    var rtrn = { name: username, password: hashedpassword, salt: mysalt, tamagachitimer: {tamagachifoodtimer: '', timeexitedtamagachi: ''} };
    db.collection("users").insertOne(rtrn); // Change to ChatMessage after test
    res.end('true'); 
});


app.post('/login/user/', async function (req, res, next) { // this sends true or false to the index.html page which presents the index page to the user
    const username = req.body.username;
    const password = req.body.password;

    var user = await db.collection("users").findOne({"name": username});

    if (user == null){
        console.log('login fail');
        res.send(false);
    }

    else{

        mysalt = user.salt
        hashedpassword = getHash(password, mysalt)

        var user = await db.collection("users").findOne({name: username, password:hashedpassword});
        if (user == null){
            console.log('login fail');
            res.send(false);
        }
        else{

        console.log('login success');
        session = req.session;
        session.username = username;
        res.send(true); //__dirname+ "/index.html"
        };
    };

});

app.use('/Gameplay', (req, res) => {
        console.log('/efef')
        session=req.session;
        if(session.username !== undefined){
            console.log('userfound')
            res.sendFile(__dirname+"/Gameplay/index.html"); // if session exists:  /gameplay/idex.html
        }
        else{
            console.log('user not found')
            res.sendFile(__dirname + "/public_html/index.html"); //If session doesnt exist: login page
        }
});

app.get('/logout/user', async function (req, res) {
    console.log('/logout/user')
    req.session.destroy();
    console.log('destroyed')
    res.send(true);
});



app.post('/save/minigame/score/', async function (req, res) {
    //gets the full item list without my items from the database sends this to the client
    console.log('save scores server reached')
    session=req.session
    myusername = session.username
    mydata = req.body
    game = mydata.game
    score = mydata.score
    newgamescore = {[game]: score}

    let userobj = db.collection('users').find({name: username});
    myscores = userobj.gamescores

    let newgamescores = myscores

    db.collection('users').updateOne(
        { name: myusername},
        { $set: {'gamescores' : newgamescore}} // need to index into object
    );
});




const crypto = require('crypto');
function getHash(password, salt) {
    var cryptoHash = crypto.createHash('sha512');
    var toHash = password + salt;
    var hash = cryptoHash.update(toHash, 'utf-8').digest('hex');
    return hash;
   
  };

app.listen(port, async function(){
    console.log(`App listening at ' + ${port}`);
  });



