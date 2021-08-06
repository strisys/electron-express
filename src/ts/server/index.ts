import express from 'express';
// import debug from 'debug';
import { Counter } from './features/poc/counter';
import { getLogger } from './util/debug';

const loggerFn = getLogger('server');
const app = express();
const port = 3000;

let counter = new Counter();

app.get('/', (_, res) => {
  res.jsonp(counter.getNext());
});

app.listen(port, () => {
  loggerFn(`App listening at http://localhost:${port}`);
});

export {};