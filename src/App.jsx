import { useState, useEffect, useRef } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    player: {
      x: 50,
      y: 0,
      width: 30,
      height: 40,
      velocityY: 0,
      velocityX: 0,
      grounded: false,
    },
    platforms: [
      { x: 0, y: 500, width: 800, height: 100 }, // Ground
      { x: 600, y: 400, width: 200, height: 20 },
      { x: 100, y: 350, width: 150, height: 20 },
      { x: 400, y: 300, width: 150, height: 20 },
      { x: 200, y: 250, width: 150, height: 20 },
    ],
    coins: [
      { x: 700, y: 380, width: 20, height: 20, collected: false },
      { x: 150, y: 330, width: 20, height: 20, collected: false },
      { x: 450, y: 280, width: 20, height: 20, collected: false },
      { x: 250, y: 230, width: 20, height: 20, collected: false },
    ],
    enemies: [{ x: 650, y: 380, width: 30, height: 30, direction: 1 }],
    score: 0,
    gravity: 0.6,
    jumpPower: -15,
    keys: {},
    gameOver: false,
    won: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const game = gameStateRef.current;

    const handleKeyDown = (e) => {
      game.keys[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      game.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const updateGame = () => {
      if (game.gameOver || game.won) return;

      const player = game.player;

      // Movement
      player.velocityX = 0;
      if (game.keys["arrowleft"] || game.keys["a"]) player.velocityX = -5;
      if (game.keys["arrowright"] || game.keys["d"]) player.velocityX = 5;
      player.x += player.velocityX;

      // Bounds
      if (player.x < 0) player.x = 0;
      if (player.x + player.width > 800) player.x = 800 - player.width;

      // Gravity
      player.velocityY += game.gravity;
      player.y += player.velocityY;

      // Platform collision
      player.grounded = false;
      game.platforms.forEach((platform) => {
        if (
          player.x + player.width > platform.x &&
          player.x < platform.x + platform.width &&
          player.y + player.height >= platform.y &&
          player.y + player.height <= platform.y + 20 &&
          player.velocityY >= 0
        ) {
          player.grounded = true;
          player.y = platform.y - player.height;
          player.velocityY = 0;
        }
      });

      // Jump
      if (
        (game.keys["arrowup"] || game.keys["w"] || game.keys[" "]) &&
        player.grounded
      ) {
        player.velocityY = game.jumpPower;
        player.grounded = false;
      }

      // Coin collection
      game.coins.forEach((coin) => {
        if (
          !coin.collected &&
          player.x + player.width > coin.x &&
          player.x < coin.x + coin.width &&
          player.y + player.height > coin.y &&
          player.y < coin.y + coin.height
        ) {
          coin.collected = true;
          game.score += 10;
        }
      });

      // Win condition
      if (game.coins.every((coin) => coin.collected)) {
        game.won = true;
      }

      // Enemy movement and collision
      game.enemies.forEach((enemy) => {
        enemy.x += enemy.direction * 2;
        if (enemy.x < 600 || enemy.x > 800) enemy.direction *= -1;

        if (
          player.x + player.width > enemy.x &&
          player.x < enemy.x + enemy.width &&
          player.y + player.height > enemy.y &&
          player.y < enemy.y + enemy.height
        ) {
          game.gameOver = true;
        }
      });

      // Fall death
      if (player.y > 600) {
        game.gameOver = true;
      }
    };

    const drawGame = () => {
      ctx.fillStyle = "#e0f2fe";
      ctx.fillRect(0, 0, 800, 600);

      const game = gameStateRef.current;

      // Draw platforms
      ctx.fillStyle = "#94a3b8";
      game.platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });

      // Draw player
      ctx.fillStyle = "#3b82f6";
      ctx.fillRect(
        game.player.x,
        game.player.y,
        game.player.width,
        game.player.height,
      );

      // Draw coins
      ctx.fillStyle = "#fbbf24";
      game.coins.forEach((coin) => {
        if (!coin.collected) {
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw enemies
      ctx.fillStyle = "#ef4444";
      game.enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      });

      // Draw UI
      ctx.fillStyle = "#1e293b";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${game.score}`, 10, 30);

      if (game.gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "#fff";
        ctx.font = "48px Arial";
        ctx.fillText("GAME OVER", 250, 300);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart", 300, 350);
      }

      if (game.won) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = "#fff";
        ctx.font = "48px Arial";
        ctx.fillText("YOU WIN!", 280, 300);
        ctx.font = "20px Arial";
        ctx.fillText("Final Score: " + game.score, 320, 350);
        ctx.fillText("Press R to restart", 300, 380);
      }
    };

    const gameLoop = setInterval(() => {
      updateGame();
      drawGame();
    }, 1000 / 60);

    const handleRestart = (e) => {
      if (e.key.toLowerCase() === "r" && (game.gameOver || game.won)) {
        game.player = {
          x: 50,
          y: 0,
          width: 30,
          height: 40,
          velocityY: 0,
          velocityX: 0,
          grounded: false,
        };
        game.score = 0;
        game.gameOver = false;
        game.won = false;
        game.coins.forEach((coin) => (coin.collected = false));
      }
    };

    window.addEventListener("keydown", handleRestart);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleRestart);
      clearInterval(gameLoop);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="mb-4 text-3xl font-bold">Platform Game</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-4 border-gray-800 bg-sky-100"
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Collect all coins to win!</p>
        <p className="text-sm text-gray-600">
          Arrow Keys or WASD to move/jump | Avoid red enemies | Press R to
          restart
        </p>
      </div>
    </div>
  );
}
