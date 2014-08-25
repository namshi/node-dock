'use strict';

var child = require('child_process');

function runCommandOnContainer(containerId, commandArguments) {
  commandArguments.push(containerId);

  console.log('running ' + commandArguments.join(' ') + ' on container ' + containerId);

  var commandOutput = child.spawn('docker', commandArguments).stdout;

  commandOutput.on('data', function(chunk) {
    console.log(chunk.toString());
  });
}

module.exports = runCommandOnContainer;