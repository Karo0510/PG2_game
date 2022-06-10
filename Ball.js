class Ball
{
    constructor(x, y, dx, dy, ballRadius)
    {
        this.x = x;
        this.y = y;
        this.ballRadius = ballRadius;
        this.dx = dx;
        this.dy = dy;
        this.previousPositions = [];
    }

    drawBall()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

    newPosition() {
        this.previousPositions.unshift([this.x, this.y]);
        this.previousPositions = this.previousPositions.slice(0, 5);

    }

    update() {
        console.log(this.previousPositions[0]);
        if(this.previousPositions.length >= 5) {
            ctx.globalAlpha=0.50;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
                ctx.globalAlpha=-0.05;
            }
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
            //ctx.globalAlpha=1;
        }
    }

    moveBall()
    {
        this.newPosition();
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