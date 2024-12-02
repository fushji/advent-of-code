const fs = require("fs");

function isSequenceSafe(sequence) {
  // Convert string to array of numbers
  const numbers = sequence.split(" ").map(Number);

  // Check if sequence is increasing or decreasing
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];

    // Verify difference is between 1 and 3 (or -3 and -1)
    if (diff <= 0) isIncreasing = false;
    if (diff >= 0) isDecreasing = false;

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
  }

  return isIncreasing || isDecreasing;
}

function countSafeSequences(input) {
  const sequences = input.trim().split("\n");
  return sequences.reduce((count, seq) => {
    return count + (isSequenceSafe(seq) ? 1 : 0);
  }, 0);
}

// Read input file
const input = fs.readFileSync("data.txt", "utf8");
console.log(countSafeSequences(input));
