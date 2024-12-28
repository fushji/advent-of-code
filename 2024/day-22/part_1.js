const fs = require("fs");

function mix(secretNum, value) {
  return BigInt(secretNum) ^ BigInt(value);
}

function prune(num) {
  return Number(BigInt(num) % 16777216n);
}

function generateNextSecret(secretNum) {
  // Step 1: multiply by 64
  let result = secretNum;
  result = mix(result, result * 64);
  result = prune(result);

  // Step 2: divide by 32
  result = mix(result, Math.floor(result / 32));
  result = prune(result);

  // Step 3: multiply by 2048
  result = mix(result, result * 2048);
  result = prune(result);

  return result;
}

function generate2000thNumber(startNum) {
  let current = startNum;
  for (let i = 0; i < 2000; i++) {
    current = generateNextSecret(current);
  }
  return current;
}

function solve(inputPath) {
  const input = fs
    .readFileSync(inputPath, "utf8")
    .trim()
    .split("\n")
    .map(Number);

  const results = input.map((num) => generate2000thNumber(num));
  return results.reduce((sum, num) => sum + num, 0);
}

console.log(solve("data.txt"));
