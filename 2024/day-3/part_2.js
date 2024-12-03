const fs = require("fs");

function processInstructions(input) {
  // Regex to find all valid instructions
  const instructionRegex = /(?:mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\))/g;
  let total = 0;
  let enabled = true;
  let match;

  while ((match = instructionRegex.exec(input)) !== null) {
    const instruction = match[0];

    if (instruction === "do()") {
      enabled = true;
    } else if (instruction === "don't()") {
      enabled = false;
    } else if (enabled && match[1] && match[2]) {
      // If mul is enabled and we have two valid numbers
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      total += x * y;
    }

    lastIndex = match.index + match[0].length;
  }

  return total;
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(processInstructions(input));
