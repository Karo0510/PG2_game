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
