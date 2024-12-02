const fs = require("fs");

function isSequenceSafe(sequence) {
  // Convert string to array of numbers
  const numbers = sequence.split(" ").map(Number);

  // Check if sequence is increasing or decreasing
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];

    if (diff <= 0) isIncreasing = false;
    if (diff >= 0) isDecreasing = false;

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
  }

  return isIncreasing || isDecreasing;
}

function isSequenceSafeWithDampener(sequence) {
  // First check if it's already safe
  if (isSequenceSafe(sequence)) {
    return true;
  }

  // Try removing each number one at a time
  const numbers = sequence.split(" ");
  for (let i = 0; i < numbers.length; i++) {
    // Create new sequence without current number
    const modifiedSequence = [
      ...numbers.slice(0, i),
      ...numbers.slice(i + 1),
    ].join(" ");
    if (isSequenceSafe(modifiedSequence)) {
      return true;
    }
  }

  return false;
}

function countSafeSequences(input) {
  const sequences = input.trim().split("\n");
  return sequences.reduce((count, seq) => {
    return count + (isSequenceSafeWithDampener(seq) ? 1 : 0);
  }, 0);
}

// Read input file
const input = fs.readFileSync("data.txt", "utf8");
console.log(countSafeSequences(input));
