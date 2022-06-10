var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

height = c.clientHeight;
width = c.clientWidth;
isGameOver = false;

ball_x = 200;
ball_y = 200;
ball_dy = 2;
ball_dx = 5;
ball_ballRadius = 10;
newBallcounter = 0;

startTime  = new Date().getTime() / 1000;



blocks = [];
balls = [];
scores = 0;

platform_x = 0;
platform_y = 600;
platform_dx = 20;
platform_x_size = 200;
platform_y_size = 20;

rightPressed = false;
leftPressed = false;

let image = new Image();
image.src = 'background.bmp';
ctx.drawImage(image, 0, 0);


ball = new Ball(ball_x, ball_y, ball_dx,ball_dy, ball_ballRadius, "blue");
balls.push(ball);
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

                if (blocks[i].type == 2)
                {
                    newBallcounter += 1;
                }
                ball.dy = -ball.dy; 
                scores++;
            }
        }
        else
        {
            continue;
        }
    }
}

function newBall()
{
    console.log(newBallcounter);

    if (newBallcounter >= 5)
    {
        console.log("AASAA");
        var b = new Ball(ball_x, ball_y, ball_dx,ball_dy, ball_ballRadius, "black");
        newBallcounter = 0;
        balls.push(b)
    }
}

function showTime() {
    
    var seconds = new Date().getTime() / 1000;
    var wynik = seconds - startTime
    ctx.fillStyle = "green";
    ctx.font = "14px Arial";
    ctx.fillText("Time: " + wynik, 550, 30);

    return wynik;
}


function clear()
{
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fill();   
}

function initializeBlocks()
{
    var j = 100;
    while (j <=200)
    {
        for (var i = 0; i<10; i++)
        {
            var type = 1;

            if (i % 2 == 0)
            {
                type = 2;
            }
        
            block = new Block(i*80, j, 75, 45, true, type);
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

function newRowTypeB()
{
    var seconds = new Date().getTime() / 1000;
    var wynik = seconds - startTime

    if (wynik % 10 == 0)
    {
        this.bricks.push(new Block(80, 50, 75, 45, true, 1));
        this.bricks.push(new Block(160, 50, 75, 45, true, 2));
        this.bricks.push(new Block(240, 50, 75, 45, true, 1));
        this.bricks.push(new Block(320, 50, 75, 45, true, 2));
        this.bricks.push(new Block(400, 50, 75, 45, true, 1));
        this.bricks.push(new Block(480, 50, 75, 45, true, 2));
        this.bricks.push(new Block(560, 50, 75, 45, true, 1));
        this.bricks.push(new Block(640, 50, 75, 45, true, 2));
        this.bricks.push(new Block(720, 50, 75, 45, true, 1));

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
    showTime();
    newRowTypeB();
    if (balls.length > 0)
    {
        newBall();

        for (i = 0; i<balls.length; i++)
        {
            balls[i].moveBall();
            balls[i].update();  

            if (balls[i].lostBall)
            {
                balls.splice(i, 1); 
            }
            //balls[i].drawBall();
        }
        //ball.moveBall();
        //ball.update();
        platform.movePlatform();
        clear();
        for (i = 0; i<balls.length; i++)
        {
            balls[i].drawBall();
        }
        platform.drawPlatform();
        ctx.restore();
        window.requestAnimationFrame(animate);
       
    }
    else
    {
        alert('Game Over. You break '+scores+" bricks");
    }

    drawBlocks();
    
}



window.onload = (animate)




