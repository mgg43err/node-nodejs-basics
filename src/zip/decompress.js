import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';

const decompress = async () => {
  const sourcePath = path.join(process.cwd(), 'src', 'zip', 'files', 'archive.gz');
  const destPath = path.join(process.cwd(), 'src', 'zip', 'files', 'fileToCompress.txt');
  
  return new Promise((resolve, reject) => {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gunzip = createGunzip();
    
    readStream.pipe(gunzip).pipe(writeStream);
    
    readStream.on('error', reject);
    gunzip.on('error', reject);
    writeStream.on('error', reject);
    
    writeStream.on('finish', () => {
      console.log('File has been decompressed');
      resolve();
    });
  });
};

await decompress();