const fs = require("fs");

function calculateAntinodes(lines) {
  const input = lines.filter((line) => line.length > 0);
  const antennas = [];
  const rows = input.length;
  const cols = input[0].length;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const char = input[y][x];
      if (char !== ".") {
        antennas.push({ x, y, freq: char });
      }
    }
  }

  const frequencyGroups = {};
  for (const antenna of antennas) {
    if (!frequencyGroups[antenna.freq]) {
      frequencyGroups[antenna.freq] = [];
    }
    frequencyGroups[antenna.freq].push(antenna);
  }

  const antinodes = new Set();

  for (const freq in frequencyGroups) {
    const group = frequencyGroups[freq];

    if (group.length > 1) {
      group.forEach(({ x, y }) => {
        antinodes.add(`${x},${y}`);
      });
    }

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i];
        const b = group[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const gcd = Math.abs(getGCD(dx, dy));
        const unitDx = dx / gcd;
        const unitDy = dy / gcd;

        let x = a.x;
        let y = a.y;

        while (x >= 0 && x < cols && y >= 0 && y < rows) {
          antinodes.add(`${x},${y}`);
          x -= unitDx;
          y -= unitDy;
        }

        x = a.x + unitDx;
        y = a.y + unitDy;
        while (x >= 0 && x < cols && y >= 0 && y < rows) {
          antinodes.add(`${x},${y}`);
          x += unitDx;
          y += unitDy;
        }
      }
    }
  }

  return antinodes.size;
}

function getGCD(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function solve(input) {
  const lines = input.trim().split("\n");
  return calculateAntinodes(lines);
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
