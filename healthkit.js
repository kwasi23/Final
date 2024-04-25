// Define a class for representing health kits in the game
class Healthkit {
    // Constructor function to initialize a new health kit
    constructor(ctx, x, y) {
        this.ctx = ctx; // Store the 2D rendering context of the canvas
        this.x = x; // Initial x-coordinate of the health kit
        this.y = y; // Initial y-coordinate of the health kit
        this.width = 32; // Width of the health kit
        this.height = 32; // Height of the health kit
        this.speed = 2; // Speed at which the health kit moves
    }

    // Method to update the position of the health kit
    update() {
        this.y += this.speed; // Move the health kit downwards based on its speed
        // Check if the health kit is off-screen (below the canvas)
        if (this.y - this.height / 2 > this.ctx.canvas.height) return false; // Return false to indicate that the health kit is off-screen
        this.draw(); // Draw the health kit at its updated position
        return true; // Return true to indicate that the health kit is still on-screen
    }

    // Method to draw the health kit on the canvas
    draw() {
        // Draw the health kit image at the current position with its center aligned
        this.ctx.drawImage(getImage('healthkit'), this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
