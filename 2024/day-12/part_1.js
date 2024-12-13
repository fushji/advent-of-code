const fs = require("fs");
function findRegions(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  let totalPrice = 0;
  function isValid(r, c) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  }

  function getKey(r, c) {
    return `${r},${c}`;
  }

  function calculateRegion(startR, startC) {
    const plantType = grid[startR][startC];
    const region = [];
    const stack = [[startR, startC]];

    // Find all plots in the region
    while (stack.length > 0) {
      const [r, c] = stack.pop();
      const key = getKey(r, c);

      if (visited.has(key)) continue;
      visited.add(key);
      region.push([r, c]);

      // Check all four directions
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      for (const [dr, dc] of directions) {
        const newR = r + dr;
        const newC = c + dc;
        if (
          isValid(newR, newC) &&
          grid[newR][newC] === plantType &&
          !visited.has(getKey(newR, newC))
        ) {
          stack.push([newR, newC]);
        }
      }
    }

    // Calculate area and perimeter
    const area = region.length;
    let perimeter = 0;

    for (const [r, c] of region) {
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];
      for (const [dr, dc] of directions) {
        const newR = r + dr;
        const newC = c + dc;
        if (!isValid(newR, newC) || grid[newR][newC] !== plantType) {
          perimeter++;
        }
      }
    }

    return area * perimeter;
  }

  // Process each unvisited plot
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited.has(getKey(r, c))) {
        totalPrice += calculateRegion(r, c);
      }
    }
  }

  return totalPrice;
}
function solve(input) {
  const grid = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  return findRegions(grid);
}
// Read input from file
const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
