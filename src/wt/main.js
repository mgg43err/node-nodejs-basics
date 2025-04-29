import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';

const performCalculations = async () => {
  const numCores = cpus().length;
  const workerPath = path.join(process.cwd(), 'src', 'wt', 'worker.js');
  const results = [];
  
  return new Promise((resolve) => {
    let completedWorkers = 0;
    
    for (let i = 0; i < numCores; i++) {
      const worker = new Worker(workerPath);
      const workerData = 10 + i;
      
      worker.on('message', (result) => {
        results[i] = result;
        completedWorkers++;
        
        if (completedWorkers === numCores) {
          console.log(results);
          resolve();
        }
      });
      
      worker.on('error', () => {
        results[i] = { status: 'error', data: null };
        completedWorkers++;
        
        if (completedWorkers === numCores) {
          console.log(results);
          resolve();
        }
      });
      
      worker.postMessage(workerData);
    }
  });
};

await performCalculations();