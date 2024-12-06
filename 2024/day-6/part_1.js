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

// Initialize variables for the guard's starting position and direction
let guardRow, guardCol, guardDir;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if ("^>v<".includes(input[r][c])) {
      guardRow = r;
      guardCol = c;
      guardDir = "^>v<".indexOf(input[r][c]); // Map direction symbol to index
      break;
    }
  }
}

// Set to track distinct visited positions
const visited = new Set([`${guardRow},${guardCol}`]);

// Function to simulate guard movement
while (true) {
  const [dr, dc] = directions[guardDir];
  const nextRow = guardRow + dr;
  const nextCol = guardCol + dc;

  // Check if the next position is outside the grid
  if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
    break; // Guard leaves the grid
  }

  if (input[nextRow][nextCol] === "#") {
    // Obstacle ahead: turn right (clockwise)
    guardDir = (guardDir + 1) % 4;
  } else {
    // Move forward
    guardRow = nextRow;
    guardCol = nextCol;
    visited.add(`${guardRow},${guardCol}`);
  }
}

console.log(`Distinct positions visited: ${visited.size}`);
