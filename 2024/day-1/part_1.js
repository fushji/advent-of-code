const fs = require("fs");

function calculateTotalDistance(input) {
  // Split input into rows and separate into two lists
  const rows = input.trim().split("\n");
  const list1 = [];
  const list2 = [];

  rows.forEach((row) => {
    const [num1, num2] = row.trim().split(/\s+/).map(Number);
    list1.push(num1);
    list2.push(num2);
  });

  // Sort the lists
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // Calculate total distance
  let totalDistance = 0;
  for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }

  return totalDistance;
}

// Read input and calculate result
const input = fs.readFileSync("data.txt", "utf8");
console.log("Total distance:", calculateTotalDistance(input));
