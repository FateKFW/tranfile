const pak = require('../package.json')
const cli = require('./cli.js')

const conf = (function(){
	cli.program({name:pak.name,version:pak.version})
	.option(['-v', '--version'], {action: 'version'})
	.option(['-h', '--help'], {action: 'help'})
	.option(['-p', '--port'], {metavar: 'port', help: 'specify server port'})
	.option(['-a', '--address'], {metavar: 'address', help: 'specify server host'})
	.parse(process.argv)
	
	let conf_res = {}
	Object.assign(conf_res,cli)
	
	delete conf_res.width
	delete conf_res.program
	delete conf_res.option
	delete conf_res.parse
	delete conf_res._options
		
	conf_res.port = conf_res.port || "8080"
	conf_res.address = conf_res.address || "."
		
	return conf_res
})();

module.exports = conf