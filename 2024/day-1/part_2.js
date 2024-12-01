const fs = require("fs");

function calculateSimilarityScore(input) {
  // Split input into rows and separate into two lists
  const rows = input.trim().split("\n");
  const leftList = [];
  const rightList = [];

  rows.forEach((row) => {
    const [num1, num2] = row.trim().split(/\s+/).map(Number);
    leftList.push(num1);
    rightList.push(num2);
  });

  // Calculate frequency of numbers in right list
  const rightFrequency = rightList.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  // Calculate similarity score
  const similarityScore = leftList.reduce((score, num) => {
    const frequency = rightFrequency[num] || 0;
    return score + num * frequency;
  }, 0);

  return similarityScore;
}

// Read input and calculate result
const input = fs.readFileSync("data.txt", "utf8");
console.log("Similarity score:", calculateSimilarityScore(input));
