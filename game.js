// Get the canvas element by its id 'gameCanvas'
const canvas = document.getElementById('gameCanvas');

// Get the 2D rendering context of the canvas
const ctx = canvas.getContext('2d');

// Set the width and height of the canvas
canvas.width = 800;
canvas.height = 600;

// Declare variables for game components and state
let player, bullets, enemies, healthkits, gameOver, score, health, animationId, enemySpawnInterval, healthkitSpawnInterval;

// Store player name
let playerName = '';

// Create an Audio object for shooting sound effect
const shootSound = new Audio('shoot.mp3');

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchNews(); // Fetch news when document is ready
});

// Function to initialize game components
function init() {
    // Clear any existing enemy and health kit spawn intervals
    if (enemySpawnInterval) clearInterval(enemySpawnInterval);
    if (healthkitSpawnInterval) clearInterval(healthkitSpawnInterval);

    // Initialize player and game state
    player = new Player(ctx, canvas.width / 2, canvas.height - 30);
    bullets = [];
    enemies = [];
    healthkits = [];
    gameOver = false;
    score = 0;
    health = 100;

    // Start playing the welcome music
    const welcomeMusic = document.getElementById('welcomeMusic');
    welcomeMusic.play();

    // Start spawning enemies and health kits
    spawnEnemies();
    spawnHealthkits();

    // Start the game loop
    animationId = requestAnimationFrame(gameLoop);
}

// Function to spawn enemies at regular intervals
function spawnEnemies() {
    enemySpawnInterval = setInterval(() => {
        if (!gameOver) {
            enemies.push(new Enemy(ctx, Math.random() * canvas.width, -30));
        }
    }, 2000);
}

// Function to spawn health kits at regular intervals
function spawnHealthkits() {
    healthkitSpawnInterval = setInterval(() => {
        if (!gameOver) {
            healthkits.push(new Healthkit(ctx, Math.random() * canvas.width, -30));
        }
    }, 15000);
}

// Main game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image if available
    const backgroundImage = getImage('background');
    if (backgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    // Draw player, bullets, enemies, and health kits
    player.draw();
    bullets.forEach(bullet => {
        if (!bullet.update()) {
            bullets.splice(bullets.indexOf(bullet), 1);
        }
    });
    enemies.forEach(enemy => {
        if (!enemy.update()) {
            gameOver = true;
            displayRestart();
        }
    });
    healthkits.forEach(healthkit => {
        if (!healthkit.update()) {
            healthkits.splice(healthkits.indexOf(healthkit), 1);
        }
    });

    // Check for collisions between game objects
    checkCollisions();

    // Draw the HUD (Heads-Up Display)
    drawHUD();

    // Continue the game loop if game is not over
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

// Function to check collisions between game objects
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (checkCollision(bullet, enemy)) {
                enemies.splice(eIndex, 1);
                bullets.splice(bIndex, 1);
                score += 10;
            }
        });
    });

    enemies.forEach((enemy, eIndex) => {
        if (checkCollision(enemy, player)) {
            gameOver = true;
            displayRestart();
        }
    });

    healthkits.forEach((kit, kIndex) => {
        if (checkCollision(kit, player)) {
            healthkits.splice(kIndex, 1);
            health = Math.min(health + 20, 100);
        }
    });
}

// Function to display restart options on game over
function displayRestart() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("Game Over! Click to Restart", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(animationId);
}

// Function to draw the Heads-Up Display (HUD)
function drawHUD() {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Health: ${health}`, 10, 40);

    ctx.textAlign = 'right';
    ctx.fillText(`Player: ${playerName}`, canvas.width - 10, 20);
}

// Function to start the game
function startGame() {
    // Get player name from input field
    playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    // Hide the Spotify player if present
    const spotifyPlayer = document.getElementById('spotifyPlayer');
    if (spotifyPlayer) {
        spotifyPlayer.style.display = 'none';
    }

    // Hide the welcome screen and show the game canvas
    document.getElementById('welcomeScreen').style.display = 'none';
    canvas.style.display = 'block';

    // Initialize the game
    init();
}

// Event listener for canvas clicks
canvas.addEventListener('click', function(event) {
    // Restart the game if it's over, otherwise shoot bullets
    if (gameOver) {
        init();
    } else {
        bullets.push(new Bullet(ctx, player.x, player.y - 20));
        shootSound.play();
    }
});

// Event listener for mouse movements on the canvas
canvas.addEventListener('mousemove', function(event) {
    // Move the player horizontally based on mouse position
    if (!gameOver) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
        player.move(mouseX);
    }
});
