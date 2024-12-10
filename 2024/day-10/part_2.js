const fs = require("fs");

function findTrailheadRatings(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let totalRating = 0;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function isValid(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function dfs(r, c, visited = new Set()) {
    const currentHeight = parseInt(grid[r][c]);

    if (currentHeight === 9) {
      return 1;
    }

    let paths = 0;
    const currentPos = `${r},${c}`;
    visited.add(currentPos);

    for (const [dr, dc] of directions) {
      const newR = r + dr;
      const newC = c + dc;
      const newPos = `${newR},${newC}`;

      if (!isValid(newR, newC)) continue;

      const newHeight = parseInt(grid[newR][newC]);

      if (newHeight === currentHeight + 1 && !visited.has(newPos)) {
        paths += dfs(newR, newC, new Set(visited));
      }
    }

    return paths;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "0") {
        const rating = dfs(r, c);
        totalRating += rating;
      }
    }
  }

  return totalRating;
}

function solve() {
  const input = fs.readFileSync("data.txt", "utf8").trim();
  const grid = input.split("\n").map((line) => line.trim());
  return findTrailheadRatings(grid);
}

console.log(solve());
