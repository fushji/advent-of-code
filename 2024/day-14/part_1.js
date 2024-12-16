const fs = require("fs");

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [pos, vel] = line.split(" ");
      const [px, py] = pos.substring(2).split(",").map(Number);
      const [vx, vy] = vel.substring(2).split(",").map(Number);
      return { px, py, vx, vy };
    });
}

function simulateRobots(robots, width, height, seconds) {
  const positions = new Map();

  robots.forEach((robot) => {
    let x = (robot.px + robot.vx * seconds) % width;
    let y = (robot.py + robot.vy * seconds) % height;

    // Handle negative positions
    x = x < 0 ? x + width : x;
    y = y < 0 ? y + height : y;

    const key = `${x},${y}`;
    positions.set(key, (positions.get(key) || 0) + 1);
  });

  return positions;
}

function calculateSafetyFactor(positions, width, height) {
  const quadrants = [0, 0, 0, 0]; // TL, TR, BL, BR
  const midX = Math.floor(width / 2);
  const midY = Math.floor(height / 2);

  for (const [pos, count] of positions) {
    const [x, y] = pos.split(",").map(Number);

    // Skip robots on borders
    if (x === midX || y === midY) continue;

    const quadrantIndex = (y > midY ? 2 : 0) + (x > midX ? 1 : 0);
    quadrants[quadrantIndex] += count;
  }

  return quadrants.reduce((acc, val) => acc * val, 1);
}

function solve(input) {
  const robots = parseInput(input);
  const width = 101;
  const height = 103;
  const seconds = 100;

  const finalPositions = simulateRobots(robots, width, height, seconds);
  return calculateSafetyFactor(finalPositions, width, height);
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
