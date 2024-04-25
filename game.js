const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let player, bullets, enemies, healthkits, gameOver, score, health, animationId, enemySpawnInterval, healthkitSpawnInterval;
let playerName = ''; // Store player name
const shootSound = new Audio('shoot.mp3'); // Sound effect for shooting

document.addEventListener('DOMContentLoaded', function() {
    const welcomeMusic = document.getElementById('welcomeMusic');
    document.getElementById('welcomeScreen').addEventListener('click', function() {
        welcomeMusic.play();
    });
});

function init() {
    if (enemySpawnInterval) clearInterval(enemySpawnInterval);
    if (healthkitSpawnInterval) clearInterval(healthkitSpawnInterval);

    player = new Player(ctx, canvas.width / 2, canvas.height - 30);
    bullets = [];
    enemies = [];
    healthkits = [];
    gameOver = false;
    score = 0;
    health = 100;

    spawnEnemies();
    spawnHealthkits();
    animationId = requestAnimationFrame(gameLoop);
}

function spawnEnemies() {
    enemySpawnInterval = setInterval(() => {
        if (!gameOver) {
            enemies.push(new Enemy(ctx, Math.random() * canvas.width, -30));
        }
    }, 2000);
}

function spawnHealthkits() {
    healthkitSpawnInterval = setInterval(() => {
        if (!gameOver) {
            healthkits.push(new Healthkit(ctx, Math.random() * canvas.width, -30));
        }
    }, 15000);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const backgroundImage = getImage('background');
    if (backgroundImage) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

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

    checkCollisions();
    drawHUD();

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

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

function startGame() {
    playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }

    const welcomeMusic = document.getElementById('welcomeMusic');
    fadeOutMusic(welcomeMusic, 2000); // Fade out over 2000 milliseconds (2 seconds)

    document.getElementById('welcomeScreen').style.display = 'none';
    canvas.style.display = 'block';
    init();
}

canvas.addEventListener('click', function(event) {
    if (gameOver) {
        init(); // Restart the game if it's over
    } else {
        bullets.push(new Bullet(ctx, player.x, player.y - 20));
        shootSound.play(); // Play shooting sound effect when a bullet is fired
    }
});

canvas.addEventListener('mousemove', function(event) {
    if (!gameOver) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);
        player.move(mouseX);
    }
});
