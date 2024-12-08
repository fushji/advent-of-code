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

    for (let i = 0; i < group.length; i++) {
      for (let j = 0; j < group.length; j++) {
        if (i !== j) {
          const a = group[i];
          const b = group[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;

          const antinode1 = { x: a.x - dx, y: a.y - dy };
          const antinode2 = { x: b.x + dx, y: b.y + dy };

          [antinode1, antinode2].forEach(({ x, y }) => {
            if (x >= 0 && x < cols && y >= 0 && y < rows) {
              antinodes.add(`${x},${y}`);
            }
          });
        }
      }
    }
  }

  return antinodes.size;
}

function solve(input) {
  const lines = input.trim().split("\n");
  return calculateAntinodes(lines);
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
