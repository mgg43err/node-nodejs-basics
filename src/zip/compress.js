import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';

const compress = async () => {
  const sourcePath = path.join(process.cwd(), 'src', 'zip', 'files', 'fileToCompress.txt');
  const destPath = path.join(process.cwd(), 'src', 'zip', 'files', 'archive.gz');
  
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gzip = createGzip();
    
    readStream.pipe(gzip).pipe(writeStream);
    
    readStream.on('error', reject);
    gzip.on('error', reject);
    writeStream.on('error', reject);
    
    writeStream.on('finish', () => {
      console.log('File has been compressed');
      resolve();
    });
  });
};

await compress();