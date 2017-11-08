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


function handleAllInput(arr) {
    for(var i=0; i<arr.length; i++){
        if(!isNaN(arr[i]) && !isNaN(arr[i+1])){
            arr[i] = '' + arr[i] + arr[i+1];
            arr.splice(i+1,1);
            i--;
        }
    }
}

function handleNumInput() {
    var numInput = $(this).text();
    $('#expression').append(numInput);
    inputElementArr.push(numInput);
    handleAllInput(inputElementArr);
}

function handleOperatorInput() {
    var opInput = $(this).text();
    $('#expression').append(opInput);
    if(checkFirstElementAtInputArr()) {
        inputElementArr.push(opInput);
        handleAllInput(inputElementArr);
    }
}

function handleDotInput() {
    var dot = $(this).text();
    $('#expression').append(dot);
    inputElementArr.push(dot);
    handleAllInput(inputElementArr);
}

function handleEqualInput() {
    var equalSign = $(this).text();
    if(checkFirstElementAtInputArr()) {
        inputElementArr.push(equalSign);
    }
}

function handleDeletePartial() {
    $('#expression button').last().remove();
}

function handleDeleteAll() {
    $('#expression').empty();
    inputElementArr=[];
}

function checkFirstElementAtInputArr() {
    if(inputElementArr[0] == null){
        return true;
    }
}
// var cal = new calculator(newFunc)
// var val =$(this).click()
//
//
// function newFunc(type, value, item) {
//         $('#displayArea').text(value);
// }
//
// $(document).ready(initiateApp);
// function initiateApp() {
//     $('.number').click(handleNumInput);
//     $('.operator').click(handleOperatorInput);
//     $('.dot').click(handleDotInput);
//     $('.equal').click(handleEqualInput);
//     $('.delete').click(handleDeletePartial);
//     $('.deleteEverything').click(handleDeleteAll);
//     var val = $(this).text();
//     handleAllInput(inputElementArr);
// }