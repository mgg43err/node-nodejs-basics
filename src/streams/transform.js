import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    }
  });
  
  return new Promise((resolve, reject) => {
    process.stdin.pipe(reverseTransform).pipe(process.stdout);
    
    process.stdin.on('error', (error) => {
      reject(error);
    });
    
    reverseTransform.on('error', (error) => {
      reject(error);
    });
    
    process.stdin.on('end', () => {
      resolve();
    });
  });
};

await transform();