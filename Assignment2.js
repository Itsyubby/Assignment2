// Git Assignment: Branching and Merging
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numbers = [];

console.log("Enter integers. Enter 'q' to quit.");

function ask() {
  rl.question("Enter an integer or 'q': ", (input) => {
    // Prompts the user for integers until the user enters a q to quit.
    if (input.toLowerCase() === 'q') {
      console.log("Integers entered:", numbers.join(", "));
      runLogic();
      rl.close();
      return;
    }

    // 2. Error Handling: Check if it's a valid integer
    const num = parseInt(input);
    // This ensures no decimals and no random strings
    if (!isNaN(num) && Number.isInteger(Number(input))) {
      numbers.push(num);
    } else {
      console.log("Error: Please enter a valid integer or 'q' to quit.");
    }
    
    ask(); // Repeat
  });
}

function runLogic() {
  let found = false;

  // We need at least 3 numbers to satisfy the "third integer" rule
  if (numbers.length < 3) {
    console.log("Condition was not met (not enough integers).");
    return;
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      let product = numbers[i] * numbers[j];

      // We look for the product in the array
      // But we must ensure the product found is at a DIFFERENT index than i or j
      const productIndex = numbers.indexOf(product);
      
      if (productIndex !== -1 && productIndex !== i && productIndex !== j) {
        console.log(`Condition is met: ${numbers[i]} x ${numbers[j]} = ${product}`);
        found = true;
        break;
      }
    }
    if (found) break;
  }

  if (!found) {
    console.log("Condition was not met");
  }
}

ask();