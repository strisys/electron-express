  
// import { createLogger } from '../../util/logger';
// const logger = createLogger('server-init');

// console.info(`initializing server ...`);

// try {
//   alert('here');
//   require('../../../../server/index');
// }
// catch (ex) {
//   alert(JSON.stringify(ex));
// }

try {
  
  const express = require('express');
  alert('here');

  if (express) {
    alert('express');
  }

  // const app = express();

  // if (app) {
  //   alert('app created');
  // }
  
  // const port = 3000;
  
  // app.get('/', (_, res) => {
  //   res.jsonp({ 
  //     message: 'Hello World!' 
  //   });
  // });
  
  // app.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`);
  // });
}
catch (ex) {
  alert(JSON.stringify(ex));
}

export {};