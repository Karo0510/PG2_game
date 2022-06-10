class Block
{
    constructor(x, y, x_size, y_size, isVisible, type)
    {
        this.x = x;
        this.y = y;
        this.x_size = x_size;
        this.y_size = y_size;
        this.isVisible = isVisible;
        this.type = type;
    }

    drawBlock()
    {
        if (!this.isVisible)
        {
            return;
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y-this.y_size, this.x_size, this.y_size);

        if (this.type == 1)
        {
            ctx.fillStyle = "green";
        }
        else
        {
            ctx.fillStyle = "red";
        }
    
        ctx.fill();
        ctx.stroke();
    }
}
