import log from 'electron-log';
import process from 'process';
import path from 'path';
import { format } from 'date-fns';

// https://github.com/megahertz/electron-log
log.transports.file.resolvePath = () => path.join(process.cwd(), `logs/${format(new Date(), 'yyyy-MM-dd')}.log`);
log.transports.file.format = log.transports.console.format = '[{level} {h}:{i}:{s}.{ms}{scope}]  {text}';
console.log = log.log;
Object.assign(console, log.functions);

log.info(`----------------------------- application starting [${format(new Date(), 'yyyy-MM-dd-hh-mm-ss')}] ---------------------------------------`);

export const createLogger = (scope: string): any => {
  return log.scope(scope);
}