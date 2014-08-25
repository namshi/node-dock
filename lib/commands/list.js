'use strict';

var _ = require('lodash');

module.exports = function(parsedTable) {
  _.forEach(parsedTable, function(row) {
    console.log('Image name: ' + row.IMAGE + ' (id: ' + row['CONTAINER ID'] + ')');
  });
};