const fs = require("fs");

function parseInput(input) {
  const lines = input.trim().split("\n");
  const map = lines.slice(0, lines.indexOf("")).map((line) => line.split(""));
  const moves = lines
    .slice(lines.indexOf("") + 1)
    .join("")
    .replace(/\n/g, "");
  return { map, moves };
}

function findRobot(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "@") {
        return { x, y };
      }
    }
  }
}

function canMove(map, fromX, fromY, toX, toY, pushX, pushY) {
  if (toY < 0 || toY >= map.length || toX < 0 || toX >= map[0].length) {
    return false;
  }

  if (map[toY][toX] === "#") {
    return false;
  }

  if (map[toY][toX] === "O") {
    if (
      pushY < 0 ||
      pushY >= map.length ||
      pushX < 0 ||
      pushX >= map[0].length
    ) {
      return false;
    }
    if (map[pushY][pushX] === "#" || map[pushY][pushX] === "O") {
      return false;
    }
  }

  return true;
}

function moveRobot(map, direction) {
  const robot = findRobot(map);
  let dx = 0,
    dy = 0;

  switch (direction) {
    case "^":
      dy = -1;
      break;
    case "v":
      dy = 1;
      break;
    case "<":
      dx = -1;
      break;
    case ">":
      dx = 1;
      break;
  }

  const newX = robot.x + dx;
  const newY = robot.y + dy;
  const pushX = newX + dx;
  const pushY = newY + dy;

  if (!canMove(map, robot.x, robot.y, newX, newY, pushX, pushY)) {
    return;
  }

  if (map[newY][newX] === "O") {
    map[pushY][pushX] = "O";
    map[newY][newX] = "@";
    map[robot.y][robot.x] = ".";
  } else {
    map[newY][newX] = "@";
    map[robot.y][robot.x] = ".";
  }
}

function calculateGPS(map) {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        sum += y * 100 + x;
      }
    }
  }
  return sum;
}

function solve(input) {
  const { map, moves } = parseInput(input);

  for (const move of moves) {
    moveRobot(map, move);
  }

  return calculateGPS(map);
}

const input = fs.readFileSync("data.txt", "utf8");

console.log(solve(input));
