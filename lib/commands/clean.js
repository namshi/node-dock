'use strict';

var _ = require('lodash');
var runCommandOnContainer = require('./runDockerCommand');
var tableParser = require('node-shell-parser');
var child = require('child_process');

function listImages(callback) {
  var dockerProcess = child.spawn('docker', ['images']);
  var shellOutput = '';

  dockerProcess.stdout.on('data', function (chunk) {
    shellOutput += chunk;
  });

  dockerProcess.stdout.on('end', function () {
    callback(tableParser(shellOutput, {separator: '        '}));
  });
}

module.exports = function(parsedTable, args) {
  if(args._.indexOf('images') !== -1) {
    listImages(function(result) {
      _.forEach(result, function(row) {
        if (row.TAG === '<none>') {
          runCommandOnContainer(row['IMAGE ID'], ['rmi']);
        }
      });
    });
    return;
  }

  _.forEach(parsedTable, function(row) {
    if (row.STATUS.indexOf('Up') < 0) {
      runCommandOnContainer(row['CONTAINER ID'], ['rm']);
    }
  });
};