'use strict';

var _ = require('lodash');

module.exports = function parse(output) {
    var lines = output.split('\n');

    var headers = lines.shift();
    var splitHeader = headers.split('        ');

    var limits = [];

    for (var i = 0; i < splitHeader.length; i++) {
        var colName = splitHeader[i].trim();

        if(colName !== '') {
            limits.push({ lable: colName, start: headers.indexOf(colName)});
        }
    }

    var table = _.map(lines, function(line) {
        if(line){
            var result = {};

            for (var key in limits) {
                var header = limits[key];
                var nextKey = parseInt(key, 10)+1;
                var start = header.start;
                var end = (limits[nextKey]) ? limits[nextKey].start - header.start : undefined;

                result[header.lable] = line.substr(start, end).trim();
            }

            return result;
        }
    });

    return table;
};