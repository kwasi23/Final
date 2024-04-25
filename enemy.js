class Enemy {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.speed = Math.random() * 2 + 1;
    }

    update() {
        this.y += this.speed;
        if (this.y + this.height / 2 >= this.ctx.canvas.height) {
            return false; // Returning false signifies game over due to enemy invasion
        }
        this.draw();
        return true;
    }

    draw() {
        this.ctx.drawImage(getImage('enemy'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
