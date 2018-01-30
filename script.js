var operators = ['/', '*', '-', '+'];
var levelDisplay = 'level ' + (levelNumber - 1);
levelDisplay = levelDisplay.split(' ');
var levelNumber = 2;


function randomNumberRange(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

var Equation = function(left, right, operator) {
	this.left = left;
	this.right = right;
	this.operator = operator;
	this.expression = eval(left + operator + right);
	this.getExpression = function() { return this.expression; }
	this.toString = function() {
		if (levelNumber === 2) {
			return left + ' ' + operator + ' ' + right;
		} else {
			return '(' + left + ' ' + operator + ' ' + right + ')';
		}
	}


	//GETTING THE VALUE, COMPERING, INCREASING LEVEL
	self = this;

	$('#value').keypress(function(event) {
		var value = parseInt($("#value").val());

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13' && value == self.expression) {
			console.log('enter working');
			// alert('u a good at math');
			$('#output').text(generateEquation(levelNumber).toString());
			$("#value").val('');
			levelNumber +=1;
			console.log('level number: ' + levelNumber);


			//ADDING POINTS
			var points = parseInt($('#points').text());
			var updatedPoints = points + 2;
			$('#points').text(updatedPoints);
		}
	});
}


function generateEquation(numNodes) {
	if (numNodes === 1) return randomNumberRange(1, 10);

	var randomBracket = randomNumberRange(1, 3);

	var numLeft = randomBracket === 1 ? Math.floor(numNodes / 2) : Math.ceil(numNodes / 2);
	var leftSubTree = generateEquation(numLeft);
	var numRight = randomBracket === 1 ? Math.ceil(numNodes / 2) : Math.floor(numNodes / 2);
	var rightSubTree = generateEquation(numRight);

	var randomOperator = randomNumberRange(0, operators.length);
	var sign = operators[randomOperator];
	return new Equation(leftSubTree, rightSubTree, sign);
}

var equationGenerate = generateEquation(levelNumber);
var equationDisplay = $('#output').text(equationGenerate).toString();
var equationResult = equationGenerate.getExpression();
console.log(equationResult);


//TIMER

function startTimer(duration) {
	var timer = duration,
		minutes, seconds;
	var countDown = setInterval(function() {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		$('#time').text(minutes + ":" + seconds);

		if (--timer < -1) {
			clearInterval(countDown);
			$('#time-container').remove();
			$('#value').remove();
			alert('Time is up');
		}
	}, 1000);
}

var timeToStop = 3000000000000000000000000000000000000;

startTimer(timeToStop);