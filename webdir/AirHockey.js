/*
Matthew Ngo 2017
Air Hockey Game
*/

(function() {

	"use strict";

	var animate;  
	var socket;
	var turn = false;
	var startGameInterval;
	var startPlayInterval;

	window.onload = function() {
		//stuff when website loads
		//beginGame();
		socket = io.connect('http://localhost:3000');
		socket.on('ball', showBallMove);
		//socket.on('mouse', newDraw) //client recieves
		//console.log("sending data");

		var ball = document.getElementById("ball");
		startGame();
		//ball.onclick = clickFunction;
	};

	function clickFunction() {
		turn = true;
		play();
	}

	function showBallMove(data) {
		turn = false;
		clearInterval(startGameInterval);
		clearInterval(startPlayInterval);
		var ball = document.getElementById("ball");
		//console.log(!true); // check if data is being sent to other clienton
		if (!turn) {
			ball.style.left = data.left + 'px';
			ball.style.top = data.top + 'px';
		}
	}

	function startGame() {
		turn = true;
		var ball = document.getElementById("ball");
		var data;
		var speed = 1;
		var directionHorizontal = -1;
		var directionVertical = 1;
		var pos = 0;

		//Press spacebar to start game
		document.body.onkeydown = function(e) {
			if (e.keyCode == 0 || e.keyCode == 32) {
				startGameInterval = setInterval(start, 5);
			}
		}
		ball.onmouseover = function() {
			console.log("hit");
			turn = true;
			//speed++;
			clearInterval(startGameInterval);
			directionVertical *= -1;
			directionHorizontal *= -1;
			if (startPlayInterval != null) {
				clearInterval(startPlayInterval);
			}
			console.log("hit2");
			startPlayInterval = setInterval(play, 5);
			play();
			console.log("hit3");
		};

		// Phase before anyone hits the ball
		function start() {
			data = {
				left: ball.offsetLeft,
				top: ball.offsetTop
			}
			if (turn) {
				socket.emit('ball', data);
				directionHorizontal = checkDirection(ball, directionHorizontal);
				ball.style.left = ball.offsetLeft + directionHorizontal + 'px';
			}
		}

		// Phase after one player hits the ball
		function play() {
			console.log("play");
			data = {
				left: ball.offsetLeft,
				top: ball.offsetTop
			}
			if (turn) {
				socket.emit('ball', data);

				if (checkHitTopBottom(ball)) {
					directionVertical *= -1;
				}
				if (checkHitLeftRight(ball)) {
					clearInterval(startPlayInterval);
					ball.onclick = function() {}; //Check why I have this here later
				}
				ball.style.top = ball.offsetTop + (speed * directionVertical) + 'px';
				ball.style.left = ball.offsetLeft + (speed * directionHorizontal) + 'px';
			}
		}
	}

	// Checks if ball hits top or bottom boundaries
	function checkHitTopBottom(ball) {
		if (ball.offsetTop <= 0 || ball.offsetTop >= 475) {
			return true;
		}
		return false;
	}

	// Checks if ball hits left or right boundaries
	function checkHitLeftRight(ball) {
		if (ball.offsetLeft <= 0 || ball.offsetLeft >= 975) {
			return true;
		}
		return false;
	}

	// Changes ball direction if it hits left or right boundaries
	function checkDirection(ball, currentDirection) {
		if (ball.offsetLeft <= 0 || ball.offsetLeft >= 975) {
			return currentDirection * -1;
		} else {
			return currentDirection;
		}
	}


})();