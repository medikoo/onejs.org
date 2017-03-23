# [onejs.org](https://onejs.org)
## Simple documentation website for JS packages (WIP)

### Installation

Requires relatively recent (v4+) version of [Node.js](https://nodejs.org/en/) on board

	$ git clone git@github.com:medikoo/onejs.org.git && cd onejs.org
	$ npm start

If no specific port was provided in eventual [environment](#enviroment) configuration, the application will be accessible at `3177` port:  [http://localhost:3177](http://localhost:3177) 

### Environment settings

Via optional `env.js` file you may customize following settings:

#### `env` - environment mode

Either `'development'` or `'production'`.

If not found at `env.js`, then it is read from `NODE_ENV` system environment variable. If none provided then it defaults to `production` if env.js configuration file exists, and `development` otherwise.

#### `port` - server port

At which port application should be served. Defaults to `3177`
