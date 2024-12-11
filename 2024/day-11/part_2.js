const fs = require("fs");

function processStones(input, blinks) {
  const initialStones = input.trim().split(/\s+/).map(Number);

  const stoneCounts = new Map();

  for (const stone of initialStones) {
    stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
  }

  for (let blink = 0; blink < blinks; blink++) {
    const newStoneCounts = new Map();

    for (const [stone, count] of stoneCounts.entries()) {
      if (stone === 0) {
        newStoneCounts.set(1, (newStoneCounts.get(1) || 0) + count);
      } else if (stone.toString().length % 2 === 0) {
        const digits = stone.toString();
        const mid = Math.floor(digits.length / 2);
        const left = parseInt(digits.slice(0, mid), 10);
        const right = parseInt(digits.slice(mid), 10);
        newStoneCounts.set(left, (newStoneCounts.get(left) || 0) + count);
        newStoneCounts.set(right, (newStoneCounts.get(right) || 0) + count);
      } else {
        const newStone = stone * 2024;
        newStoneCounts.set(
          newStone,
          (newStoneCounts.get(newStone) || 0) + count
        );
      }
    }

    stoneCounts.clear();
    for (const [stone, count] of newStoneCounts.entries()) {
      stoneCounts.set(stone, count);
    }
  }

  let totalStones = 0;
  for (const count of stoneCounts.values()) {
    totalStones += count;
  }

  return totalStones;
}

function solve() {
  const input = fs.readFileSync("data.txt", "utf8");
  return processStones(input, 75);
}
console.log(solve());
