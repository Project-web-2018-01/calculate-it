
var operators = ['/','*','-','+'];
var levelDisplay = 'level ' + (levelNumber - 1);
levelDisplay = levelDisplay.split(' ');
var levelNumber = 4;


function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var Equation = function(left, right, operator){
    this.left = left;
    this.right = right;
    this.operator = operator;
    this.expression = eval(left + operator + right);
    console.log(this.expression);
    this.getExpression = function() { return this.expression; }
    this.toString = function(){
        if (levelNumber === 2) {
            return  left + ' ' + operator + ' ' + right;
        } else {
            return '(' + left + ' ' + operator + ' ' + right + ')';
        } 
    }
}

function generateEquation(numNodes){
    if (numNodes === 1) return randomNumberRange(1, 10);

    var randomBracket = randomNumberRange(1, 3);
    if (randomBracket === 1){
        var numLeft = Math.floor(numNodes / 2);
        var leftSubTree = generateEquation(numLeft);
        var numRight = Math.ceil(numNodes / 2);
        var rightSubTree = generateEquation(numRight);
    } else {
        var numLeft = Math.ceil(numNodes / 2);
        var leftSubTree = generateEquation(numLeft);
        var numRight = Math.floor(numNodes / 2);
        var rightSubTree = generateEquation(numRight);
    }

    var randomOperator = randomNumberRange(0, operators.length);
    var sign = operators[randomOperator];
    return new Equation(leftSubTree, rightSubTree, sign);
    console.log(Equation);
}

var equationGenerate = generateEquation(levelNumber);
var equationDisplay = $('#output').text(costame).toString();
var equationResult = equationGenerate.getExpression();
console.log(equationResult + "xxxx");