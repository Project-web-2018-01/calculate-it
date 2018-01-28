
var operators = ['/','*','-','+'];
var levelDisplay = 'level 5';
levelDisplay = levelDisplay.split(' ');
var levelNumber = Number(levelDisplay[1]);

function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var TreeNode = function(left, right, operator){
    this.left = left;
    this.right = right;
    this.operator = operator;
    
    this.toString = function(){
        if (levelNumber == 2) {
            return  left + ' ' + operator + ' ' + right;
        } else {
            return '(' + left + ' ' + operator + ' ' + right + ')';
        }  
    }
}

function buildTree(numNodes){
    if (numNodes === 1) return randomNumberRange(1, 100);

    var randomBracket = randomNumberRange(1, 3);
    if (randomBracket === 1){
        var numLeft = Math.floor(numNodes / 2);
        var leftSubTree = buildTree(numLeft);
        var numRight = Math.ceil(numNodes / 2);
        var rightSubTree = buildTree(numRight);
    } else {
        var numLeft = Math.ceil(numNodes / 2);
        var leftSubTree = buildTree(numLeft);
        var numRight = Math.floor(numNodes / 2);
        var rightSubTree = buildTree(numRight);
    }

    var randomOperator = randomNumberRange(0, operators.length);
    var sign = operators[randomOperator];
    return new TreeNode(leftSubTree, rightSubTree, sign);
}

$('#output').text(buildTree(levelNumber).toString());



