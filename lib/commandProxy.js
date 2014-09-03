'use strict';

var _ = require('lodash');
var runCommandOnContainer = require('./commands/runDockerCommand');

function yargsToArgs(yArgs) {
  var args = JSON.parse(JSON.stringify(yArgs._));

  _.forEach(yArgs, function(vale, key) {
    if (key !== 'image' && key !== 'i' && key !== '_' && key !== '$0') {
      if (yArgs[key]) {
        args.push('-' + key);
      } else {
        args.push('-' + key + ' ' + yArgs[key]);
      }
    }
  });

  return args;
}

module.exports = function(psTable, args) {
  if (args.image.indexOf(':') < 0) {
    args.image += ':latest';
  }

  var filteredTable = _.filter(psTable, {IMAGE: args.image});

  _.forEach(filteredTable, function(row) {
    runCommandOnContainer(row['CONTAINER ID'], yargsToArgs(args));
  });
};