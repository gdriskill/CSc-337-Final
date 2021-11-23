class barn extends tempClass {
    name = "barn";

    barnDoor = {id: ["barn door","right door"], locked: true, occupies: [1, 2]}
    bread = {id: ["bread"], locked: true, pickedUp: false, occupies: [1, 2]}
    objects = [this.bread,this.barnDoor];

    image = "../images/FrontDoor.png";
    
    look(item){
        switch(item)
        {
            case(this.bread.id[0]):{
                printData("Its bread",thought);
                break;
            }
            case("default"):
            {
                printData("Its an old wooden barn",thought);
                if(!this.bread.pickedUp)
                {
                    printData("You look down and notice something strange",thought);
                    printData("There is a single slice of bread on the ground.",thought);
                }
                else
                {
                    printData("There used to be a slice of bread on the ground.",thought);
                    printData("Now its mine.",thought);
                }
                break;
            }
            default:{
                printData("I dont understand what you want me to look at",thought);
                break;
            }
        }
    }
    interact(item){
        switch(item)
        {
            case(this.bread.id[0]):{
                if(!this.bread.pickedUp)
                {
                    printData("You Picked Up The Bread",thought);
                    this.bread.pickedUp = true;
                    return this.bread;
                }
                else
                {
                    printData("You already picked up the bread in this room",thought);
                }

                break;
            }
            case(this.barnDoor.id[0]):
            {
                printData("You leave the barn", thought);
                travel("outside");
                break;
            }
            default:
            {
                printData("I don't see that item", thought);
                break;
            }
        }

    }


}