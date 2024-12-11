const fs = require("fs");
function processStones(input, iterations) {
  let stones = input
    .trim()
    .split(/\s+/)
    .map((n) => BigInt(n));
  for (let i = 0; i < iterations; i++) {
    let newStones = [];

    for (let stone of stones) {
      if (stone === 0n) {
        // Rule 1: Replace 0 with 1
        newStones.push(1n);
      } else if (stone.toString().length % 2 === 0) {
        // Rule 2: Split even-digit numbers
        const digits = stone.toString();
        const mid = Math.floor(digits.length / 2);
        const left = digits.slice(0, mid);
        const right = digits.slice(mid);
        newStones.push(BigInt(left));
        newStones.push(BigInt(right));
      } else {
        // Rule 3: Multiply by 2024
        newStones.push(stone * 2024n);
      }
    }

    stones = newStones;
  }

  return stones.length;
}
function solve() {
  const input = fs.readFileSync("data.txt", "utf8");
  return processStones(input, 25);
}
console.log(solve());
