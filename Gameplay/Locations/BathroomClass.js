class bathroom extends tempClass {
    name = "bathroom";
    objects = [this.exit];

    image = "../images/Bathroom.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
            }
        }
    }
}