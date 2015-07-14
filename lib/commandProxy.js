'use strict';

var _ = require('lodash');
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
  if (args.image.indexOf(':') < 0) {
    args.image += ':latest';
  }

  var filteredTable = _.filter(psTable, {IMAGE: args.image});

  _.forEach(filteredTable, function(row) {
    runCommandOnContainer(row['CONTAINER ID'], yargsToArgs(args));
  });
};