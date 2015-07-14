'use strict';

var child = require('child_process');
var colors = require('colors/safe');

function runCommandOnContainer(container, commandArguments, color) {
  var containerId = container['CONTAINER ID'];
  var imageName = container['IMAGE']
  commandArguments.push(containerId);
  console.log('running ' + commandArguments.join(' ') + ' on container ' + containerId);
  var command = child.spawn('docker', commandArguments);

  command.stdout.on('data', function(chunk) {
    var lines = chunk.toString().split('\n');

    lines.forEach(function(line){
       console.log(colors[color]('[' + imageName + ' - [' + containerId + ']: ') + line);
    });

  });

  command.stderr.on('data', function(chunk) {
    console.log(colors[color](chunk.toString()));
  });
}

module.exports = runCommandOnContainer;