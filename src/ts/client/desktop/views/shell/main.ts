import { app, ipcMain } from 'electron';
import cp from 'child_process';
import windowFactory from 'electron-window';
import { createLogger } from '../../util/logger';
import path from 'path';
import is from 'electron-is';
import { ExpressServerStarterService } from './express-util';

const logger = createLogger('shell');
const showDevTools = (is.dev() || true);
let port = '3001';

function createMainWindow (useWeb = true) {
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

const runExpress = async (useFork = true) => {
  // const service: ExpressServerStarterService = new ExpressServerStarterService();
  port = (await (new ExpressServerStarterService()).start());


  // if (!useFork) {
  //   return require('../../../../server/index');
  // }

  // const startChildProcess = (resolve, reject) => {
  //   let resolved = false;

  //   try {
  //     const releasePath = path.join(__dirname, '../../../../', 'server', 'index');
  //     const modulePath = ((is.dev()) ? './dist/server/index' : releasePath);
  //     logger.info(`Attempting to start embedded web server ... [isdev: ${is.dev()}, path:=${modulePath}, dir:=${__dirname}]`);
      
  //     // https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
  //     const child = cp.fork(modulePath);
  
  //     child.send('port');
  
  //     child.on('message', (msg: any) => { 
  //       if (msg.port) {
  //         logger.info(`Embedded port number reply: ${msg.port}`);
  //         port = msg.port;
  //         resolved = true;
  //         resolve();
  //       }
  
  //       logger.info(`IPC message from server [${JSON.stringify(msg)}]`);
  //     });

  //     if (!resolved) {
  //       setTimeout(resolve, 5000);
  //     }
  //   }
  //   catch (ex) {
  //     logger.error(`Failed to start embedded web server.  ${JSON.stringify(ex)}`);
  //     reject();
  //   }
  // }

  // return (new Promise(startChildProcess));
}

export const init = async (): Promise<void> => { 
  await runExpress();
  createMainWindow();
}