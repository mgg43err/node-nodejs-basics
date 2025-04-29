import { readdir, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const list = async () => {
  const dirPath = path.join(process.cwd(), 'src', 'fs', 'files');
  
  try {
    await access(dirPath, constants.F_OK);
    
    // Read directory contents
    const files = await readdir(dirPath);
    console.log(files);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    
    throw error;
  }
};

await list();