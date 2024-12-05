const fs = require("fs");

function parseInput(input) {
  const [rulesSection, sequencesSection] = input.trim().split("\n\n");

  // Parse rules into array of [before, after] pairs
  const rules = rulesSection.split("\n").map((rule) => {
    const [before, after] = rule.split("|");
    return [parseInt(before), parseInt(after)];
  });

  // Parse sequences into arrays of numbers
  const sequences = sequencesSection
    .split("\n")
    .map((seq) => seq.split(",").map(Number));

  return { rules, sequences };
}

function isValidSequence(sequence, rules) {
  // Create set of pages in this sequence
  const pageSet = new Set(sequence);

  // Check only rules that involve pages in this sequence
  for (const [before, after] of rules) {
    if (pageSet.has(before) && pageSet.has(after)) {
      const beforeIndex = sequence.indexOf(before);
      const afterIndex = sequence.indexOf(after);
      if (beforeIndex > afterIndex) {
        return false;
      }
    }
  }
  return true;
}

function createGraph(rules, sequence) {
  const graph = new Map();
  const inDegree = new Map();
  const pageSet = new Set(sequence);

  for (const page of sequence) {
    graph.set(page, new Set());
    inDegree.set(page, 0);
  }

  for (const [before, after] of rules) {
    if (pageSet.has(before) && pageSet.has(after)) {
      graph.get(before).add(after);
      inDegree.set(after, inDegree.get(after) + 1);
    }
  }

  return { graph, inDegree };
}

function topologicalSort(sequence, rules) {
  const { graph, inDegree } = createGraph(rules, sequence);
  const result = [];
  const queue = [];

  for (const [page, degree] of inDegree) {
    if (degree === 0) queue.push(page);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const next of graph.get(current)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  return result;
}

function solve(input) {
  const { rules, sequences } = parseInput(input);
  let sum = 0;

  for (const sequence of sequences) {
    if (!isValidSequence(sequence, rules)) {
      const sortedSequence = topologicalSort(sequence, rules);
      const middleIndex = Math.floor(sortedSequence.length / 2);
      sum += sortedSequence[middleIndex];
    }
  }

  return sum;
}

// Read and solve
const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
