import { mkdir, cp, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const copy = async () => {
  const srcPath = path.join(process.cwd(), 'src', 'fs', 'files');
  const destPath = path.join(process.cwd(), 'src', 'fs', 'files_copy');
  
  try {
    await access(srcPath, constants.F_OK);
     
    try {
      await access(destPath, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    
    await cp(srcPath, destPath, { recursive: true });
    console.log('Files folder has been copied to files_copy');
    
  } catch (error) {
    if (error.message === 'FS operation failed') {
      throw error;
    }
    
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    
    throw error;
  }
};

await copy();
