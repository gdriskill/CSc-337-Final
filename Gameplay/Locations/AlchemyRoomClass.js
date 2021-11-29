class alchemyRoom extends tempClass {
    name = "alchemyRoom";
    tradePit = {id: ["tradePit"], occupies: [53,54,55,45,46,47]}
    badEndingDoor = {id: ["badEndingDoor"], occupies: [18,19,26,27,34,35,42,43]}

    goodEndingDoor = {id: ["goodEndingDoor"], occupies: [21,22,23,29,30,31,37,38,39]}

    alchemyTable = {id: ["alchemyTable"], occupies: [35,36,43,44]}

    objects = [this.goodEndingDoor,this.alchemyTable,this.badEndingDoor,this.tradePit,this.exit];

    image = "../images/AlchemyRoom.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
                break;
            }
            case(this.alchemyTable.id[0]):
            {
                if(inventory.alchemyBook.inInventory)
                {
                    travel("alchemyTable");
                }
                else
                {
                    printData("It's an alchemy table, I don't know alchemy",thought);
                    printData("If only I picked up that alchemy book in the other room. There must be another way for me to get it",thought);
                }
                break;
            }
            case(this.badEndingDoor.id[0]):{
                confirm("Are you sure?\nThis option will end the game.");
                break;
            }
            default:{
                printMoveError();
            }
        }
    }
    itemInteract(playerItem, item) {
        switch (item){
            case(this.goodEndingDoor.id[0]):{
                if(playerItem === inventory.curePotion.id[0])
                {
                    printData("You win");
                    travel("outside");
                }
            }
        }
    }
}