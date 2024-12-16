const fs = require("fs");

// Define directions and rotations
const DIRECTIONS = {
  NORTH: { dx: 0, dy: -1 },
  EAST: { dx: 1, dy: 0 },
  SOUTH: { dx: 0, dy: 1 },
  WEST: { dx: -1, dy: 0 },
};

const ROTATIONS = {
  NORTH: { left: "WEST", right: "EAST" },
  EAST: { left: "NORTH", right: "SOUTH" },
  SOUTH: { left: "EAST", right: "WEST" },
  WEST: { left: "SOUTH", right: "NORTH" },
};

function findStartAndEnd(maze) {
  let start = null,
    end = null;
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === "S") start = { x, y };
      if (maze[y][x] === "E") end = { x, y };
    }
  }
  return { start, end };
}

function solve(inputFile) {
  const maze = fs.readFileSync(inputFile, "utf8").trim().split("\n");
  const { start, end } = findStartAndEnd(maze);

  // Priority queue for Dijkstra's algorithm
  const queue = new Map();
  const visited = new Set();

  // Initialize with starting position facing EAST
  queue.set(JSON.stringify({ x: start.x, y: start.y, dir: "EAST" }), 0);

  while (queue.size > 0) {
    // Get the position with minimum score
    let minScore = Infinity;
    let current = null;
    for (const [pos, score] of queue) {
      if (score < minScore) {
        minScore = score;
        current = pos;
      }
    }

    const currentPos = JSON.parse(current);
    const currentScore = queue.get(current);
    queue.delete(current);

    const key = `${currentPos.x},${currentPos.y},${currentPos.dir}`;
    if (visited.has(key)) continue;
    visited.add(key);

    // Check if we reached the end
    if (currentPos.x === end.x && currentPos.y === end.y) {
      return currentScore;
    }

    // Try moving forward
    const dir = DIRECTIONS[currentPos.dir];
    const newX = currentPos.x + dir.dx;
    const newY = currentPos.y + dir.dy;

    if (maze[newY]?.[newX] !== "#") {
      const newPos = JSON.stringify({
        x: newX,
        y: newY,
        dir: currentPos.dir,
      });
      const newScore = currentScore + 1;
      if (!queue.has(newPos) || queue.get(newPos) > newScore) {
        queue.set(newPos, newScore);
      }
    }

    // Try rotating left and right
    ["left", "right"].forEach((rotation) => {
      const newDir = ROTATIONS[currentPos.dir][rotation];
      const newPos = JSON.stringify({
        x: currentPos.x,
        y: currentPos.y,
        dir: newDir,
      });
      const newScore = currentScore + 1000;
      if (!queue.has(newPos) || queue.get(newPos) > newScore) {
        queue.set(newPos, newScore);
      }
    });
  }

  return Infinity;
}

console.log(solve("data.txt"));
