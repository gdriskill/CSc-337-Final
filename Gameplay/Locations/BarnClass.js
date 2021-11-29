class barn extends tempClass {
    name = "barn";
    houseKey = inventory.getItemData("Front House Key");
    bread = inventory.getItemData("Bread");
    objects = [this.bread,this.houseKey,this.exit];

    image = "../images/BarnInside.png";
    look(item){
        switch(item)
        {
            case(this.bread.id[0]):{
                if(!inventory.hasItem(this.bread.id[0]))
                {
                    printData("Its a whole loaf of bread",thought);

                }
                break;
            }
            case(this.houseKey.id[0]):
            {
                if(!inventory.hasItem(this.houseKey.id[0]))
                {
                    printData("It look like a key on the floor",thought);

                }
                break;
            }

            case("default"):
            {
                printData("Its an old wooden barn",thought);
                if(!inventory.hasItem(this.bread.id[0]))
                {
                    printData("You look down and notice something strange",thought);
                    printData("There is a loaf of bread on the ground.",thought);
                    if(!inventory.hasItem(this.houseKey.id[0]))
                    {
                        printData("You also see something shining",thought);
                    }
                }
                else
                {
                    printData("There used to be a loaf of bread on the ground.",thought);
                    printData("Now its mine.",thought);
                    if(!inventory.hasItem(this.houseKey.id[0]))
                    {
                        printData("You still see something shining on the floor",thought);
                    }
                }
                break;
            }
            default:{
                printData("I dont understand what you want me to look at",thought);
                break;
            }
        }
    }
    move(location)
    {
        switch(location){
            case("exit"):
            {
                printData("You leave the barn", action);
                travel("outside");
                break;
            }
            default:{
                printMoveError();
            }
        }
    }
    interact(item){
        switch(item)
        {
            //Bread
            case(this.bread.id[0]):{
                inventory.pickUp(this.bread.id[0]);
                break;
            }
            case(this.houseKey.id[0]):{
                inventory.pickUp(this.houseKey.id[0]);
                break;
            }
            default:
            {
                printPickUpError();
                break;
            }
        }

    }
}