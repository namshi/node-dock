'use strict';


var child = require('child_process');
var tableParser = require('./tableParser');
var _ = require('lodash');
var yargs = require('yargs').argv;

var dockerProcess = child.spawn('docker', ['ps', '-a']);
var shellOutput= '';

dockerProcess.stdout.on('data', function(chunk) {
    shellOutput += chunk;
});

function runCommandOnContaniner(contanerId, commandArguments) {
    var data = '';

    commandArguments.push(contanerId);

    console.log('running '+commandArguments.join(' ')+' on container '+contanerId);

    var commandOutput = child.spawn('docker', commandArguments).stdout;

    commandOutput.on('data', function(chunk) {
        console.log(chunk.toString());
        //data += chunk.toString();
    });

    /*commandOutput.on('end', function(){
        console.log(data + '\n');
    });*/
}

function yargsToArgs(yArgs) {
    var args = JSON.parse(JSON.stringify(yArgs._));
    for (var key in yArgs) {
        if (key !== 'image' && key !== '_' && key !== '$0') {
            if (yArgs[key] === true) {
                args.push('-' + key);
            } else {
                args.push('-' + key + ' ' + yArgs[key]);
            }
        }
    }

    return args;
}

dockerProcess.stdout.on('end', function() {
    var parsedTable = tableParser(shellOutput);

    if(yargs._.indexOf('list') !== -1) {
        for(var index in parsedTable){
            console.log('image name: ' + parsedTable[index].IMAGE + ' (id: '+parsedTable[index]['CONTAINER ID']+')');
        }

        return;
    }

    if(yargs._.indexOf('clean') !== -1) {
        for(var index in parsedTable){
            if (parsedTable[index].STATUS.indexOf('Up') < 0) {
                runCommandOnContaniner(parsedTable[index]['CONTAINER ID'], ['rm']);
            }
        }

        return;
    }

    if(yargs.image) {
        if (yargs.image.indexOf(':latest') < 0) {
            yargs.image += ':latest';
        }

        var filteredTable = _.filter(parsedTable, {IMAGE: yargs.image});

        for(var index in filteredTable){
            runCommandOnContaniner(filteredTable[index]['CONTAINER ID'], yargsToArgs(yargs));
        }
    }

});