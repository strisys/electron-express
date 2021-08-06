# Electron with Express Embedded (Proof-of-Concept)

### Overview

This is a very simple proof-of-concept Electron application with an Express server embedded.  The idea is to distribute a full web application (i.e. server and client) as one package that can be later be run as a conventional web application with the server in a separate process.

To run the application execute the following

	npm install
	npm start

There is also support to build an installation executable using [Electron Builder](https://www.electron.build/).  

	npm run build-packaged

The resulting installation executable can be found in `<project-root>/dist/electron/installer/win64`.