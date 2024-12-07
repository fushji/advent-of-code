const fs = require("fs");

function evaluateExpression(numbers, operators) {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else {
      result *= numbers[i + 1];
    }
  }
  return result;
}

function generateOperatorCombinations(length) {
  const operators = ["+", "*"];
  const combinations = [];

  function generate(current) {
    if (current.length === length) {
      combinations.push([...current]);
      return;
    }
    for (let op of operators) {
      current.push(op);
      generate(current);
      current.pop();
    }
  }

  generate([]);
  return combinations;
}

function processLine(line) {
  const [testValue, numbersStr] = line.split(": ");
  const numbers = numbersStr.split(" ").map(Number);
  const target = parseInt(testValue);

  const operatorCombinations = generateOperatorCombinations(numbers.length - 1);

  return operatorCombinations.some(
    (operators) => evaluateExpression(numbers, operators) === target
  )
    ? target
    : 0;
}

function solve(input) {
  const lines = input.trim().split("\n");
  return lines.reduce((sum, line) => sum + processLine(line), 0);
}

const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
