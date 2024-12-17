const fs = require("fs");

class Computer {
  constructor() {
    this.registers = { A: 0, B: 0, C: 0 };
    this.output = [];
    this.ip = 0;
  }

  // Get value based on combo operand rules
  getComboValue(operand) {
    if (operand <= 3) return operand;
    if (operand === 4) return this.registers.A;
    if (operand === 5) return this.registers.B;
    if (operand === 6) return this.registers.C;
    return 0; // operand 7 is reserved
  }

  executeInstruction(opcode, operand) {
    switch (opcode) {
      case 0: // adv
        this.registers.A = Math.floor(
          this.registers.A / Math.pow(2, this.getComboValue(operand))
        );
        break;
      case 1: // bxl
        this.registers.B ^= operand;
        break;
      case 2: // bst
        this.registers.B = this.getComboValue(operand) % 8;
        break;
      case 3: // jnz
        if (this.registers.A !== 0) {
          this.ip = operand;
          return true; // Skip normal IP increment
        }
        break;
      case 4: // bxc
        this.registers.B ^= this.registers.C;
        break;
      case 5: // out
        this.output.push(this.getComboValue(operand) % 8);
        break;
      case 6: // bdv
        this.registers.B = Math.floor(
          this.registers.A / Math.pow(2, this.getComboValue(operand))
        );
        break;
      case 7: // cdv
        this.registers.C = Math.floor(
          this.registers.A / Math.pow(2, this.getComboValue(operand))
        );
        break;
    }
    return false;
  }

  run(program) {
    while (this.ip < program.length) {
      const opcode = program[this.ip];
      const operand = program[this.ip + 1];

      const jumped = this.executeInstruction(opcode, operand);
      if (!jumped) {
        this.ip += 2;
      }
    }
    return this.output.join(",");
  }
}

function solve(input) {
  const lines = input.trim().split("\n");
  const computer = new Computer();

  // Parse initial register values
  for (const line of lines) {
    if (line.startsWith("Register A:")) {
      computer.registers.A = parseInt(line.split(":")[1]);
    } else if (line.startsWith("Register B:")) {
      computer.registers.B = parseInt(line.split(":")[1]);
    } else if (line.startsWith("Register C:")) {
      computer.registers.C = parseInt(line.split(":")[1]);
    } else if (line.startsWith("Program:")) {
      const program = line.split(":")[1].trim().split(",").map(Number);
      return computer.run(program);
    }
  }
}

// Read and solve
const input = fs.readFileSync("data.txt", "utf8");
console.log(solve(input));
