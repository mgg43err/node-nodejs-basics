import { createReadStream } from 'fs';
import path from 'path';

const read = async () => {
  const filePath = path.join(process.cwd(), 'src', 'streams', 'files', 'fileToRead.txt');
  const readStream = createReadStream(filePath);
  
  return new Promise((resolve, reject) => {
    readStream.pipe(process.stdout);
    
    readStream.on('error', (error) => {
      reject(error);
    });
    
    readStream.on('end', () => {
      resolve();
    });
  });
};

await read();