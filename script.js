$(document).ready(initiateApp);

function initiateApp() {
    $('.number').click(numberInput);
    $('.operator').click(operatorInput);
    $('.dot').click(dotInput);
    $('.equal').click(equalInput);
    $('.delete').click(deletePartial);
    $('.deleteEverything').click(deleteAll);
}



function numberInput() {
    var numInput = $(this).text();
}

function operatorInput() {
    var opInput = $(this).text();

}

function dotInput() {
    var dot = $(this).text();

}

function equalInput() {
    var equalSign = $(this).text();

}

function deletePartial() {
    var del = $(this).text();

}

function deleteAll() {
    var deleteAll = $(this).text();
}