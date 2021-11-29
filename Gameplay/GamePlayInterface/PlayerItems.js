
class userItem {
    frontHouseKeyData = {id: ["Front House Key"], pickedUp: false, occupies: [55],location: "barn",imgLoc: "../images/frontHouseKey.png",inInventory:false};
    bookAtlas = {id: ["Atlas Book"], pickedUp: false, occupies: [44],location: "bookRoom",imgLoc: "../images/book.png",inInventory:false};
    alchemyBook = {id: ["Alchemy Book"], pickedUp: false, occupies: [45],location: "bookRoom",imgLoc: "../images/book.png",inInventory:false};
    cryptographyBook = {id: ["Cryptography Book"], pickedUp: false, occupies: [46],location: "bookRoom",imgLoc: "../images/book.png",inInventory:false};


    bluePotion = {id: ["Blue Potion"], pickedUp: false, occupies: [10],location: "alchemyTable",imgLoc: "../images/BluePotion.png",inInventory:false};
    redPotion = {id: ["Red Potion"], pickedUp: false, occupies: [12],location: "alchemyTable",imgLoc: "../images/RedPotion.png",inInventory:false};
    greenPotion = {id: ["Green Potion"], pickedUp: false, occupies: [15],location: "alchemyTable",imgLoc: "../images/GreenPotion.png",inInventory:false};

    curePotion = {id: ["Cure Potion"], pickedUp: false, occupies: [15],location: "",imgLoc: "../images/CurePotion.png",inInventory:false};


    breadData = {id: ["Bread"], pickedUp: false, occupies: [52],location: "barn",imgLoc: "../images/bread.png",inInventory:false};

    mysteryKeyData = {id: ["Mystery Key"], pickedUp: false, occupies: [46],location: "",imgLoc: "../images/frontHouseKey.png",inInventory:false};
    itemInfo = [this.curePotion,this.bluePotion,this.redPotion,this.greenPotion,this.breadData,this.mysteryKeyData,this.frontHouseKeyData,this.bookAtlas,this.alchemyBook,this.cryptographyBook];

    getItemData(name) {
        for (let i = 0; i < this.itemInfo.length; i++) {
            if (this.itemInfo[i].id[0] === name) {
                return this.itemInfo[i];
            }
        }
    }
    pickUp(item) {
        let currentItem = this.getItemData(item);
        if (!currentItem.pickedUp) {
            printData("You picked up the " + currentItem.id[0].toLowerCase(), action)
            currentItem.pickedUp = true;
            currentItem.inInventory = true;
            this.removeImage(currentItem);
            this.addItemToInventory(currentItem);
            return true;
        }
        printPickUpError();
        return false;
    }
    removeItem(item)
    {
        let currentItem = this.getItemData(item);
        currentItem.inInventory = false;
        // this.getItemData(item).pickedUp = false;
        document.getElementById(item).remove();

    }
    useItem(item)
    {
        this.removeItem(item);
        setSelection("");
    }
    hasItem(item) {
        return this.getItemData(item).pickedUp;
    }
    addItemToInventory(item)
    {
        let playersItem = document.createElement("img");
        playersItem.id = item.id;
        playersItem.src = item.imgLoc;
        playersItem.className = "playerItem";
        playersItem.title=item.id;
        playersItem.setAttribute('onclick',"selectItem(id);");
        document.getElementById("inventoryInside").appendChild(playersItem);
        var element = document.getElementById('inventoryInside');
        element.scrollTop = element.scrollHeight;
    }

    removeImage(item)
    {
        document.getElementById("i"+item.occupies).style.opacity = 0;
        document.getElementById("i"+item.occupies).src = "";

    }
    removeImageLocation(location)
    {
        for (let i = 0; i < this.itemInfo.length; i++) {
            if (this.itemInfo[i].location === location)
            {
                document.getElementById("i"+this.itemInfo[i].occupies[0]).style.opacity = 0;
                document.getElementById("i"+this.itemInfo[i].occupies[0]).src = "";
            }
        }
    }

    setImages(location) {
        for (let i = 0; i < this.itemInfo.length; i++) {
            if (this.itemInfo[i].location === location && !this.itemInfo[i].pickedUp)
            {
                document.getElementById("i"+this.itemInfo[i].occupies[0]).src = this.itemInfo[i].imgLoc;
                document.getElementById("i"+this.itemInfo[i].occupies[0]).style.opacity = .8;

            }
        }
    }
    itemData(item)
    {
        switch(item){
            case(this.bookAtlas.id[0]):{
                return "It an old book and it says the word \"Atlas\" on the front";
                break;
            }
            case(this.frontHouseKeyData.id[0]):{
                return "Seems to be the key for the front door";
                break;
            }
            case(this.alchemyBook.id[0]):{
                return "It an old book and it says the word \"Alchemy\" on the front";
                break;
            }
            case(this.cryptographyBook.id[0]):{
                return "It an old book and it says the word \"Cryptography\" on the front";
                break;
            }
            case(this.breadData.id[0]):{
                return "A whole loaf of bread";
                break;
            }
            case(this.mysteryKeyData.id[0]):{
                return "Seems like the key to the door in the hallway";
                break;
            }
        }
    }
}
inventory = new userItem();