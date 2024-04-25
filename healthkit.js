class Healthkit {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 2;
    }

    update() {
        this.y += this.speed;
        if (this.y - this.height / 2 > this.ctx.canvas.height) return false; // Return false if healthkit is off screen
        this.draw();
        return true;
    }

    draw() {
        this.ctx.drawImage(getImage('healthkit'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
