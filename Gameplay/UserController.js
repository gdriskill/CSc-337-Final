const look = ["look","see","stare","view"];
const grab = ["grab","take","pick up","acquire","open"];
const move = ["move","go to","leave","enter"];
const listOfCommands = [look,grab,move];

class userController
{
    defaultCommand(userInput)
    {
        for(let i = 0; i < listOfCommands.length; i++)
        {
            for(let j = 0; j < listOfCommands[i].length; j++)
            {

                if(userInput.toLowerCase() === listOfCommands[i][j])
                {
                    return true;
                }
            }
        }
        return false;
    }

    //Gets object at location
    lookLocation(objects, imageLocation)
    {
        for(let i = 0; i < objects.length; i++)
        {
            for(let j = 0; j < objects[i].occupies.length; j++)
            {
                if(imageLocation ===(objects[i].occupies[j]) && (!objects[i].pickedUp))
                {
                    return(objects[i].id[0]);
                }
            }
        }
        return "default";
    }

    getInputType(userInput)
    {
        for(let i = 0; i < listOfCommands.length; i++)
        {
            for(let j = 0; j < listOfCommands[i].length; j++)
            {

                if(userInput.toLowerCase().includes(listOfCommands[i][j]))
                {
                    return(listOfCommands[i][0]);
                }
            }
        }
        return "not cool";
    }
    getItemType(objects,userInput)
    {
        for(let i = 0; i < objects.length; i++)
        {
            for(let j = 0; j < objects[i].id.length; j++)
            {
                if(userInput.toLowerCase().includes(objects[i].id[j]))
                {
                    console.log(objects[i].id[0]);
                    return(objects[i].id[0]);
                }
            }
        }
        if(this.defaultCommand(userInput))
        {
            return "default";
        }

        return "";
    }


}