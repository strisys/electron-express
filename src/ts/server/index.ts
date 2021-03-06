import express, { Request } from 'express';
import process from 'process';
import path from 'path';
import { Counter } from './features/poc/counter';
import { getLogger } from './util/debug';

const loggerFn = getLogger('server');
const app = express();
const defaultPort = 3001;
let actualPort = defaultPort;

const counter = new Counter();

const isChildProcess = (): boolean => {
  return Boolean(process.send);
}

const getConfiguredPort = (): number => {
  return ((isChildProcess()) ? 0 : defaultPort);
}

app.get('/count', (req: Request, res) => {
  if (isChildProcess()) {
    process.send({ 
      message: 'request-log', 
      path: req.path,
      query: req.query,
      port: actualPort, 
      pid: process.pid
    });
  }

  res.jsonp(counter.getNext());
});

// http://expressjs.com/en/starter/static-files.html
const staticPath = path.join(__dirname, '../client/web/static');
app.use(express.static(staticPath));

const server = app.listen(getConfiguredPort(), () => {
  actualPort = server.address()['port'];
  loggerFn(`App listening at http://localhost:${actualPort}`);
});

if (isChildProcess()) {
  process.on('message', (val) => {
    loggerFn(`IPC message from parent process: [${val}]`);
    process.send({ port: actualPort });
  })
}

export {};