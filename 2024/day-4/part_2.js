const fs = require("fs");

function findXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function checkDiagonal(row, col, drow, dcol) {
    const forward = [
      grid[row - drow][col - dcol],
      grid[row][col],
      grid[row + drow][col + dcol],
    ].join("");

    return forward === "MAS" || forward === "SAM";
  }

  function isValidPosition(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (
        !isValidPosition(row - 1, col - 1) ||
        !isValidPosition(row - 1, col + 1) ||
        !isValidPosition(row + 1, col - 1) ||
        !isValidPosition(row + 1, col + 1)
      ) {
        continue;
      }

      const topLeftToBottomRight = checkDiagonal(row, col, 1, 1);
      const topRightToBottomLeft = checkDiagonal(row, col, 1, -1);

      if (topLeftToBottomRight && topRightToBottomLeft) {
        count++;
      }
    }
  }

  return count;
}

const input = fs
  .readFileSync("data.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

console.log(findXMAS(input));
