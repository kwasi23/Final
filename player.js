class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x; // Initial horizontal position
        this.y = y; // Initial vertical position
        this.width = 70; // Width of the spaceship
        this.height = 70; // Height of the spaceship
    }

    draw() {
        // Draw the spaceship at its current position
        this.ctx.drawImage(getImage('player'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    move(x) {
        // Update the x position of the spaceship based on mouse movement
        // Ensure the spaceship does not move outside the canvas boundaries
        this.x = Math.max(this.width / 2, Math.min(x, this.ctx.canvas.width - this.width / 2));
    }
}
