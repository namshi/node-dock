'use strict';

var _ = require('lodash');

module.exports = function(parsedTable) {
  _.forEach(parsedTable, function(row) {
    if (row.IMAGE.indexOf('/') > -1) {
      console.log('Image name: ' + row.IMAGE + ' (id: ' + row['CONTAINER ID'] + ')');
    }
  });
};