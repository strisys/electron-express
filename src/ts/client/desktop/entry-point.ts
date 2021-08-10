import { app } from 'electron';
import { createLogger } from './util/logger';
import { init as initDesktop } from './views/shell/main';

const logger = createLogger('entry-point');

const initialize = async () => {
  logger.info('ready: starting application ...');
  await initDesktop();
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