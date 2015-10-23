module.exports = function() {

	this.options = require("nomnom")
	// --------------------------------------- Global options.
	.option('etcdhost', {
		abbr: 'e',
		default: '127.0.0.1',
		help: 'Set etcd host or ip address'
	})
	.option('etcdport', {
		abbr: 'o',
		default: '4001',
		help: 'Set etcd host or ip address'
	})
	.option('rootkey', {
		abbr: 'r',
		default: 'asterisk',
		help: 'Set etcd root key to use'
	})
	// --------------------------------------- Dispatcher options.
	.option('timeout', {
		abbr: 't',
		default: 20000,
		help: 'Timeout before heartbeat pulse check fails (in milliseconds)'
	})
	.option('listpath', {
		abbr: 'l',
		default: "/etc/kamailio/dispatcher.list",
		help: 'Path of the dispatcher.list file [dispatcher mode only]'
	})
	// --------------------------------------- Announcer options.
	.option('announce', {
		abbr: 'a',
		flag: true,
		help: 'Start in "announce" mode (defaults to dispatcher mode)'
	})
	.option('announceip', {
		abbr: 'i',
		default: "127.0.0.1",
		help: 'IP Address to announce [announce mode only]'
	})
	.option('announcename', {
		abbr: 'n',
		help: 'Name to use in announcement, is key in etcd [announce mode only]'
	})
	.option('announceport', {
		abbr: 'p',
		default: false,
		help: 'Port to announce [announce mode only]'
	})
	.option('weight', {
		abbr: 'w',
		default: false,
		help: 'Percentage of calls to distribute to this node [announce mode only]'
	})
	.option('heartbeat', {
		abbr: 'h',
		default: 5000,
		help: 'Time between heartbeat pulses [announce mode only] (in milliseconds)'
	})
	// --------------------------------------- Logging options.
	.option('logdisable', {
		abbr: 'h',
		flag: true,
		help: 'Disable logging (usually for unit testing)'
	})
	.parse();

}