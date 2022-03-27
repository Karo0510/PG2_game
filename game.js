var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;
isGameOver = false;

ball_x = 400;
ball_y = 300;
ball_dy = 3;
ball_dx = 5;
ball_ballRadius = 20;

platform_x = 0;
platform_y = 600;
platform_dx = 20;
platform_x_size = 200;
platform_y_size = 20;

rightPressed = false;
leftPressed = false;

class Platform
{
    constructor(x, y, dx, x_size, y_size)
    {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.x_size = x_size;
        this.y_size = y_size;
    }

    drawPlatform()
    { 
        console.log(this.x+" "+this.y);
        ctx.beginPath();
        ctx.rect(this.x, this.y-this.y_size, this.x_size, this.y_size);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
    }

    movePlatform()
    {
        if (rightPressed)
        {
            this.x += this.dx;

            if ((this.x + this.x_size  > width))
            {
                this.x = width-this.x_size;
            }
        }else if (leftPressed)
        {
            this.x -= this.dx;

            if (this.x <= 0)
            {
                this.x = 0;
            }   
        }
    }
}


class Ball
{
    constructor(x, y, dx, dy, ballRadius)
    {
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
        this.dx = dx;
        this.dy = dy;
    }

    drawBall()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    moveBall()
    {
        this.y += this.dy;
        this.x += this.dx;
        console.log("X = "+this.x);
        console.log("Y = "+this.y);

        if(this.x + this.dx + this.ballRadius > width || this.x + this.dx - this.ballRadius < 0) 
        {
            this.dx = -this.dx;
        }
        
        if(this.y + this.dy - this.ballRadius < 0) 
        {
            this.dy = -this.dy;
        }
        else if (this.y + this.dy + this.ballRadius > height )
        {
            isGameOver = true;
            //location.reload();
        }
        collision(ball, platform);
    }

}


ball = new Ball(ball_x, ball_y, ball_dx,ball_dy, ball_ballRadius);
platform = new Platform(platform_x, platform_y, platform_dx, platform_x_size, platform_y_size);

function collision(ball, platform)
{
    if ((ball.y + ball.ballRadius >= platform.y - platform.y_size) && (ball.x > platform.x) && (ball.x < platform.x + platform.x_size))
    {
        ball.dy = -ball.dy;
    }
}

function clear()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();   
}

function pressKey(e)
{
    if (e.key == "ArrowRight")
    {
        rightPressed = true;
    }     
    if (e.key == "ArrowLeft")
    {
        leftPressed = true;
    }
}


function releaseKey(e)
{
    if(e.key == "ArrowRight") 
    {
        rightPressed = false;
    }
    else if(e.key == "ArrowLeft") 
    {
        leftPressed = false;
    }
}

document.addEventListener("keydown", pressKey, false);
document.addEventListener("keyup", releaseKey, false);

function animate()
{
    if (!isGameOver)
    {
        ball.moveBall();
        platform.movePlatform();
        clear();
        ball.drawBall();
        platform.drawPlatform();
        ctx.restore();
        window.requestAnimationFrame(animate);
    }
    else
    {
        alert('Game over');
    }
    
}

window.onload = (animate);





