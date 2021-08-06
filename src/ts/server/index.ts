import express from 'express';

const app = express();
const port = 3000;
let count = 0;

app.get('/', (_, res) => {
  res.jsonp({ 
    count: ++count
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export {};