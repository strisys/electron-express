

import electronReload from 'electron-reload';
import path from 'path';

const targetPath = path.join(__dirname, '../../../');
const electonPath = path.join(targetPath, '../', 'node_modules', 'electron', 'dist');

export const start = () => {
  console.log(`configuring electron reload to listen for changes in '${targetPath}'`);

  // electronReload(targetPath, {
  //   electron: electonPath
  // });
}
