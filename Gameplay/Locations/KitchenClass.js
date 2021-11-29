class kitchen extends tempClass {
    name = "kitchen";
    objects = [this.exit];

    image = "../images/Kitchen.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
            }
        }
    }
}
