


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
app.use(express.static(__dirname + '/public_html')); //__dirname
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




app.get('/market', (req, res) => {
    console.log('/market')
    session=req.session;
    session.username = 'bena' // REPLACE W /login/user, req.body.username
    res.sendFile(__dirname + "/public_html/marketplace.html");


});




app.get('/get/my/items/', async function (req, res) {
    //gets the full item list from the database sends this to the client
    var rtn = '';
    var lst = [];
    var user = session.username
    var usr = await db.collection("users").findOne({name: user});
    console.log('usr is: '+ usr)
    var itm = usr.items
    
    console.log('itm is: '+ itm)
    itm = [itm]

    res.send(itm);
});





app.get('/get/items/', async function (req, res) {
    //gets the full item list from the database sends this to the client
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
    const othrsitm = req.body.type;
    const otherusr = req.body.user;

    console.log('to be added type is: ' + othrsitm)
    console.log('to be added user is: ' + otherusr)

    session=req.session
    myusername = session.username
    console.log('myusername is: ' + myusername)
    var myuser = await db.collection('users').findOne({name: myusername});
    var myitem = myuser.items;

    console.log('my item is: ' + myitem)
    console.log('myusermae: ' + myusername)

    if(myitem == null){
        console.log('my item is null')
        res.end('0')

    }
    else{

    db.collection('users').updateOne(
        { name: myusername},
        { $set: {items: othrsitm}}
    );
    db.collection('users').updateOne(
        { name: otherusr},
        { $set: {items: myitem}}
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


app.listen(port, function(){
    console.log(`App listening at ' + ${port}`);
  });