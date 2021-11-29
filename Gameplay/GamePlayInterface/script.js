
const action = "action";
const error = "error";
const saying = "saying";
const thought = "thought";
let playerBook;
let puzzleRoom;
let outsideLocation = new outside();
let barnLocation = new barn();
let frontHouseLocation = new frontOfHouse();
let enterPuzzleRoom = false;
let bookRoomLocation = new bookRoom();
let hallWayLocation = new hallway();
let kitchenLocation = new kitchen();

let bathroomLocation = new bathroom();

let livingRoomLocation = new livingRoom();

let bedroomLocation = new bedroom();

let alchemyRoomLocation = new alchemyRoom();

let alchemyTableLocation = new alchemyTableClass();

let mazeRoomLocation = new mazeRoom();
let codeRoomLocation = new codeRoom();

let currentLocation = outsideLocation.name;
let currentLocationData = outsideLocation;
let playerInput = new userController();

let playerInventory = inventory;
let currentMix = [];
currentLocationData.look("default");

let currentItem = "";

let imageInput = "";

 function getInput(){
// console.log("Hey");
//     document.getElementById("userInput").onkeydown = function (e){
//         let userInput = document.getElementById("userInput").value.trim();
//         if(!e) {e = window.event;}
//         var keyCode = e.code || e.key;
//         if(keyCode === 'Enter'){
//             document.getElementById("userInput").value = "";
//
//             printData(userInput,action);
//
//             let inputType = playerInput.getInputType(userInput);
//             let objectType = playerInput.getItemType(currentLocationData.getObjects(),userInput);
//
//             gameCommand(inputType, objectType);
//         }
//     }
 }

function gameCommand(inputType, objectType)
{
    console.log("Item:"+currentItem);
    console.log(inputType+" "+objectType);
    switch(inputType)
    {
        case("look"):
        {
            currentLocationData.look(objectType)
            break;
        }
        case("grab"):
        {
            let item = currentLocationData.interact(objectType);
            updateMouse("grab");
            break;
        }
        case("move"):
        {
            currentLocationData.move(objectType)
            break;
        }
        case("itemInteract"):
        {
            currentLocationData.itemInteract(currentItem,objectType);
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
            if(!currentLocationData.objects[i].pickedUp) {
                document.getElementById("i" + currentLocationData.objects[i].occupies[j]).style.cursor = type;
            }
            else
            {
                document.getElementById("i" + currentLocationData.objects[i].occupies[j]).style.cursor = "";
            }
        }
    }
}

//This will set the selection for the current interaction
function setSelection(selection){

     //Sets all interactions to blank
    document.getElementById("interact").style.background = "";
    document.getElementById("move").style.background = "";
    document.getElementById("look").style.background = "";

    //Sets all item interactions to blank
    let inventoryItems = document.getElementsByClassName("playerItem");
    for(let i = 0; i<inventoryItems.length; i++) {
        document.getElementsByClassName("playerItem")[i].style.background = "";
    }

    console.log("Test: "+selection);
    //Test which interaction is selected
    switch (selection)
    {
        //Interaction Look
        case("look"): {
            document.getElementById(selection).style.background = "red";
            currentItem = "";
            updateMouse("zoom-in");
            imageInput = "look";
            break;
        }
        //Interaction interact
        case("interact"):{
            document.getElementById(selection).style.background = "red";
            currentItem = "";
            updateMouse("grab");
            imageInput = "grab";
            break;
        }
        //Interaction move
        case("move"):{
            document.getElementById(selection).style.background = "red";
            currentItem = "";
            updateMouse("crosshair");
            imageInput = "move";
            break;
        }
        //Interaction none
        case(null):
        case(""):{
            currentItem = "";
            updateMouse("");
            imageInput = "";
            break;
        }
        //Interaction inventory item
        default:{
            printData(inventory.itemData(selection),thought);
            document.getElementById(selection).style.background = "red";
        }
    }
}

//This will select the item in the inventory (When user clicks on item in inventory)
function selectItem(item)
{
    //Colors the item
    setSelection(item);

    //sets the mouse icons
    updateMouse("grabbing");

    //Sets the current item
    currentItem = item;

    //Sets the input type
    imageInput="itemInteract";
}

function imageClick(imageLocation)
{
    // alert("Click");

    // document.getElementById('chatBox').scrollTop();
    if(!(imageInput === ""))
    {
        let intImageLocation = parseInt(imageLocation.substring(1));
        // document.getElementById(imageLocation).style.background = "green";
        //document.getElementById(imageLocation).style.opacity = 1;
        let object = playerInput.lookLocation(currentLocationData.getObjects(),intImageLocation);

        gameCommand(imageInput,object);
        var element = document.getElementById('chatBox');
        element.scrollTop = element.scrollHeight;
    }

}
function printMoveError()
{
    let printedMessage = document.createElement("div");
    printedMessage.innerText = "I can't go there";
    printedMessage.id = error;
    document.getElementById("chatBox").appendChild(printedMessage);
}

function printPickUpError()
{
    //console.log("Message: "+message+" Id: "+itemId);
    let printedMessage = document.createElement("div");
    printedMessage.innerText = "I can't pick that up";
    printedMessage.id = error;
    document.getElementById("chatBox").appendChild(printedMessage);
}



function printData(message, itemId){
    console.log("Message: "+message+" Id: "+itemId);
    let printedMessage = document.createElement("div");
    printedMessage.innerText =message;
    printedMessage.id = itemId;
    document.getElementById("chatBox").appendChild(printedMessage);
    var element = document.getElementById('chatBox');
    element.scrollTop = element.scrollHeight;
}

function travel(locationToTravel)
{
    inventory.removeImageLocation(currentLocationData.name);
    updateMouse("");
    currentLocation = locationToTravel;
    switch(locationToTravel)
    {
        case(outsideLocation.name):
        {
            currentLocationData = outsideLocation;
            document.body.style.backgroundColor = "#020a02";
            break;
        }
        case(barnLocation.name):
        {
            currentLocationData = barnLocation;
            document.body.style.backgroundColor = "#0c0303";
            break;
        }
        case(frontHouseLocation.name):
        {
            currentLocationData = frontHouseLocation;
            document.body.style.backgroundColor = "#0c0303";
            break;
        }
        case(bookRoomLocation.name):
        {
            currentLocationData = bookRoomLocation;
            document.body.style.backgroundColor = "#000205";
            break;
        }
        case(hallWayLocation.name):
        {
            currentLocationData = hallWayLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(kitchenLocation.name):
        {
            currentLocationData = kitchenLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(bathroomLocation.name):
        {
            currentLocationData = bathroomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(livingRoomLocation.name):{
            currentLocationData = livingRoomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(bedroomLocation.name):{
            currentLocationData = bedroomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(alchemyRoomLocation.name):{
            currentLocationData = alchemyRoomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(mazeRoomLocation.name):{
            currentLocationData = mazeRoomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(codeRoomLocation.name):{
            currentLocationData = codeRoomLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
        case(alchemyTableLocation.name):{
            currentLocationData = alchemyTableLocation;
            document.body.style.backgroundColor = "#03090c";
            break;
        }
    }


    document.getElementById("backgroundImage").src = currentLocationData.image;
    inventory.setImages(currentLocationData.name);
    currentLocationData.look("default");
    updateMouse("crosshair");
}
