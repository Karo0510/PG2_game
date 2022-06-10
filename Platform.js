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

            if (this.x + this.x_size  > width)
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