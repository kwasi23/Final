const imageStore = {};

function loadImage(name, src) {
    const img = new Image();
    img.onload = () => imageStore[name] = img;
    img.src = src;
}

function getImage(name) {
    return imageStore[name];
}

function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Pre-load all images
loadImage('player', 'spaceship.png');
loadImage('enemy', 'alien.png');
loadImage('healthkit', 'healthkit.png');
loadImage('bullet', 'bullet.png');
loadImage('background', 'background.png');
