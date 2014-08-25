'use strict';

/**
 * Trick to not show the help dialog and exit zeus immediately.
 */
process.argv = [1,2,3];

var assert = require('assert');
var _      = require('lodash');

describe('zeus', function(){
  describe('commands', function(){
    it('should have commands registered', function(){
      assert.equal(true, !!zeus.commands.length);
    });
  })
});