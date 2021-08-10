import express, { Request } from 'express';
import process from 'process';
import path from 'path';
import { Counter } from './features/poc/counter';
import { getLogger } from './util/debug';

const loggerFn = getLogger('server');
const app = express();
const configuredPort = 0;
let actualPort = configuredPort;

const counter = new Counter();

app.get('/count', (req: Request, res) => {
  process.send(`processing request ... [path:=${req.path}]`);
  res.jsonp(counter.getNext());
});

// http://expressjs.com/en/starter/static-files.html
const staticPath = path.join(__dirname, '../client/web/static');
app.use(express.static(staticPath));

const server = app.listen(configuredPort, () => {
  actualPort = server.address()['port'];
  loggerFn(`App listening at http://localhost:${actualPort}`);
});

process.on('message', (val) => {
  loggerFn(`IPC message from parent process: [${val}]`);
  process.send({ port: actualPort });
})

export {};