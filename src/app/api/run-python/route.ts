// app/api/run-python/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function GET() {
  try {
    // Run the Python script
    const { stdout, stderr } = await execPromise('python3 ./src/script.py');

    if (stderr) {
      throw new Error(stderr);
    }

    // Return the Python script output
    return NextResponse.json({ output: stdout });
  } catch (error) {
    // Return any error that occurred during script execution
    if (error instanceof Error) {
      console.error('Error executing Python script:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}