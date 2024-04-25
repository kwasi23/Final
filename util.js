// Object to store pre-loaded images
const imageStore = {};

// Function to load an image and store it in the imageStore object
function loadImage(name, src) {
    const img = new Image(); // Create a new Image object
    // When the image is loaded, store it in the imageStore object with the given name
    img.onload = () => imageStore[name] = img;
    img.src = src; // Set the source of the image to the given src
}

// Function to get an image from the imageStore object by its name
function getImage(name) {
    return imageStore[name]; // Return the image corresponding to the given name from the imageStore
}

// Function to check collision between two objects
function checkCollision(obj1, obj2) {
    // Check if the bounding boxes of the two objects intersect
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Pre-load all images
// Load images with their respective names
loadImage('player', 'spaceship.png');
loadImage('enemy', 'alien.png');
loadImage('healthkit', 'healthkit.png');
loadImage('bullet', 'bullet.png');
loadImage('background', 'background.png');
