import { spawn } from 'child_process';

// Run the Python script
const pythonProcess = spawn('python3', ['./src/script.py']);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python script output: ${data.toString()}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python script error: ${data.toString()}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python script exited with code ${code}`);
});