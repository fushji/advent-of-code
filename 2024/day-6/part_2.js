// Import the filesystem module to read the input file
const fs = require("fs");

// Read and parse the input file
const input = fs.readFileSync("data.txt", "utf-8").trim().split("\n");
const rows = input.length;
const cols = input[0].length;

// Direction vectors (up, right, down, left)
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// Locate the guard's initial position and direction
let startRow, startCol, startDir;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if ("^>v<".includes(input[r][c])) {
      startRow = r;
      startCol = c;
      startDir = "^>v<".indexOf(input[r][c]); // Map direction symbol to index
      break;
    }
  }
}

// Function to simulate guard movement with an optional extra obstacle
const simulateWithObstacle = (obstacleRow, obstacleCol) => {
  let guardRow = startRow,
    guardCol = startCol,
    guardDir = startDir;
  const visited = new Set();
  visited.add(`${guardRow},${guardCol},${guardDir}`);

  while (true) {
    const [dr, dc] = directions[guardDir];
    const nextRow = guardRow + dr;
    const nextCol = guardCol + dc;

    // Check if the next position is outside the grid
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      return false; // Guard exits the grid
    }

    // Treat the additional obstacle as if it's a `#`
    const nextCell =
      nextRow === obstacleRow && nextCol === obstacleCol
        ? "#"
        : input[nextRow][nextCol];
    if (nextCell === "#") {
      // Obstacle ahead, turn right
      guardDir = (guardDir + 1) % 4;
    } else {
      // Move forward
      guardRow = nextRow;
      guardCol = nextCol;
    }

    const state = `${guardRow},${guardCol},${guardDir}`;
    if (visited.has(state)) {
      return true; // Loop detected
    }
    visited.add(state);
  }
};

// Count valid positions for the new obstruction
let validPositions = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    // Skip positions that are not empty or are the starting position
    if (input[r][c] === "#" || (r === startRow && c === startCol)) {
      continue;
    }

    // Simulate guard movement with an obstacle at (r, c)
    if (simulateWithObstacle(r, c)) {
      validPositions++;
    }
  }
}

console.log(
  `Number of valid positions for a new obstruction: ${validPositions}`
);
