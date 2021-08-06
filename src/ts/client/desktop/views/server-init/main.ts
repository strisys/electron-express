import { BrowserWindow } from 'electron';
import { createLogger } from '../../util/logger';
import path from 'path';

const logger = createLogger('server-init');

const runServer = () => {
  require('../../../../server/index');

  const window = new BrowserWindow({ 
    show: true,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  logger.info(`loading hidden window to bootstrap express server`);
  const markupPath = path.resolve(__dirname, 'index.html');
  window.loadURL(markupPath);


}

export const init = runServer;