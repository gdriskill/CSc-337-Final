class frontOfHouse extends tempClass{
    name = "frontOfHouse";
    houseDoor = {id: ["houseDoor"], locked: true, occupies: [12,13,20,21,28,29,36,37,44,45,52,53]}
    objects = [this.houseDoor,this.exit];
    image = "../images/FrontDoor.png";

look(item)
{
    switch (item){
        default:
        case("default"):{
            printData("It an old wooden door",thought);
            break;
        }
    }
}

    move(location)
    {
        switch(location){
            case(this.houseDoor.id[0]):
            {
                if(this.houseDoor.locked)
                {
                    printData("You turn the door handle but it doesn't move", action);
                    printData("I can't enter the house the door is locked", thought);
                }
                else
                {
                    printData("You turn the handle of the door and enter the house", action);
                    travel("bookRoom");
                    printData("The door closes behind you and you hear a click noise", action);
                }
                break;
            }
            case("exit"):
            {
                printData("You leave the front of the house", action);
                travel("outside");
                break;
            }
            default:{
                printMoveError();
            }
        }
    }

    itemInteract(item, gameObject)
    {
    switch(gameObject){
        case(this.houseDoor.id[0]):
        {
            if(item === "Bread")
            {
                printData("You push the bread into the door",action);
                printData("It does nothing",action);
            }
            else if (item === "Front House Key" && this.houseDoor.locked)
            {
                printData("You put the key into the door and turn",action);
                printData("The key snaps as you turn in",action);
                printData("\"CLICK\"",saying);
                printData("The door seems to be unlocks",thought);

                this.houseDoor.locked = false;
                inventory.useItem("Front House Key");
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