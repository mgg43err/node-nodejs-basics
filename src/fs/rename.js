import { rename, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const renameFile = async () => {
  const oldPath = path.join(process.cwd(), 'src', 'fs', 'files', 'wrongFilename.txt');
  const newPath = path.join(process.cwd(), 'src', 'fs', 'files', 'properFilename.md');
  
  try {

    await access(oldPath, constants.F_OK);
    
    try {
      await access(newPath, constants.F_OK);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    
    await rename(oldPath, newPath);
    console.log('File has been renamed from wrongFilename.txt to properFilename.md');
    
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

await renameFile();