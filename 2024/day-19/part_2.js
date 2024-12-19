const fs = require("fs");

function solve(input) {
  const [patternsInput, ...designsInput] = input.trim().split("\n\n");
  const patterns = patternsInput.split(", ").map((p) => p.trim());
  const designs = designsInput
    .join("\n")
    .split("\n")
    .map((d) => d.trim());

  function countWays(design, patterns, memo = {}) {
    if (design === "") return 1;
    if (memo[design] !== undefined) return memo[design];

    let ways = 0;
    for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
        ways += countWays(design.slice(pattern.length), patterns, memo);
      }
    }
    memo[design] = ways;
    return ways;
  }

  let totalWays = 0;
  for (const design of designs) {
    totalWays += countWays(design, patterns);
  }
  return totalWays;
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
