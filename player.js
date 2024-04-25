// Define a class for representing the player's spaceship in the game
class Player {
    // Constructor function to initialize a new player's spaceship
    constructor(ctx, x, y) {
        this.ctx = ctx; // Store the 2D rendering context of the canvas
        this.x = x; // Initial horizontal position of the spaceship
        this.y = y; // Initial vertical position of the spaceship
        this.width = 70; // Width of the spaceship
        this.height = 70; // Height of the spaceship
    }

    // Method to draw the player's spaceship on the canvas
    draw() {
        // Draw the spaceship image at the current position with its center aligned
        this.ctx.drawImage(getImage('player'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    // Method to move the player's spaceship horizontally based on mouse movement
    move(x) {
        // Update the x position of the spaceship based on mouse movement
        // Ensure the spaceship does not move outside the canvas boundaries
        this.x = Math.max(this.width / 2, Math.min(x, this.ctx.canvas.width - this.width / 2));
    }
}
