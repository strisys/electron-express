import express, { Request } from 'express';
import process from 'process';
import path from 'path';
import { Counter } from './features/poc/counter';
import { getLogger } from './util/debug';

const loggerFn = getLogger('server');
const app = express();
const port = 3001;

let counter = new Counter();

app.get('/count', (req: Request, res) => {
  process.send(`processing request ... [path:=${req.path}]`);
  res.jsonp(counter.getNext());
});

app.listen(port, () => {
  loggerFn(`App listening at http://localhost:${port}`);
});

// http://expressjs.com/en/starter/static-files.html
const staticPath = path.join(__dirname, '../client/web/static');
app.use(express.static(staticPath));

process.on('message', (val) => {
  loggerFn(`IPC message from parent process: [${val}]`);
})

export {};