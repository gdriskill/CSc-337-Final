class codeRoom extends tempClass {
    name = "codeRoom";
    tradePit = {id: ["tradePit"], occupies: [53,54,55,45,46,47]}
    badEndingDoor = {id: ["badEndingDoor"], occupies: [18,19,26,27,34,35,42,43]}
    objects = [this.badEndingDoor,this.tradePit,this.exit];

    image = "../images/CodeRoom.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
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
}