import { app } from 'electron';
import windowFactory from 'electron-window';
import { createLogger } from '../../util/logger';
import path from 'path';
import is from 'electron-is';
import { ExpressServerStarterService } from './express-util';

const logger = createLogger('shell');
const showDevTools = (is.dev() || true);

function createMainWindow (useWeb = true, port = '') {
  const options = {
    width: 1000,
    height: 800,
    webPreferences: {
      devTools: showDevTools,
      contextIsolation: false
    }
  };

  const mainWindow = windowFactory.createWindow(options);
  mainWindow.title = `Electron-Express v.${app.getVersion()}`;

  const markupPath = ((useWeb) ? `http://localhost:${port}` : path.resolve(__dirname, 'index.html'));
  logger.info(`Markup path [${markupPath}]`);

  mainWindow.showUrl(markupPath, null, () => {
    const appInfo = {
      version: app.getVersion(),
      name: app.getName()
    }

    logger.info(`shell window is showing ${JSON.stringify(appInfo)}`);
    mainWindow.webContents.send('app-info', appInfo.version, appInfo.name);
  });

  // https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions
  if (showDevTools) {
    mainWindow.webContents.openDevTools({
      mode: 'bottom',
      activate: true
    });
  }

  return mainWindow;
}

const runExpress = (useFork = true): Promise<string> => {
  return (new ExpressServerStarterService()).invoke(useFork);
}

export const init = async (): Promise<void> => { 
  const port = (await runExpress());
  createMainWindow(true, port);
}