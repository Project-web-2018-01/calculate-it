(function(){

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
}

//GETTING THE VALUE, COMPERING, INCREASING LEVEL

function inputListener(equationResult){
	$('#value').keypress(function(event) {
		var value = parseFloat($("#value").val());

		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13' && value == equationResult) {
			console.log('enter works');
			// alert('u a good at math');
			$("#value").val('');
			levelCounter();
			pointsResume();	
			gameMaster();
		}
	});
}

function levelCounter(){
	sublevel ++;
	if(sublevel == 5){
		levelNumber ++;
		sublevel = 1;
	} 
	console.log('level number: ' + levelNumber);
	console.log('sublevel: ' + sublevel);
}

//ADDING POINTS

function pointsResume(){
	var sublevel = 1;
	var points = parseInt($('#points').text());
	points += 1;
	$('#points').text(points);
}

function generateEquation(numNodes) {
	if (numNodes === 1) return randomNumberRange(1, 10);

	var randomBrackets = randomNumberRange(1, 3);
	var numLeft = randomBrackets === 1 ? Math.floor(numNodes / 2) : Math.ceil(numNodes / 2);
	var leftSubTree = generateEquation(numLeft);
	var numRight = randomBrackets === 1 ? Math.ceil(numNodes / 2) : Math.floor(numNodes / 2);
	var rightSubTree = generateEquation(numRight);

	var randomOperator = randomNumberRange(0, operators.length);
	var sign = operators[randomOperator];
	return new Equation(leftSubTree, rightSubTree, sign);
}

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

	var operators = ['/', '*', '-', '+'];
	var levelDisplay = 'level: ' + (levelNumber - 1);
	var levelNumber = 2;
	var sublevel = 1;

	function gameMaster(){

		var equationGenerate = generateEquation(levelNumber);
		var equationDisplay = $('#output').text(equationGenerate).toString();
		var equationResult = equationGenerate.getExpression();
		console.log(equationResult);
		inputListener(equationResult);

		var timeToStop = 60;
		startTimer(timeToStop);
	}
gameMaster();
})();

