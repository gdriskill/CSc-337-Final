class hallway extends tempClass {
    name = "hallway";
    kitchen = {id: ["kitchen"], locked: false, occupies: [21,29,37]}
    livingRoom = {id: ["livingRoom"], locked: false, occupies: [15,23,31,39,47]}
    bathroom = {id: ["bathroom"], locked: false, occupies: [10,18,26,34,42,50,58]}
    bedroom = {id: ["bedroom"], locked: false, occupies: [19,27,35,43]}
    mysteryDoor = {id: ["mysteryDoor"], locked: true, occupies: [28,36]}

    objects = [this.mysteryDoor,this.bedroom,this.bathroom,this.livingRoom,this.kitchen,this.exit];

    image = "../images/Hallway.png";

    look(item) {
        switch(item){
            //Looking at doorways
            case(this.kitchen.id[0]):{
                printData("Seems to be the doorway to the kitchen",thought);
                break;
            }
            case(this.bathroom.id[0]):{
                printData("Seems to be the doorway to the bathroom",thought);
                break;
            }
            case(this.livingRoom.id[0]):{
                printData("Seems to be the doorway to the living room",thought);
                break;
            }
            case(this.bedroom.id[0]):{
                printData("Seems to be the doorway to the bedroom",thought);
                break;
            }
            case(this.mysteryDoor.id[0]): {
                printData("The door is closed I'm not sure where it goes",thought);
                break;
            }

            //Look at room
            case("default"):{
                printData("You see 5 separate rooms",thought);
                printData("2 on the left, 2 on the right, and 1 in the middle",thought);
                break;
            }
        }
    }

    move(location) {
        switch (location) {
            //Enter kitchen
            case(this.kitchen.id[0]): {
                printData("You enter the kitchen",action);
                travel("kitchen");
                break;
            }

            //Enter bathroom
            case(this.bathroom.id[0]):{
                printData("You enter the bathroom",action);
                travel("bathroom");
                break;
            }

            //Enter living room
            case(this.livingRoom.id[0]):{
                printData("You enter the living room",action);
                travel("livingRoom");
                break;
            }

            //Enter bedroom
            case(this.bedroom.id[0]):{
                printData("You walk into the bedroom",action);
                travel("bedroom");
                break;
            }

            //Enter mystery room
            case(this.mysteryDoor.id[0]):{

                //Enter room if door is unlocked
                if(this.mysteryDoor.locked)
                {
                    printData("You try to turn the handle but it won't move",action);
                    printData("Seems like the door is locked",thought);
                }
                else
                {
                    printData("You turn the handle and walk through the door",action);
                    travel(puzzleRoom);
                    enterPuzzleRoom = true;
                }
                break;
            }
            default:{
                printMoveError();
                break;
            }
        }
    }
    itemInteract(playerItem, item) {
        switch(item) {
            //Interact with mystery door
            case(this.mysteryDoor.id[0]): {
                //Use key on mystery door
                if (playerItem === "Mystery Key") {
                    printData("You put the key into the door and turn",action);
                    printData("The key snaps as you turn in",action);
                    printData("\"CLICK\"",saying);
                    printData("The door seems to be unlocks",thought);
                    this.mysteryDoor.locked =false;
                    inventory.useItem("Mystery Key");
                }
                else
                {
                    printData("I'm not using this on that",error);
                }
                break;
            }
            default:{
                printData("I'm not using this on that",error);
            }
        }
    }
}