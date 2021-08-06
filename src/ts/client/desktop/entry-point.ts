import { app } from 'electron';
import { createLogger } from './util/logger';
import { init as initDesktop } from './views/shell/main';
import { init as initServer } from './views/server-init/main';

const logger = createLogger('entry-point');

const initialize = () => {
  logger.info('ready: starting application ...');
  // initServer();
  initDesktop();
}

const quit = () => {
  if (process.platform !== 'darwin') {
    logger.info(`closing application ...`);
    app.quit();
  }
}

app.on('ready', initialize);
app.on('window-all-closed', quit);

export {};