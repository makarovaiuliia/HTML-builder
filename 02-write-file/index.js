const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Enter text to write to the file. Type "exit" to quit.');

const handleInput = (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
    fileStream.close();
    process.exit();
  } else {
    fileStream.write(input + '\n');
    rl.prompt();
  }
};

rl.on('line', handleInput).prompt();

process.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
  fileStream.close();
  process.exit();
});
