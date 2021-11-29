
class livingRoom extends tempClass {
    name = "livingRoom";
    objects = [this.exit];

    image = "../images/LivingRoom.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
            }
        }
    }
}

