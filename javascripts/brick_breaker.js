var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 15;

var paddleHeight = 15;
var paddleWidth = 140;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event){
	if(event.keyCode == 39){
		rightPressed = true;
	}
	else if(event.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(event){
	if(event.keyCode == 39){
		rightPressed = false;
	}
	else if(event.keyCode == 37){
		leftPressed = false;
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#b48484";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#b48484";
	ctx.fill();
	ctx.closePath();
}

function drawAll(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
		dx = -dx;
	};
	if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
		dy = -dy
	};
	x += dx;
	y += dy;

	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 9;
	}
	else if(leftPressed && paddleX > 0){
		paddleX -= 9;
	}
}

setInterval(drawAll, 10);


// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#1373a3";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "#a0e082";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(180, 132, 132, 0.5)";
// ctx.stroke();
// ctx.closePath();