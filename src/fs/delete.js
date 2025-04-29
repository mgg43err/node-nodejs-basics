import { unlink, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const remove = async () => {
  const filePath = path.join(process.cwd(), 'src', 'fs', 'files', 'fileToRemove.txt');
  
  try {
    // Check if file exists
    await access(filePath, constants.F_OK);
    
      
    await unlink(filePath);
    console.log('File fileToRemove.txt has been deleted');
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    
    throw error;
  }
};

await remove();