class bookRoom extends tempClass{
    name = "bookRoom";
    atlas = inventory.getItemData("Atlas Book");
    alchemy = inventory.getItemData("Alchemy Book");
    cryptography = inventory.getItemData("Cryptography Book");

    bookDoor = {id: ["bookDoor"], locked: true, occupies: [18,19,26,27,34,35,42,43]}
    objects = [this.atlas,this.alchemy,this.cryptography,this.bookDoor,this.exit];
    image = "../images/BookRoom.png";

    look(item)
    {
        switch (item){
            case(this.atlas.id[0]):
            {
                printData("It says atlas",thought);
                break;
            }
            case(this.alchemy.id[0]):
            {
                printData("It says alchemy",thought);
                break;
            }

            case(this.cryptography.id[0]):
            {
                printData("It says cryptography",thought);
                break;
            }

            default:
            case("default"):{
                printData("Cold room",thought);
                break;
            }
        }
    }

    move(location)
    {
        switch(location){
            case(this.bookDoor.id[0]):
            {
                if(this.bookDoor.locked)
                {
                    printData("You turn the door handle but it doesn't move", action);
                    printData("Seems like the door is locked but you dont see a way to unlock it", thought);
                }
                else
                {
                travel("hallway");
                }
                break;
            }
            case("exit"):
            {
                printData("You turn around and try to open the door", action);
                printData("You try turning the handle but it wont move", action);
                printData("The door's locked", thought);
                break;
            }
            default:{
                printMoveError();
            }
        }
    }
    interact(item) {
        switch (item)
        {
            case(this.cryptography.id[0]):
            {


                playerBook = this.cryptography.id[0];
                inventory.pickUp(this.cryptography.id[0]);

                inventory.removeImage(inventory.getItemData(this.atlas.id[0]));
                inventory.getItemData(this.atlas.id[0]).pickedUp = true;

                inventory.removeImage(inventory.getItemData(this.alchemy.id[0]));
                inventory.getItemData(this.alchemy.id[0]).pickedUp = true;

                console.log(inventory.getItemData(this.atlas.id[0]));
                console.log(inventory.getItemData(this.cryptography.id[0]));
                this.bookDoor.locked =false;


                let random = Math.floor(Math.random() * 2);
                printData(random,saying);
                switch (random){
                    case(0):{
                        puzzleRoom = "mazeRoom";
                        break;
                    }
                    case(1):
                    {
                        puzzleRoom = "alchemyRoom";
                        break;
                    }
                }
                break;

            }
            case(this.alchemy.id[0]):
            {
                playerBook = this.alchemy.id[0];
                inventory.pickUp(this.alchemy.id[0]);

                inventory.removeImage(inventory.getItemData(this.atlas.id[0]));
                inventory.getItemData(this.atlas.id[0]).pickedUp = true;

                inventory.removeImage(inventory.getItemData(this.cryptography.id[0]));
                inventory.getItemData(this.cryptography.id[0]).pickedUp = true;
                this.bookDoor.locked =false;


                let random = Math.floor(Math.random() * 2);
                printData(random,saying);
                switch (random){
                    case(0):{
                        puzzleRoom = "mazeRoom";
                        break;
                    }
                    case(1):
                    {
                        puzzleRoom = "codeRoom";
                        break;
                    }
                }
                puzzleRoom = "alchemyRoom";
                break;
            }
            case(this.atlas.id[0]):
            {
                playerBook = this.atlas.id[0];
                inventory.pickUp(this.atlas.id[0]);

                inventory.removeImage(inventory.getItemData(this.alchemy.id[0]));
                inventory.getItemData(this.alchemy.id[0]).pickedUp = true;

                inventory.removeImage(inventory.getItemData(this.cryptography.id[0]));
                inventory.getItemData(this.cryptography.id[0]).pickedUp = true;
                this.bookDoor.locked =false;


                let random = Math.floor(Math.random() * 2);
                printData(random,saying);
                switch (random){
                    case(0):{
                        puzzleRoom = "alchemyRoom";
                        break;
                    }
                    case(1):
                    {
                        puzzleRoom = "codeRoom";
                        break;
                    }
                }
                break;
            }
            default:
            {
                printPickUpError();
            }

        }
    }
}