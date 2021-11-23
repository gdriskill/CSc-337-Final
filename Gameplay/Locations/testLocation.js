

class outside extends tempClass{
    grass = {id: ["grass"], open: true, occupies: [41,42,43,44,45,46,47,48,49,52,53,54,55,56,57,60,61,62,63,64]}
    sign = {id: ["sign"], occupies: [50, 51, 58, 59]}
    house = {id: ["house"], locked: true, occupies: [12, 13,14,15,16,20,21,22,23,24,28,29,30,31,32,36,37,38,39,40]}

    barn = {id: ["barn"], locked: true, occupies: [25,26,27,33,34,35]}
    //houseDoor = {id: ["house door","left door"], locked: true, occupies: [1, 2]}
    //barnDoor = {id: ["barn door","right door"], locked: true, occupies: [1, 2]}
    //defaultDoor = {id: ["door"], open: true, occupies: [1, 2]}



    image = "../images/test.png";

    objects = [this.grass,this.barn,this.house, this.sign];

    name = "outside";

    look(item)
    {
        switch(item) {
            //Look Grass
            case(this.grass.id[0]): {
                printData("You bend down and take a closer look at the grass", thought);
                printData("Its grass.", thought);

                printData("Hello?", saying);
                break;
            }
            // //Look Unknown Door
            // case(this.defaultDoor.id[0]):
            // {
            //     printData("There are two doors", "Cool");
            //     printData("Which one are you talking about", "Cool");
            //     break;
            // }

            //Look House -> Look House Door
            case(this.house.id[0]):
            {
                printData("The house is massive", thought);
                printData("It looks really cool and awesome :)", thought);
                break;
            }
            //Look House Door
            // case(this.houseDoor.id[0]):
            // {
            //     if(!this.houseDoor.open)
            //     {
            //         printData("The house door seems to be locked", thought);
            //     }
            //     else
            //     {
            //         printData("The house door is unlocked", thought);
            //     }
            //     break;
            // }
            // //Look Barn Door
            // case(this.barnDoor.id[0]):
            // {
            //     printData("Its a barn door", thought);
            //     break;
            // }
            //Look at Sign
            case(this.sign.id[0]):
            {
                printData("Its a sign", thought);
                break;
            }

            //Look Barn
            case(this.barn.id[0]):
            {
                printData("Its an old barn.", thought);
                break;
            }
            //Look Default
            case("default"):
            {
                printData("You see a house and a barn in an open field of grass.", thought);
                printData("There is also a chair here", thought);
                break;
            }
            //Unknown Look
            default:
            {
                printData("I dont understand what you want me to look at",thought);
                break;
            }
        }
    }
    move(location)
        {
            switch(location) {
                //Interact with barn/barn door
                case(this.barn.id[0]):
                {
                    printData("You enter the barn", thought);
                    travel("barn");
                    break;
                }
                //Interact With House/House Door
                case(this.house.id[0]):
                {
                    travel("frontOfHouse");
                    break;
                }
                //Unknown Interaction
                default:{
                    printData("I can't go there", thought);
                    break;
                }
            }
        }
    interact(item)
    {
        switch(item) {
            //Interact with barn/barn door
            case(this.barn.id[0]):
            {
                printData("I can't pick up the barn", thought);
                break;
            }
            //Interact With House/House Door
            case(this.house.id[0]):
            {
                printData("I can't pick up the house", thought);
                break;
            }
            //Unknown Interaction
            default:{
                printData("I'm not taking that", thought);
                break;
            }
        }
    }
}