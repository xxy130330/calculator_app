var inputElementArr = [];
var equalCounter = 0;
var flag = true;

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
    arr = arr.filter(Boolean);
    $('#result').empty();
    for (var i =0; i<arr.length; i++){
        if(arr[i] == '*' || arr[i] == '/') {
            if (!isNaN(arr[i + 1])) {
                if (arr[i] == '*') {
                    arr[i - 1] = parseFloat(arr[i - 1]) * parseFloat(arr[i + 1]);
                } else {
                    arr[i - 1] = parseFloat(arr[i - 1]) / parseFloat(arr[i + 1]);
                }
                arr.splice(i, 2);
                i = i - 2;
            }else{
                if (arr[i] == '*') {
                    arr[i - 1] = parseFloat(arr[i - 1]) * parseFloat(arr[i - 1]);
                } else {
                    arr[i - 1] = parseFloat(arr[i - 1]) / parseFloat(arr[i - 1]);
                }
                arr.splice(i, 1);
                i = i - 1;
            }
        }
    }
    for (var i = 0; i<arr.length; i++){
        if(arr[i] == '+' || arr[i] == '-') {
            if (!isNaN(arr[i + 1])) {
                if (arr[i] == '+') {
                    arr[i - 1] = parseFloat(arr[i - 1]) + parseFloat(arr[i + 1]);
                } else {
                    arr[i - 1] = parseFloat(arr[i - 1]) - parseFloat(arr[i + 1]);
                }
                arr.splice(i, 2);
                i = i - 2;
            }else{
                if (arr[i] == '+') {
                    arr[i - 1] = parseFloat(arr[i - 1]) + parseFloat(arr[i - 1]);
                } else {
                    arr[i - 1] = parseFloat(arr[i - 1]) - parseFloat(arr[i - 1]);
                }
                arr.splice(i, 1);
                i = i - 1;
            }
        }
    }
    $('#result').append(arr[0]);
    return arr;
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
    if(arr.indexOf('0') !== -1 && arr[arr.indexOf('0')-1] === '/'){
        flag = false;
        $('#result').text('ERROR!!!');
        return;
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
    equalCounter = 0;
    if(checkFirstElementAtInputArr() || opInput === "-") {
        var temp = inputElementArr[inputElementArr.length-1];
        if(!isNaN(temp)){
            inputElementArr.push(opInput);
            handleAllInputConcat(inputElementArr);
        }else{
            inputElementArr.splice(inputElementArr.length-1, 1);
            inputElementArr.push(opInput);
            inputElementArr = handleAllInputConcat(inputElementArr);
        }
    }
}


function handleDotInput() {
    var dot = $(this).text();
    $('#expression').append(dot);
     var lastElement = inputElementArr[inputElementArr.length - 1];
     var lastCharOfLastElement = lastElement[lastElement.length-1];
    if (lastCharOfLastElement !== '.'){
    inputElementArr.push(dot);
    handleAllInputConcat(inputElementArr);
    }
}


function handleEqualInput() {
    var equal = $(this).text();
    $('#expression').append(equal);
    if(inputElementArr.length === 0){
        $('#result').text('Ready To Go!');
    }
    if (flag) {
        if (equalCounter !== 0) {
            runCalculation(multiEqualNotAtBeginning(inputElementArr));
        } else if (checkFirstElementAtInputArr()) {
            inputElementArr = runCalculation(inputElementArr);
            equalCounter++;
        }
    }

}


function multiEqualNotAtBeginning(arr) {
    var currentResult = $('#result').text();
    var newResultArr = [];
    newResultArr.push(currentResult);
    newResultArr.push(arr[arr.length-2]);
    newResultArr.push(arr[arr.length-1]);
    equalCounter++;
    $('#result').empty();
    return newResultArr;
}


function handleDeletePartial() {
    inputElementArr = inputElementArr.filter(Boolean);
    var dom = $('#expression').text();
    var indexInlastArrElement = inputElementArr[inputElementArr.length-1].length;
    if (indexInlastArrElement === 0) {
        handleDeleteAll();
    }
    else {
        if (dom[dom.length - 1] !== '%') {
            deleteLastDigit(inputElementArr, dom);
        } else {
            var arrLastElement = inputElementArr[inputElementArr.length - 1];
            inputElementArr.splice(inputElementArr.length - 1, 1);
            var percentageNum = arrLastElement * 100 + '%';
            inputElementArr.push(percentageNum);
            deleteLastDigit(inputElementArr, dom);
        }
    }
}


function deleteLastDigit(arr,domArr) {
    var arrLastElement = arr[arr.length - 1];
        arr.splice(arr.length - 1, 1);
        var lastIndexOfLastElement = arrLastElement.length - 1;
        var subStrOfArr = arrLastElement.substr(0, lastIndexOfLastElement);
        arr.push(subStrOfArr);
        var lastIndex = domArr.length - 1;
        var tempStr = domArr.substr(0, lastIndex);
        $('#expression').empty();
        $('#expression').append(tempStr);
}


function handleDeleteAll() {
    $('#expression').empty();
    $('#result').empty();
    inputElementArr=[];
    equalCounter = 0;
    flag = true;
}


function checkFirstElementAtInputArr() {
    if(inputElementArr[0] !== undefined){
        return true;
    }
}
