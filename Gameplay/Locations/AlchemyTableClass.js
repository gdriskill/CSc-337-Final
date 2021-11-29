class alchemyTableClass extends tempClass {
    name = "alchemyTable";
    cauldron = {id: ["cauldron"], occupies: [35,36,37,38,43,44,45,46,51,52,53,54]};
    bluePotion = inventory.getItemData("Blue Potion");
    redPotion = inventory.getItemData("Red Potion");
    greenPotion = inventory.getItemData("Green Potion");

    objects = [this.bluePotion,this.redPotion,this.greenPotion,this.cauldron,this.exit];


    image = "../images/AlchemyTable.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("alchemyRoom");
                break;
            }
            default:{
                printMoveError();
            }
        }
    }
    interact(item) {
        switch(item){
            case(this.bluePotion.id[0]):{
                inventory.pickUp(this.bluePotion.id[0]);
                break;
            }
            case(this.redPotion.id[0]):{
                inventory.pickUp(this.redPotion.id[0]);
                break;
            }
            case(this.greenPotion.id[0]):{
                inventory.pickUp(this.greenPotion.id[0]);
                break;
            }
        }
    }
    itemInteract(playerItem, item) {
        switch(item)
        {
            case(this.cauldron.id[0]):{
                currentMix.push(playerItem);
            if(currentMix.length === 5)
            {
                if(currentMix.toString() === "Red Potion,Red Potion,Blue Potion,Green Potion,Blue Potion")
                {
                    printData("You did it",thought)
                    inventory.useItem("Red Potion");
                    inventory.useItem("Blue Potion");
                    inventory.useItem("Green Potion");
                    inventory.pickUp("Cure Potion");

                }
                else
                {
                    printData("Down Vote",thought)
                    currentMix = [];
                }
            }
            printData(currentMix.toString(),thought);
            break;

            }
        }
    }
}