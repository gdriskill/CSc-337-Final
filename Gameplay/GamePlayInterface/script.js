
const action = "action";
const saying = "saying";
const thought = "thought";


let outsideLocation = new outside();
let barnLocation = new barn();
let frontHouseLocation = new frontOfHouse();

let currentLocation = outsideLocation.name;
let currentLocationData = outsideLocation;
let playerInput = new userController();

currentLocationData.look("default");

let imageInput ="";

function getInput(){
console.log("Hey");
    document.getElementById("userInput").onkeydown = function (e){
        let userInput = document.getElementById("userInput").value.trim();
        if(!e) {e = window.event;}
        var keyCode = e.code || e.key;
        if(keyCode === 'Enter'){
            document.getElementById("userInput").value = "";

            printData(userInput,action);

            let inputType = playerInput.getInputType(userInput);
            let objectType = playerInput.getItemType(currentLocationData.getObjects(),userInput);

            gameCommand(inputType, objectType);
        }
    }
}

function gameCommand(inputType, objectType)
{
    switch(inputType)
    {
        case("look"):
        {
            currentLocationData.look(objectType)
            break;
        }
        case("grab"):
        {
            let item = currentLocationData.interact(objectType)
            console.log(item);
            break;
        }
        case("move"):
        {
            currentLocationData.move(objectType)
            break;
        }
        default:
        {
            printData("I dont know what you are talking about",thought);
            break;
        }
    }
}
function updateMouse(type)
{
    for(let i = 0; i < currentLocationData.objects.length; i++)
    {
        for(let j =0; j < currentLocationData.objects[i].occupies.length; j++)
        {
            console.log("i"+currentLocationData.objects[i].occupies[j]);
            document.getElementById("i"+currentLocationData.objects[i].occupies[j]).style.cursor = type;
        }
    }

}

function setSelection(selection){

document.getElementById("interact").style.background = "";
    document.getElementById("move").style.background = "";
    document.getElementById("look").style.background = "";

    document.getElementById(selection).style.background = "red";

    switch (selection)
    {
        case("look"): {
            updateMouse("zoom-in");
            imageInput = "look";
            break;
        }
        case("interact"):{
            updateMouse("grab");
            imageInput = "grab";
            break;
        }
        case("move"):{
            updateMouse("crosshair");
            imageInput = "move";
            break;
        }
    }
}
function imageClick(imageLocation)
{
    if(!(imageInput === ""))
    {
        let intImageLocation = parseInt(imageLocation.substring(1));
        document.getElementById(imageLocation).style.background = "green";
        document.getElementById(imageLocation).style.opacity = 1;
        console.log(imageLocation);
        let object = playerInput.lookLocation(currentLocationData.getObjects(),intImageLocation);

        gameCommand(imageInput,object);
    }

}

function printData(message, itemId){
    console.log("Message: "+message+" Id: "+itemId);
    let printedMessage = document.createElement("div");
    printedMessage.innerText =message;
    printedMessage.id = itemId;
    document.getElementById("chatBox").appendChild(printedMessage);
}

function travel(locationToTravel)
{
    currentLocation = locationToTravel;
    switch(locationToTravel)
    {
        case(outsideLocation.name):
        {
            currentLocationData = outsideLocation;
            break;
        }
        case(barnLocation.name):
        {
            currentLocationData = barnLocation;
            break;
        }
        case(frontHouseLocation.name):
        {
            currentLocationData = frontHouseLocation;
            break;
        }
    }
    document.getElementById("img").src = currentLocationData.image;
    currentLocationData.look("default");
}
