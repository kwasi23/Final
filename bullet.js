// Define a class for representing bullets in the game
class Bullet {
    // Constructor function to initialize a new bullet
    constructor(ctx, x, y) {
        this.ctx = ctx; // Store the 2D rendering context of the canvas
        this.x = x; // Initial x-coordinate of the bullet
        this.y = y; // Initial y-coordinate of the bullet
        this.speed = 10; // Speed at which the bullet moves
        this.img = getImage('bullet'); // Retrieve the pre-loaded bullet image from an image repository
        this.width = 30; // Set the width of the bullet based on the image width
        this.height = 40; // Set the height of the bullet based on the image height
    }

    // Method to update the position of the bullet
    update() {
        this.y -= this.speed; // Move the bullet upwards based on its speed
        // Check if the bullet is off-screen (above the canvas)
        if (this.y + this.height < 0) return false; // Return false to indicate that the bullet is off-screen
        this.draw(); // Draw the bullet at its updated position
        return true; // Return true to indicate that the bullet is still on-screen
    }

    // Method to draw the bullet on the canvas
    draw() {
        // Draw the bullet image at the current position with its center aligned
        this.ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
