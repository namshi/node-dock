'use strict';

var _ = require('lodash');
var availableColors = ['red','green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey'];
var runCommandOnContainer = require('./commands/runDockerCommand');

function yargsToArgs(yargs) {
  var args = JSON.parse(JSON.stringify(yargs._));

  _.forEach(yargs, function(value, key) {
    if (key !== 'image' && key !== 'i' && key !== '_' && key !== '$0') {
      var dashes = key.length > 1 ? '--' : '-';

      if (yargs[key]) {
        if(typeof yargs[key] === 'string') {
          key = key + '=' + yargs[key];
        }
        args.push(dashes + key);
      }
    }
  });

  return args;
}

module.exports = function(psTable, args) {
  var images = args.image.split(',');

  images.forEach(function(imageName, index, images){
    if (imageName.indexOf(':') < 0) {
        images[index] = imageName + ':latest';
    }
  });

  var filteredTable = _.filter(psTable, function(image){
    return images.indexOf(image.IMAGE) > -1;
  });

  _.forEach(filteredTable, function(container, index) {
    var colorIndex = (index > availableColors.length - 1 ) ? index % availableColors.length : index;
    runCommandOnContainer(container, yargsToArgs(args), availableColors[colorIndex]);
  });
};
