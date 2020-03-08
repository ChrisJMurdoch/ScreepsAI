
// Load utility
var Functions  = require('Functions');
var Finder = require('Finder');

// Load superclass
var Unit = require('Unit');

/*
    Switches between harvesting energy and working.
    Subclasses:
        - Hauler
        - Worker
*/
module.exports = class Dual extends Unit {

    run(creep) {
        // Skip if idle
        if (creep.memory.task === 'idle')
            return;
        
        // Gather
        if (creep.memory.task === 'gather') {
            this.gather(creep);
        
        // Action
        } else {
            try {
                this.action(creep);
            } catch (e) {
                // No tasks => New task
                console.log(e);
                this.switchToIdle(creep);
            }
        }
    }
    
    respondToAction(creep, target, result) {
        switch(result) {
            case OK:
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo( target, {visualizePathStyle: this.getWorkStyle()} );
                break;
            case ERR_NOT_ENOUGH_RESOURCES:
                this.switchToGather(creep);
                break;
            case ERR_FULL:
                this.assignTarget(creep);
                break;
            default:
                console.log('ACTN: ' + result + ' ' + Game.getObjectById(creep.memory.target) + ' - ' + creep.memory.action);
                creep.say('ACTN: ' + result);
                break;
        }
    }
};
