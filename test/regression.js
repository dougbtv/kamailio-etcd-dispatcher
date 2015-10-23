/*

var restify = require('restify');
var client = restify.createJsonClient({
	version: '*',
	// connectTimeout: 500,
	// requestTimeout: 500,
	url: 'http://127.0.0.1:8000'
});

*/

/*

https://coreos.com/etcd/docs/latest/docker_guide.html

docker run -d -v /usr/share/ca-certificates/:/etc/ssl/certs -p 4001:4001 -p 2380:2380 -p 2379:2379 \
 --name etcd quay.io/coreos/etcd:latest \
 -name etcd0 \
 -advertise-client-urls http://127.0.0.1:2379,http://127.0.0.1:4001 \
 -listen-client-urls http://0.0.0.0:2379,http://0.0.0.0:4001 \
 -initial-advertise-peer-urls http://127.0.0.1:2380 \
 -listen-peer-urls http://0.0.0.0:2380 \
 -initial-cluster-token etcd-cluster-1 \
 -initial-cluster etcd0=http://127.0.0.1:2380 \
 -initial-cluster-state new

*/

var fork = require('child_process').fork;
var path = require('path');
var fs = require('fs');
var async = require('async');

// Load options generally....
var Options = require('../Options.js');
var options = new Options();
var opts = options.options;

// Then set specifics we need here...
opts.logdisable = true;
opts.listpath = '/tmp/ked-test/dispatcher.list';

// Create our logging option...
var Log = require('../Log.js');
var log = new Log(opts);

// Because we use it for alive....
var Alive = require('../Alive.js');
var alive = new Alive(log,opts);

// And we'll talk etcd.
var Etcd = require('node-etcd');
var etcd = new Etcd(opts.etcdhost, opts.etcdport);

// Set up child process params

var dispatcher;
var announcer_a;
var announcer_b;


module.exports = {
	setUp: function (callback) {
		// console.log("!trace SETUP");
		callback();
	},
	/*
	tearDown: function (callback) {
		// clean up
		console.log("!trace TEARDOWN");
		app.kill();
		callback();
	},
	*/
	ensureKamailioDir: function(test) {

		var dirname = path.dirname(opts.listpath);
		fs.exists(dirname,function(exists){
			
			if (exists) {
				fs.stat(dirname,function(err,stat){
					test.ok(stat.isDirectory(),"Kamailio path exists");
					test.done();
				});
			} else {
				fs.mkdir(dirname,function(err){
					test.ok(!err,"Made kamailio path");
					test.done();
				});
			}
		});
	},
	truncateLogs: function(test) {
		var logfiles = ['/tmp/announcer_a.log','/tmp/announcer_b.log','/tmp/dispatcher.log'];
		async.each(logfiles, function(file,callback){
			fs.exists(file,function(exists){
				if (exists) {
					fs.truncate(file,0,function(err){
						callback(err);
					});
				} else {
					callback(false);
				}
			});
		},function(err){
			test.ok(!err,"Truncated Logs");
			test.done();
		});
	},
	etcdalive: function(test) {
		alive.isalive(function(err){
			test.ok(!err,"etcd is alive");
			test.done();
		});
	},
	etcdremovekey: function(test) {
		etcd.del( opts.rootkey + "/", { recursive: true }, function(result){
			test.ok(true, "Remove resulted: " + result);
			test.done();
		});
	},
	bootDispatcher: function(test) {
		dispatcher = fork('./app.js',[,'--listpath',opts.listpath,'--logfile','/tmp/dispatcher.log']);

		setTimeout(function(){
			test.ok(dispatcher.connected, "Dispatcher booted.");
			test.done();
		},500);
	},
	bootAnnouncers: function(test) {
		announcer_a = fork('./app.js',[,'--announce','--logfile','/tmp/announcer_a.log','--announceip','8.8.8.8','--weight','25']);
		announcer_b = fork('./app.js',[,'--announce','--logfile','/tmp/announcer_b.log','--announceip','4.2.2.2']);

		setTimeout(function(){
			test.ok(announcer_a.connected, "Announcer A booted.");
			test.ok(announcer_b.connected, "Announcer B booted.");
			test.done();
		},500);

	},
	inspectDispatcherList: function(test) {
		fs.readFile('/tmp/dispatcher.log', 'utf8', function (err, data) {
			console.log(data + 'wtf?');
			test.ok(data,'really? this works?');
			test.done();
		});
		/*
		fs.exists(opts.listpath,function(exists){
			if (exists) {

				fs.readFile(opts.listpath, 'utf8', function (err, data) {
					if (err) throw err;
					
					// console.log(data);

					test.ok(data.match(/8\.8\.8\.8.+weight=25/),"Announcer A set in dispatcher.list");
					test.ok(data.match(/4\.2\.2\.2.+weight=75/),"Announcer B set in dispatcher.list");
					test.done();


				});
			
			} else {

				test.ok(false,"File must exist");
				test.done();

			}

		});
		*/
	},
	spinDown: function(test){

		dispatcher.kill('SIGHUP');
		announcer_a.kill('SIGHUP');
		announcer_b.kill('SIGHUP');
		
		test.ok(true,"Kill processes.");
		test.done();
	}

};
