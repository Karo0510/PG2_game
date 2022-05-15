var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;
isGameOver = false;

ball_x = 200;
ball_y = 200;
ball_dy = 2;
ball_dx = 5;
ball_ballRadius = 20;

blocks = [];

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
        collision(ball, platform, blocks);
        //collisionBlock(ball, blocks);
    }

}

class Block
{
    constructor(x, y, x_size, y_size)
    {
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.isVisible = true;
    }

    drawBlock()
    {

        if (!this.isVisible)
        {
            return;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y-this.y_size, this.x_size, this.y_size);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}


ball = new Ball(ball_x, ball_y, ball_dx,ball_dy, ball_ballRadius);
platform = new Platform(platform_x, platform_y, platform_dx, platform_x_size, platform_y_size);

function collision(ball, platform, blocks)
{
    mod = 1;
    y = ball_dy;

    if ((ball.y + ball.ballRadius >= platform.y - platform.y_size) && (ball.x >= platform.x) && (ball.x <= platform.x + platform.x_size))
    {
        if ( (ball.x >= 0,9*platform.x) )
        {
            mod = 3;
        }
        else if ((ball.x < 0,9*platform.x) && (ball.x >= 0,7*platform.x) )
        {
            mod = 2;
        }
        else if ((ball.x < 0,7*platform.x) && (ball.x >= 0,6*platform.x) )
        {
            mod = 1.5;
        }
        else if ((ball.x < 0,6*platform.x) && (ball.x >= 0,4*platform.x) )
        {
            mod = 1;
        }
        else if ((ball.x < 0,4*platform.x) && (ball.x >= 0,3*platform.x) )
        {
            mod = 1.5;
        }
        else if ((ball.x < 0,3*platform.x) && (ball.x >= 0,1*platform.x) )
        {
            mod = 2;
        }
        else if ((ball.x <= 0,1*platform.x))
        {
            mod = 3;
        }
        console.log("Y="+y);
        ball.dy = -mod*y;
    }

    for (var i = 0; i<blocks.length; i++)
    {
        if (blocks[i].isVisible == true)
        {
            if (
                ball.x - ball.ballRadius <= blocks[i].x + blocks[i].x_size &&
                ball.x + ball.ballRadius >= blocks[i].x &&
                ball.y - ball.ballRadius <= blocks[i].y + blocks[i].y_size &&
                ball.y + ball.ballRadius >= blocks[i].y
            )
            {   
                blocks[i].isVisible = false;
                ball.dy = -ball.dy; 
            }
        }
        else
        {
            continue;
        }
    }
}


function clear()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();   
}

function initializeBlocks()
{
    var j = 50;
    while (j <=150)
    {
        for (var i = 0; i<10; i++)
        {
            block = new Block(i*80, j, 75, 45, true);
            blocks.push(block);
        }

        j = j+50;
    }
}

function drawBlocks()
{
    for (var i = 0; blocks.length; i++)
    {
        if (blocks[i].isVisible)
        {
            blocks[i].drawBlock();
        }
        
    }
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


initializeBlocks();
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
    drawBlocks();
    
}



window.onload = (animate)




