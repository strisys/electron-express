import cp from 'child_process';
import { createLogger } from '../../util/logger';
const logger = createLogger('shell');
import path from 'path';
import is from 'electron-is';

export class ExpressServerStarterService {
  public start = async (useFork = true): Promise<string> => {
    if (!useFork) {
      return require('../../../../server/index');
    }
  
    const startChildProcess = (resolve, reject) => {
      let resolved = false;
      let port = 3001;

      try {
        const releasePath = path.join(__dirname, '../../../../', 'server', 'index');
        const modulePath = ((is.dev()) ? './dist/server/index' : releasePath);
        logger.info(`Attempting to start embedded web server ... [isdev: ${is.dev()}, path:=${modulePath}, dir:=${__dirname}]`);
        
        // https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
        const child = cp.fork(modulePath);
    
        child.send('port');
    
        child.on('message', (msg: any) => { 
          if (msg.port) {
            logger.info(`Embedded port number reply: ${msg.port}`);
            port = msg.port;
            resolved = true;
            resolve(port);
          }
    
          logger.info(`IPC message from server [${JSON.stringify(msg)}]`);
        });
  
        if (!resolved) {
          setTimeout(() => {
            resolve(port);
          }, 5000);
        }
      }
      catch (ex) {
        logger.error(`Failed to start embedded web server.  ${JSON.stringify(ex)}`);
        reject();
      }
    }
  
    return (new Promise(startChildProcess));
  }
}