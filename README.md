# [onejs.org](https://onejs.org)
## Simple documentation website for JS packages (WIP)

### Local deployment

Pre-requisites: [Git](https://git-scm.com/) and relatively recent (v7.6+) version of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) on board

	$ git clone git@github.com:medikoo/onejs.org.git && cd onejs.org
	$ npm start

If not stated otherwise (in an eventual [environment](#environment) configuration), the portal will be accessible at `3177` port:  [http://localhost:3177](http://localhost:3177) 

### Environment settings

Via optional `env.js` file you may customize following settings:

#### `env` - environment mode

Either `'development'` or `'production'`.

If not found at `env.js`, then it is read from `NODE_ENV` system environment variable. If none provided then it defaults to `production` if env.js configuration file exists, and `development` otherwise.

#### `port` - server port

At which port application should be served. Defaults to `3177`
