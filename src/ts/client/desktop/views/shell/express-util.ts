import cp from 'child_process';
import { createLogger } from '../../util/logger';
import path from 'path';
import is from 'electron-is';

const logger = createLogger('express-util');

export class ExpressServerStarterService {
  private get serverPath(): string {
    const releasePath = path.join(__dirname, '../../../../', 'server', 'index');
    return ((is.dev()) ? './dist/server/index' : releasePath);
  }

  public invoke = async (useFork = true): Promise<string> => {
    if (!useFork) {
      return require('../../../../server/index');
    }
  
    const startChildProcess = (resolve, reject) => {
      let isDone = false;
      let port = 3001;

      try {
        logger.info(`Attempting to start embedded web server ... [isdev: ${is.dev()}, path:=${this.serverPath}, dir:=${__dirname}]`);
        
        // https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
        const child = cp.fork(this.serverPath);
    
        child.send('port');
    
        const trySetPort = (msg: any) => {
          if (isDone) {
            return;
          }

          if (msg.port) {
            port = msg.port;

            logger.error(`Embedded HTTP server started successfully listening on port '${port}'}`);
            isDone = true;
            resolve(port);
          }
    
          logger.info(`IPC message from server [${JSON.stringify(msg)}]`);
        }

        // Use IPC to get port number 
        child.on('message', trySetPort);
  
        setTimeout(() => {
          if (!isDone) {
            resolve(port);
          }
        }, 5000);
      }
      catch (ex) {
        logger.error(`Failed to start embedded HTTP server.  ${JSON.stringify(ex)}`);
        isDone = true;
        reject();
      }
    }
  
    return (new Promise(startChildProcess));
  }
}