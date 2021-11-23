class frontOfHouse extends tempClass{
    name = "frontOfHouse";
    barnDoor = {id: ["barn door","right door"], locked: true, occupies: [1, 2]}
    bread = {id: ["bread"], locked: true, pickedUp: false, occupies: [1, 2]}
    objects = [this.bread,this.barnDoor];
    image = "../images/FrontDoor.png";

look(item)
{
    switch (item){
        case("default"):{
            printData("Cool epic",thought);
            break;
        }
        default:{
            printData("test",thought);
            break;
        }
    }
}
}