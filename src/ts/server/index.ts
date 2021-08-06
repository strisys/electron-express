import express from 'express';
import { Counter } from './features/poc/counter';

const app = express();
const port = 3000;

let counter = new Counter();

app.get('/', (_, res) => {
  res.jsonp(counter.getNext());
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export {};