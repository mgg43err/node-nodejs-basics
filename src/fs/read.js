import { readFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const read = async () => {
  const filePath = path.join(process.cwd(), 'src', 'fs', 'files', 'fileToRead.txt');
  
  try {
    // Check if file exists
    await access(filePath, constants.F_OK);
    
    const content = await readFile(filePath, 'utf8');
    console.log(content);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    
    throw error;
  }
};

await read();