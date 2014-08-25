'use strict';

var child = require('child_process');
var yargs = require('yargs').argv;
var tableParser = require('./lib/tableParser');
var commandProxy = require('./lib/commandProxy');
var imagesList = require('./lib/commands/list');
var cleanImages = require('./lib/commands/clean');

function listProcesses(callback) {
  var dockerProcess = child.spawn('docker', ['ps', '-a']);
  var shellOutput = '';

  dockerProcess.stdout.on('data', function (chunk) {
    shellOutput += chunk;
  });

  dockerProcess.stdout.on('end', function () {
    callback(tableParser(shellOutput));
  });
}

listProcesses(function(parsedTable) {
  if(yargs._.indexOf('list') !== -1) {
    imagesList(parsedTable);
    return;
  }

  if(yargs._.indexOf('clean') !== -1) {
    cleanImages(parsedTable, yargs);
    return;
  }

  if(yargs.image) {
    commandProxy(parsedTable, yargs);
  }
});