class bedroom extends tempClass {
    name = "bedroom";
    container = {id: ["container"], locked: false, occupies: [46]}
    objects = [this.container,this.exit];

    image = "../images/Bedroom.png";
    move(location) {
        switch (location) {
            case("exit"): {
                travel("hallway");
            }
        }
    }
    interact(item) {
        switch (item){
            case(this.container.id[0]):
            {
                inventory.pickUp("Mystery Key");
                break;
            }

        }
    }
}