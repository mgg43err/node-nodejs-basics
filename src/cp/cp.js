import { spawn } from 'child_process';
import path from 'path';

const spawnChildProcess = async (args) => {
  const scriptPath = path.join(process.cwd(), 'src', 'cp', 'files', 'script.js');
  
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  
  return new Promise((resolve) => {
    childProcess.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      resolve();
    });
  });
};

await spawnChildProcess(['arg1', 'arg2', '--flag', 'value']);
