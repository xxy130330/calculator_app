var inputElementArr = [];

$(document).ready(initiateApp);

function initiateApp() {
    $('.number').click(handleNumInput);
    $('.operator').click(handleOperatorInput);
    $('.dot').click(handleDotInput);
    $('.equal').click(handleEqualInput);
    $('.delete').click(handleDeletePartial);
    $('.deleteEverything').click(handleDeleteAll);
    handleAllInputConcat(inputElementArr);
}

function runCalculation(arr) {
    for (var i =0; i<arr.length; i++){
        if(arr[i] == '*' || arr[i] == '/'){
            if(arr[i] == '*'){
                arr[i-1] = parseFloat(arr[i-1]) * parseFloat(arr[i+1]);
            }else{
                arr[i-1]=parseFloat(arr[i-1]) / parseFloat(arr[i+1]);
            }
            arr.splice(i, 2);
            i=i-2;
        }
    }
    for (var i = 0; i<arr.length; i++){
        if(arr[i] == '+' || arr[i] == '-') {
            if(arr[i] == '+'){
                arr[i-1] = parseFloat(arr[i-1]) + parseFloat(arr[i+1]);
            }else{
                arr[i-1]=parseFloat(arr[i-1]) - parseFloat(arr[i+1]);
            }
            arr.splice(i, 2);
            i=i-2;
        }
    }
    $('#result').append(arr[0]);
    return arr[0];
}

function handleAllInputConcat(arr) {
    for(var i=0; i<arr.length; i++){
        if(!isNaN(arr[i]) && !isNaN(arr[i+1]) && arr[i] !== '.' && arr[i+1] !== '.'){
            arr[i] = '' + arr[i] + arr[i+1];
            arr.splice(i+1,1);
            i--;
        }
    }
    if(arr.indexOf('.') !== -1) {
        var dotLocation = arr.indexOf('.');
        if(dotLocation !== 0) {
            arr[dotLocation - 1] = '' + arr[dotLocation - 1] + arr[dotLocation];
            arr.splice(dotLocation, 1);
            if (!isNaN(arr[dotLocation])) {
                arr[dotLocation - 1] = '' + arr[dotLocation - 1] + arr[dotLocation];
            }
        }else {
            if (!isNaN(arr[dotLocation+1]) || arr[dotLocation+1] !==undefined) {
                arr[dotLocation] = '' + arr[dotLocation] + arr[dotLocation + 1];
                arr.splice(dotLocation + 1, 1);
            }
        }
    }
    if(arr.indexOf('%') !== -1) {
        var percentageLocation = arr.indexOf('%');
        if(arr[percentageLocation-1] !==undefined){
            arr[percentageLocation-1] = arr[percentageLocation-1]/100;
            arr.splice(percentageLocation, 1);
        }
    }
}

function handleNumInput() {
    var numInput = $(this).text();
    $('#expression').append(numInput);
    inputElementArr.push(numInput);
    handleAllInputConcat(inputElementArr);
}

function handleOperatorInput() {
    var opInput = $(this).text();
    $('#expression').append(opInput);
    if(checkFirstElementAtInputArr() || opInput === "-") {
        var temp = inputElementArr[inputElementArr.length-1];
        if(!isNaN(temp)){
            inputElementArr.push(opInput);
            handleAllInputConcat(inputElementArr);
        }else{
            inputElementArr.splice(inputElementArr.length-1, 1);
            inputElementArr.push(opInput);
            handleAllInputConcat(inputElementArr);
        }
    }
}

function handleDotInput() {
    var dot = $(this).text();
    $('#expression').append(dot);
    inputElementArr.push(dot);
    handleAllInputConcat(inputElementArr);
}


function handleEqualInput() {
    if(checkFirstElementAtInputArr()) {
        runCalculation(inputElementArr);
    }
}

function handleDeletePartial() {
    var temp = inputElementArr[inputElementArr.length-1];
    inputElementArr.pop();

}

function handleDeleteAll() {
    $('#expression').empty();
    $('#result').empty();
    inputElementArr=[];
}

function checkFirstElementAtInputArr() {
    if(inputElementArr[0] !== undefined){
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