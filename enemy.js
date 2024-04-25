// Define a class for representing enemies in the game
class Enemy {
    // Constructor function to initialize a new enemy
    constructor(ctx, x, y) {
        this.ctx = ctx; // Store the 2D rendering context of the canvas
        this.x = x; // Initial x-coordinate of the enemy
        this.y = y; // Initial y-coordinate of the enemy
        this.width = 70; // Width of the enemy
        this.height = 70; // Height of the enemy
        this.speed = Math.random() * 2 + 1; // Random speed between 1 and 3 for the enemy
    }

    // Method to update the position of the enemy
    update() {
        this.y += this.speed; // Move the enemy downwards based on its speed
        // Check if the enemy has reached the bottom of the canvas
        if (this.y + this.height / 2 >= this.ctx.canvas.height) {
            return false; // Return false to indicate game over due to enemy invasion
        }
        this.draw(); // Draw the enemy at its updated position
        return true; // Return true to indicate that the enemy is still on-screen
    }

    // Method to draw the enemy on the canvas
    draw() {
        // Draw the enemy image at the current position with its center aligned
        this.ctx.drawImage(getImage('enemy'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
