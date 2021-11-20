const solution = [
    [null, null,null,null,null,null,null,null,null,null,null,"f",null,null,null],
    [null, null,null,null,null,null,null,null,null,null,null,"r",null,null,null],
    ["t", null,null,null,null,null,"r",null,null,null,null,"e",null,null,null],
    ["i", null,null,null,null,null,"e",null,null,null,null,"e",null,null,null],
    ["m", null, null, null, null, null,"i",,null,null,null,"w",null,null,null],
    ["e", "x", "i", "s", "t", "e", "n", "t", "i", "a", "l", "i", "s", "m",null],
    ["w", null,null,null,null,null,"c",null,null,null,null,"l",null,null,null],
    ["a", null,null,null,null,null,"a",null,null,null,null,"l","o","o","p"],
    ["r", null,null,null,null,null,"r",null,null,null,null,null,null,null,null],
    ["p", null,null,null,null,null,"n",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,null,"a",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,null,"t",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,"n","i","g","h","t","m","a","r","e",null],
    [null, null,null,null,null,null,"o",null,null,null,null,null,null,null,null],
    [null, null,null,null,null,"i","n","f","i","n","i","t","y",null,null]
];


function checkBoard(){
    correct = 0;
    total = 0
    allInputs = $("input");
    $.each(allInputs, function(i){
        input = allInputs[i];
        idSplit = input.id.split(",");
        row = parseInt(idSplit[0]);
        col = parseInt(idSplit[1]);
        expected = solution[row][col];
        if(expected == input.value){
            correct ++;
        }
        total ++;
    })
    percent = correct/total *100;
    $("#results").text(percent);
}