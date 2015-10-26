// We need to see if the etcd host if alive at all...
module.exports = function(log,opts) {

	var http = require('http');

	var httpoptions = {
		hostname: opts.etcdhost,
		port: opts.etcdport,
		path: '/version',
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	};

	this.isalive = function(callback) {

		var req = http.request(httpoptions, function(res) {

			// res.setEncoding('utf8');

			res.on('data', function (data) {
				var version;

				try {
					version = JSON.parse(data);
				} catch (e) {
					log.error('json_parse_etcd_version',{ note: 'etcd version did not parse', error: e});
					callback(e);
				}

				// console.log(version);
				if (version.etcdserver.match(/\d\.\d\.\d/)) {
					// Looks like we have a good version.
					log.it('etcd_alive',{version: version});
					callback(false);
				}
			});

		});

		req.on('error', function(e) {
			log.error('check_etcd_alive',{ note: 'could not see that etcd is alive', error: e, httpoptions: httpoptions});
			callback(e);
		});
		req.end();


	}


}