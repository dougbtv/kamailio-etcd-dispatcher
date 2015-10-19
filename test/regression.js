/*

var restify = require('restify');
var client = restify.createJsonClient({
	version: '*',
	// connectTimeout: 500,
	// requestTimeout: 500,
	url: 'http://127.0.0.1:8000'
});

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
