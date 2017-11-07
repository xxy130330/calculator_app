var inputElementArr = [];





$(document).ready(initiateApp);

function initiateApp() {
    $('.number').click(handleNumInput);
    $('.operator').click(handleOperatorInput);
    $('.dot').click(handleDotInput);
    $('.equal').click(handleEqualInput);
    $('.delete').click(handleDeletePartial);
    $('.deleteEverything').click(handleDeleteAll);
    handleAllInput(inputElementArr);
}

function display(){

}

function handleAllInput(arr) {
    for(var i=0; i< arr.length; i++){
        if(!isNaN(arr[i])){

        }
    }
}

function handleNumInput() {
    var numInput = $(this).text();
    inputElementArr.push(numInput);
}

function handleOperatorInput() {
    var opInput = $(this).text();
    inputElementArr.push(opInput);
}

function handleDotInput() {
    var dot = $(this).text();

}

function handleEqualInput() {
    var equalSign = $(this).text();

}

function handleDeletePartial() {
    var del = $(this).text();

}

function handleDeleteAll() {
    var deleteAll = $(this).text();
}