import { app, ipcMain } from 'electron';
import cp from 'child_process';
import windowFactory from 'electron-window';
import { createLogger } from '../../util/logger';
import path from 'path';
import is from 'electron-is';

const logger = createLogger('shell');
const isDev = (is.dev() || true);

function createMainWindow () {
  const options = {
    width: 1000,
    height: 800,
    webPreferences: {
      devTools: isDev,
      contextIsolation: false,
      // preload: path.join(__dirname, 'bridge.js')
    }
  };

  const mainWindow = windowFactory.createWindow(options);
  mainWindow.title = `Electron-Express v.${app.getVersion()}`;

  const markupPath = path.resolve(__dirname, 'index.html');

  mainWindow.showUrl(markupPath, null, () => {
    const appInfo = {
      version: app.getVersion(),
      name: app.getName()
    }

    logger.info(`shell window is showing ${JSON.stringify(appInfo)}`);
    mainWindow.webContents.send('app-info', appInfo.version, appInfo.name);
  });

  // https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions
  if (isDev) {
    mainWindow.webContents.openDevTools({
      mode: 'bottom',
      activate: true
    });
  }

  return mainWindow;
}

const runExpress = () => {
  try {
    const modulePath = ((is.dev()) ? './dist/server/index' : '../../../../server/index');
    logger.info(`Attempting to start embedded web server ... [isdev: ${is.dev()}, dir:=${__dirname}, path:=${modulePath}]`);
    
    // https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
    const child = cp.fork(modulePath);

    child.send('are you awake?');
    child.on('message', (msg) => { 
      logger.info(`IPC message from server [${msg}]`);
    })
  }
  catch (ex) {
    logger.error(`Failed to start embedded web server.  ${JSON.stringify(ex)}`);
  }
  
  // require('../../../../server/index');
}

export const init = (): void => { 
  runExpress();
  createMainWindow();
}

// ipcMain.on('count', (data) => {
//   logger.info(`Message received from renderer (${data})`);
// });