# [Electron with Express Embedded (Proof-of-Concept)](https://github.com/strisys/electron-express)

### Overview

This is a very simple proof-of-concept Electron application with an [Express.js](http://expressjs.com/) server embedded.  The idea is to distribute a full web application (i.e. server and client) as one distributable that can be be run as a conventional web application (i.e. HTTP server in a separate process) at a later time.  This is useful for development initiatives where the web application likely will be released *before* the infrastructure is approved or ready.

To run the application execute the following

	npm install
	npm start

There is also support to build a Windows 64-bit installation executable using [Electron Builder](https://www.electron.build/).  The resulting installation executable can be found in `<project-root>/dist/electron/installer/win64`.  Run the following command to create the installation.

	npm run build-packaged

