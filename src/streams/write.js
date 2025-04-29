import { createWriteStream } from 'fs';
import path from 'path';

const write = async () => {
  const filePath = path.join(process.cwd(), 'src', 'streams', 'files', 'fileToWrite.txt');
  const writeStream = createWriteStream(filePath);
  
  return new Promise((resolve, reject) => {
    process.stdin.pipe(writeStream);
    
    process.stdin.on('error', (error) => {
      reject(error);
    });
    
    writeStream.on('error', (error) => {
      reject(error);
    });
    
    process.stdin.on('end', () => {
      writeStream.end();
      resolve();
    });
  });
};

await write();