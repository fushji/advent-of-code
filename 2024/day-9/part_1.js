const fs = require("fs");

function parseInput(input) {
  return input.trim().split("").map(Number);
}

function createDiskMap(numbers) {
  let disk = [];
  let fileId = 0;

  for (let i = 0; i < numbers.length; i++) {
    const length = numbers[i];

    if (i % 2 === 0) {
      for (let j = 0; j < length; j++) {
        disk.push(fileId);
      }
      fileId++;
    } else {
      for (let j = 0; j < length; j++) {
        disk.push(".");
      }
    }
  }

  return disk;
}

function compactDisk(disk) {
  while (true) {
    const firstGap = disk.indexOf(".");
    if (firstGap === -1) break;

    let lastFilePos = disk.length - 1;
    while (lastFilePos >= 0 && disk[lastFilePos] === ".") {
      lastFilePos--;
    }

    if (lastFilePos <= firstGap) break;

    disk[firstGap] = disk[lastFilePos];
    disk[lastFilePos] = ".";
  }

  return disk;
}

function calculateChecksum(disk) {
  return disk.reduce((sum, fileId, pos) => {
    if (fileId === ".") return sum;
    return sum + pos * fileId;
  }, 0);
}

function solve(input) {
  const numbers = parseInput(input);
  const disk = createDiskMap(numbers);
  const compactedDisk = compactDisk([...disk]);
  return calculateChecksum(compactedDisk);
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
