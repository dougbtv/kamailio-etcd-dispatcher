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

// Start up app.
var app;
app = fork('./app.js',['--Fake','param']);

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
    waitForServer: function(test) {
    	setTimeout(function(){
			test.ok(true, "Wait for server to boot.");
			test.done();
		},500);
	},
	testMethodExists: function(test){
		test.ok(true,"This is a test for sure.");
		test.done();
	}

};
