var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 12;

var paddleHeight = 15;
var paddleWidth = 120;
var paddleX = (canvas.width - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 5;
var brickColumnCount = 15;
var brickWidth = 40;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var lives = 3;

var bricks = [];

for(c = 0; c < brickColumnCount; c++){
	bricks[c] = [];
	for(r = 0; r < brickRowCount; r++){
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false);


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

function mouseMoveHandler(event){
	var relativeX = event.clientX - canvas.offsetLeft;
	if(relativeX > 64 && relativeX < canvas.width - 64){
		paddleX = relativeX - paddleWidth/2;
	}
}

function brickCollision(){
	for(c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status == 1){
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
					dy = -dy;
					b.status = 0;
					score += 100;
					if(score == brickRowCount*brickColumnCount*100){
						alert("YOU WON!");
						document.location.reload();
					}
				}
			}
		}
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

function drawBricks(){
	for(c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			if(bricks[c][r].status == 1){
				var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#b48484";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function displayScore(){
	ctx.font = "22px Tahoma";
	ctx.fillStyle = "#b48484";
	ctx.fillText("Score: " + score, 9, 23)
}

function displayLives(){
	ctx.font = "22px Tahoma";
	ctx.fillStyle = "#b48484";
	ctx.fillText("Lives: " + lives, canvas.width - 83, 23);
}

function drawAll(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	displayScore();
	displayLives();
	brickCollision();

	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
		dx = -dx;
	};
	if(y + dy < ballRadius){
		dy = -dy
	}
	else if(y + dy > canvas.height - ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		}
		else{
			lives--;
			if(!lives){
				alert("GAME OVER");
				document.location.reload();
			}
			else{
				x = canvas.width/2;
				y = canvas.height - 30;
				dx = 2;
				dy = 2;
				paddleX = (canvas.width - paddleWidth)/2;
			}

		};
	};

	x += dx;
	y += dy;

	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 9;
	}
	else if(leftPressed && paddleX > 0){
		paddleX -= 9;
	}
	// requestAnimationFrame(drawAll); //this along with calling drawAll() below is another way to display the moving ball on the screen
}

// drawAll();

setInterval(drawAll, 5)

