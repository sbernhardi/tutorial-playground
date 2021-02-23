
    var canvas = document.getElementById("gameCanvas");
    var canvasContext = canvas.getContext("2d");
    // var canvasContext;

    var cw = canvas.width;
    var ch = canvas.height;


    var paddle_w = 10;
    var paddle_h = 100;

    var paddle_LX = 0;
    var paddle_LY = ch/2 - paddle_h/2;

    var paddle_RX = cw-paddle_w;
    var paddle_RY = ch/2 - paddle_h/2;

    var playerR_score = 0;
    var playerL_score = 0;
    var winning_score = 3;
    var winScreen = false;


    var ball_size = 30;

    var ballX = cw/2;
    var ballY = ch/2;

    var ballSpeedX = 10;
    var ballSpeedY = 5;

function ballReset(){
    if (playerR_score >= winning_score || playerL_score >= winning_score){
        winScreen = true;        
    }
    else {
        ballSpeedX *= -1;
        ballX = cw/2;
        ballY = ch/2;
    }
}

function computerMovement(){
    
    if(paddle_RY + paddle_h/2 < ballY) paddle_RY += 4;
    else if(paddle_RY + paddle_h/2 > ballY) paddle_RY -= 4;
}

function moveStuff(){

    // Contact with Right Paddle
    ballX += ballSpeedX;
    if (ballX >= cw - ball_size/2) {
        if(ballY > paddle_RY && ballY < paddle_RY + paddle_h){
            ballSpeedX *= -1;
            var deltaY = ballY - (paddle_RY + paddle_h/2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            playerL_score++;
            ballReset();

        }
    }
    
    // Contact with Left Paddle
    else if (ballX <= 0+ball_size/2) {
        if(ballY > paddle_LY && ballY < paddle_LY + paddle_h) {
            ballSpeedX *= -1;
            var deltaY = ballY - (paddle_LY + paddle_h/2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            playerR_score++;
            ballReset();
        }
    }

    ballY += ballSpeedY;
    if (ballY >= ch - ball_size/2) ballSpeedY *= -1;
    else if (ballY <= 0+ball_size/2) ballSpeedY *= -1;

    computerMovement();
}
function drawNet(){
    for (var i = 0; i < canvas.height; i += 40){
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(cw/2-1, i , 2, 20);

    }
}

function drawStuff(){    
    
    // console.log("paddle_LX: " + paddle_LX);
    // console.log("paddle_LY: " + paddle_LY);
    // console.log("paddle_RX: " + paddle_RX);
    // console.log("paddle_RY: " + paddle_RY);


    //canvas dimensions
    // var cw = canvas.width;
    // var ch = canvas.height;

    //background
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0,0,cw,ch);

    drawNet();


    //paddle left
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(paddle_LX, paddle_LY, paddle_w, paddle_h);

    //paddle right
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(paddle_RX, paddle_RY,paddle_w, paddle_h);

    //ball
    canvasContext.fillStyle = "white";
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, ball_size/2, 0, Math.PI*2, true);
    canvasContext.fill();

    canvasContext.fillText("playerL: " + playerL_score, 100, 100);
    canvasContext.fillText("playerR: " + playerR_score, cw-150, 100);

    if (winScreen){
        ballX = cw/2;
        ballY = ch/2;

        if (playerR_score > playerL_score) {
            canvasContext.fillText("Right Player won!!", cw/2-40, 155);
        }
        else if (playerL_score > playerR_score) {
            canvasContext.fillText("Left Player won!!", cw/2-40, 155);
        }
        else {
            canvasContext.fillText("Tie!", 100, 350);
        }

        canvasContext.fillText("click to continue", cw/2-35, 435);

    }


}

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top  - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function handleMouseClick(evt){
    if (winScreen){
        playerL_score = 0;
        playerR_score = 0;
        winScreen = false;
    }
}

function main(){


    // frames per second
    var fps = 30;
    setInterval(function(){
        if (winScreen) {
            drawStuff();
            return;
        }
        moveStuff();
        drawStuff();
    }, 1000/fps);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', 
    function(evt){
        var mousePos = calculateMousePos(evt);
        paddle_LY = mousePos.y - paddle_h/2;
    });



}
window.onload = main();
