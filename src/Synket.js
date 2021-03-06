var childProcess = require('child_process');

module.exports = class {
	constructor(socket) {
		this.socket = socket;
	}

	startServer(module) {
		return childProcess.spawnSync('node', [__dirname + '/Client.js', 'start', JSON.stringify({args: [this.socket, module]})	]);
	}

	send(data, args) {
		if (args) {
			data = JSON.stringify({message: data, args: args});
		}

		var result = childProcess.spawnSync('node', [__dirname + '/Client.js', 'send', JSON.stringify({args: [this.socket, 
												 data 
												]})]);

		if (new Buffer(result.stderr).toString().trim("\n").length > 0) {
			throw new Error(new Buffer(result.stderr).toString());
		}
		return new Buffer(result.stdout).toString().trim("\n");
	}
}
