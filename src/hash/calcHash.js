import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const calculateHash = async () => {
  const filePath = path.join(process.cwd(), 'src', 'hash', 'files', 'fileToCalculateHashFor.txt');
  
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    
    stream.on('error', (error) => {
      reject(error);
    });
    
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    
    stream.on('end', () => {
      console.log(hash.digest('hex'));
      resolve();
    });
  });
};

await calculateHash();