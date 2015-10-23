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

// Start up dispatcher.
var dispatcher;
dispatcher = fork('./app.js',[,'--listpath',opts.listpath,'--logfile','/tmp/dispatcher.log']);

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
    etcdalive: function(test) {
    	alive.isalive(function(err){
    		test.ok(!err,"etcd is alive");
    		test.done();
    	});
    },
    bootDispatcher: function(test) {
    	setTimeout(function(){
			test.ok(dispatcher.connected, "Dispatcher booted.");
			test.done();
		},500);
	},
	testMethodExists: function(test){
		test.ok(true,"This is a test for sure.");
		test.done();
	}

};
