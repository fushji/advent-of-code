const fs = require("fs");

function parseInput(input) {
  const [rulesSection, sequencesSection] = input.trim().split("\n\n");

  // Parse rules into array of [before, after] pairs
  const rules = rulesSection.split("\n").map((rule) => {
    const [before, after] = rule.split("|");
    return [parseInt(before), parseInt(after)];
  });

  // Parse sequences into arrays of numbers
  const sequences = sequencesSection
    .split("\n")
    .map((seq) => seq.split(",").map(Number));

  return { rules, sequences };
}

function isValidSequence(sequence, rules) {
  // Create set of pages in this sequence
  const pageSet = new Set(sequence);

  // Check only rules that involve pages in this sequence
  for (const [before, after] of rules) {
    if (pageSet.has(before) && pageSet.has(after)) {
      const beforeIndex = sequence.indexOf(before);
      const afterIndex = sequence.indexOf(after);
      if (beforeIndex > afterIndex) {
        return false;
      }
    }
  }
  return true;
}

function solve(input) {
  const { rules, sequences } = parseInput(input);
  let sum = 0;

  for (const sequence of sequences) {
    if (isValidSequence(sequence, rules)) {
      // Find middle page number
      const middleIndex = Math.floor(sequence.length / 2);
      sum += sequence[middleIndex];
    }
  }

  return sum;
}

// Read and solve
const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
