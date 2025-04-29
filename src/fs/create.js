import { writeFile, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const create = async () => {
  const filePath = path.join(process.cwd(), 'src', 'fs', 'files', 'fresh.txt');
  const content = 'I am fresh and young';
  
  try {
    await access(filePath, constants.F_OK);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, content);
      console.log('File fresh.txt has been created');
    } else {
      // Re-throw the error
      throw error;
    }
  }
};

await create();