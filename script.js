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
	this.equation = eval(left + operator + right);
	console.log(this.equation);
	this.toString = function() {
		if (levelNumber === 2) {
			return left + ' ' + operator + ' ' + right;
		} else {
			return '(' + left + ' ' + operator + ' ' + right + ')';
		}
		levelNumber += 1;
	}


	//GETTING THE VALUE, COMPERING, INCREASING LEVEL
	self = this;

	$('#value').keypress(function(event) {
		var value = parseInt($("#value").val());

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13' && value == self.equation) {
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
	if (numNodes === 1) return randomNumberRange(1, 100);

	var randomBracket = randomNumberRange(1, 3);
	if (randomBracket === 1) {
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
}

$('#output').text(generateEquation(levelNumber).toString());


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