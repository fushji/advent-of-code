const fs = require("fs");

function solve(input) {
  const [patternsInput, ...designsInput] = input.trim().split("\n\n");
  const patterns = patternsInput.split(", ").map((p) => p.trim());
  const designs = designsInput
    .join("\n")
    .split("\n")
    .map((d) => d.trim());

  function canFormDesign(design, patterns, memo = {}) {
    if (design === "") return true;
    if (memo[design] !== undefined) return memo[design];

    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        if (canFormDesign(design.slice(pattern.length), patterns, memo)) {
          memo[design] = true;
          return true;
        }
      }
    }
    memo[design] = false;
    return false;
  }

  let count = 0;
  for (const design of designs) {
    if (canFormDesign(design, patterns)) {
      count++;
    }
  }
  return count;
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
