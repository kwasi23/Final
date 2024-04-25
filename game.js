// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define variables to manage game state
let player, bullets, enemies, healthkits, gameOver, score, health, animationId, enemySpawnInterval, healthkitSpawnInterval;
let playerName = ''; // Store player name
const shootSound = new Audio('shoot.mp3'); // Sound effect for shooting

// Event listener to play welcome music when welcome screen is clicked
document.addEventListener('DOMContentLoaded', function() {
    const welcomeMusic = document.getElementById('welcomeMusic');
    document.getElementById('welcomeScreen').addEventListener('click', function() {
        welcomeMusic.play();
    });
});

// Initialization function
function init() {
    // Clear previous spawn intervals
    if (enemySpawnInterval) clearInterval(enemySpawnInterval);
    if (healthkitSpawnInterval) clearInterval(healthkitSpawnInterval);

    // Initialize game state variables
    player = new Player(ctx, canvas.width / 2, canvas.height - 30);
    bullets = [];
    enemies = [];
    healthkits = [];
    gameOver = false;
    score = 0;
    health = 100;

    // Start spawning enemies and health kits
    spawnEnemies();
    spawnHealthkits();
    // Start game loop
    animationId = requestAnimationFrame(gameLoop);
}

// Function to spawn enemies periodically
function spawnEnemies() {
    enemySpawnInterval = setInterval(() => {
        if (!gameOver) {
            enemies.push(new Enemy(ctx, Math.random() * canvas.width, -30));
        }
    }, 2000);
}

// Function to spawn health kits periodically
function spawnHealthkits() {
    healthkitSpawnInterval = setInterval(() => {
        if (!gameOver) {
            healthkits.push(new Healthkit(ctx, Math.random() * canvas.width, -30));
        }
    }, 15000);
}

// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    const backgroundImage = getImage('background');
    if (backgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    // Draw player, bullets, enemies, and health kits
    player.draw();
    bullets.forEach(bullet => {
        if (!bullet.update()) {
            const index = bullets.indexOf(bullet);
            bullets.splice(index, 1);
        }
    });
    enemies.forEach(enemy => {
        if (!enemy.update()) {
            gameOver = true;
            displayRestart();
            return;
        }
    });
    healthkits.forEach(healthkit => {
        if (!healthkit.update()) {
            const index = healthkits.indexOf(healthkit);
            healthkits.splice(index, 1);
        }
    });

    // Check collisions
    checkCollisions();
    // Draw HUD
    drawHUD();

    // Continue game loop if game is not over
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

// Function to display game over message and restart option
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

// Function to draw HUD (Heads-Up Display) showing score, health, and player name
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

// Function to fade out music
function fadeOutMusic(audioElement, duration) {
    const originalVolume = audioElement.volume;
    const fadeOutInterval = 1200; // milliseconds
    const fadeStep = originalVolume / (duration / fadeOutInterval);

    const fadeInterval = setInterval(function() {
        const newVolume = audioElement.volume - fadeStep;
        if (newVolume > 0) {
            audioElement.volume = newVolume;
        } else {
            audioElement.volume = 0; // Make sure volume does not go negative
            audioElement.pause(); // Optionally stop the music after fading out
            audioElement.currentTime = 0; // Reset the time for future plays
            clearInterval(fadeInterval); // Stop the interval
        }
    }, fadeOutInterval);
}

// Function to start the game
function startGame() {
    // Get player name from input field
    playerName = document.getElementById('playerName').value.trim();
    // If player name is empty, show alert and return
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    // Fade out welcome music
    const welcomeMusic = document.getElementById('welcomeMusic');
    fadeOutMusic(welcomeMusic, 2000); // Fade out over 2000 milliseconds (2 seconds)

    // Hide welcome screen and show game canvas
    document.getElementById('welcomeScreen').style.display = 'none';
    canvas.style.display = 'block';
    // Initialize the game
    init();
}

// Event listener to restart game when canvas is clicked
canvas.addEventListener('click', function(event) {
    if (gameOver) {
        init(); // Restart the game if it's over
    } else {
        bullets.push(new Bullet(ctx, player.x, player.y - 20));
        shootSound.play(); // Play shooting sound effect when a bullet is fired
    }
});

// Event listener to move player horizontally based on mouse movement
canvas.addEventListener('mousemove', function(event) {
    if (!gameOver) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
        player.move(mouseX);
    }
});
