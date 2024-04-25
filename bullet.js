class Bullet {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.img = getImage('bullet'); // Retrieve the pre-loaded bullet image
        this.width = 30;   // Set width based on the image width
        this.height = 40; // Set height based on the image height
    }

    update() {
        this.y -= this.speed;
        if (this.y + this.height < 0) return false; // Return false if bullet is off screen
        this.draw();
        return true;
    }

    draw() {
        // Draw the bullet image at the current position
        this.ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
