# Electron with Express Embedded (Proof-of-Concept)

### Overview

This is a very simple proof-of-concept Electron application with an [Express.js](http://expressjs.com/) server embedded.  The idea is to distribute a full web application (i.e. server and client) as one package that can be *perhaps later* be run as a conventional web application with the server in a separate process.  This is suitable for development initiatives in corporate environments where the application likely will be released *before* the infrastructure is approved or is ready.

To run the application execute the following

	npm install
	npm start

There is also support to build an installation executable using [Electron Builder](https://www.electron.build/).  

	npm run build-packaged

The resulting installation executable can be found in `<project-root>/dist/electron/installer/win64`.