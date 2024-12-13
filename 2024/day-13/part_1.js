const fs = require("fs");

function parseInput(input) {
  const machines = [];
  let currentMachine = {};

  input.split("\n").forEach((line) => {
    if (line.trim() === "") return;

    if (line.startsWith("Button A:")) {
      currentMachine = {};
      const [x, y] = line
        .match(/X\+(\d+), Y\+(\d+)/)
        .slice(1)
        .map(Number);
      currentMachine.buttonA = { x, y };
    } else if (line.startsWith("Button B:")) {
      const [x, y] = line
        .match(/X\+(\d+), Y\+(\d+)/)
        .slice(1)
        .map(Number);
      currentMachine.buttonB = { x, y };
    } else if (line.startsWith("Prize:")) {
      const [x, y] = line
        .match(/X=(\d+), Y=(\d+)/)
        .slice(1)
        .map(Number);
      currentMachine.prize = { x, y };
      machines.push(currentMachine);
    }
  });

  return machines;
}

function findSolution(machine) {
  const { buttonA, buttonB, prize } = machine;
  let minTokens = Infinity;
  let solution = null;

  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      const x = a * buttonA.x + b * buttonB.x;
      const y = a * buttonA.y + b * buttonB.y;

      if (x === prize.x && y === prize.y) {
        const tokens = a * 3 + b * 1;
        if (tokens < minTokens) {
          minTokens = tokens;
          solution = { a, b, tokens };
        }
      }
    }
  }

  return solution;
}

function solve(input) {
  const machines = parseInput(input);
  let totalTokens = 0;

  machines.forEach((machine, index) => {
    const solution = findSolution(machine);
    if (solution) {
      totalTokens += solution.tokens;
    }
  });

  return totalTokens;
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
