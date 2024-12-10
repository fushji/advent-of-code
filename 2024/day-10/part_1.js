const fs = require("fs");

function findTrailheadScores(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let totalScore = 0;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function isValid(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function bfs(startR, startC) {
    const visited = new Set();
    const reachable9s = new Set();
    const queue = [[startR, startC]];
    visited.add(`${startR},${startC}`);

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      const currentHeight = parseInt(grid[r][c]);

      if (currentHeight === 9) {
        reachable9s.add(`${r},${c}`);
      }

      for (const [dr, dc] of directions) {
        const newR = r + dr;
        const newC = c + dc;

        if (!isValid(newR, newC)) continue;

        const newHeight = parseInt(grid[newR][newC]);
        const key = `${newR},${newC}`;

        if (!visited.has(key) && newHeight === currentHeight + 1) {
          visited.add(key);
          queue.push([newR, newC]);
        }
      }
    }

    return reachable9s.size;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "0") {
        const score = bfs(r, c);
        totalScore += score;
      }
    }
  }

  return totalScore;
}

function solve() {
  const input = fs.readFileSync("data.txt", "utf8").trim();
  const grid = input.split("\n").map((line) => line.trim());
  return findTrailheadScores(grid);
}

console.log(solve());
