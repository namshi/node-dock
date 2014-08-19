'use strict';


var child = require('child_process');
var tableParser = require('./tableParser');
var _ = require('lodash');
var yargs = require('yargs').argv;

console.log(yargs);
var dockerProcess = child.spawn('docker', ['ps', '-a']);

dockerProcess.on('error', function(result) { console.log('event error result: ', result);});
dockerProcess.on('exit', function(result) { console.log('event exit result: ', result);});
dockerProcess.on('close', function(result) { console.log('event close result: ', result);});
dockerProcess.on('disconnect', function(result) { console.log('event disconnect result: ', result);});
dockerProcess.on('message', function(result) { console.log('event message result: ', result);});



var shellOutput= '';

dockerProcess.stdout.on('data', function(chunk) {
    shellOutput += chunk;
});

dockerProcess.stdout.on('end', function() {
    var tableParse = tableParser(shellOutput);
    //console.log(tableParse);
});