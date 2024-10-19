import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function GET() {
  try {
    const pythonScriptPath = path.join(process.cwd(), 'src/script.py');
    
    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python3', [pythonScriptPath]);

    let scriptOutput = '';
    let scriptError = '';

    // Handle stdout (script output)
    pythonProcess.stdout.on('data', (data) => {
      scriptOutput += data.toString(); // Accumulate output data
    });

    // Handle stderr (script errors)
    pythonProcess.stderr.on('data', (data) => {
      scriptError += data.toString(); // Accumulate error data
    });

    // Handle process exit
    return new Promise((resolve) => {
      pythonProcess.on('close', (code) => {
        if (code === 0 && scriptError === '') {
          // Python script executed successfully
          resolve(NextResponse.json({ output: scriptOutput }));
        } else {
          // Error occurred during script execution
          console.error('Error executing Python script:', scriptError || `Exit code: ${code}`);
          resolve(NextResponse.json({ error: scriptError || `Python script exited with code ${code}` }, { status: 500 }));
        }
      });
    });

  } catch (error) {
    // Handle any errors that occurred outside the Python process
    if (error instanceof Error) {
      console.error('Error executing Python script:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
