const fs = require("fs");

function processInstructions(input) {
  // Regex to find all valid instructions
  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let total = 0;
  let match;

  // Find all valid matches
  while ((match = mulRegex.exec(input)) !== null) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    total += x * y;
  }

  return total;
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(processInstructions(input));
