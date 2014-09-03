'use strict';

var child = require('child_process');

function runCommandOnContainer(containerId, commandArguments) {
  commandArguments.push(containerId);

  console.log('running ' + commandArguments.join(' ') + ' on container ' + containerId);

  var command = child.spawn('docker', commandArguments);

  command.stdout.on('data', function(chunk) {
    console.log(chunk.toString());
  });

  command.stderr.on('data', function(chunk) {
    console.log(chunk.toString());
  });
}

module.exports = runCommandOnContainer;