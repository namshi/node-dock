'use strict';

var child = require('child_process');
var yargs = require('yargs').argv;
var tableParser = require('node-shell-parser');
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
    callback(tableParser(shellOutput, {separator: '        '}));
  });
}

listProcesses(function(parsedTable) {
  yargs.image = yargs.i || process.argv[(process.argv.length-1)];

  if (yargs.i) {
    delete yargs.i;
  }

  if(yargs._.indexOf('list') !== -1) {
    imagesList(parsedTable, yargs);
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