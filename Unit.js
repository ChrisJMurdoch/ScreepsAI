
//Load utility classes
var Functions = require('Functions');
var Finder = require('Finder');

module.exports = class Unit {

    switchToGather(creep) {
        delete creep.memory.target;
        this.assignResource(creep);
        creep.memory.task = 'gather';
    }
    switchToIdle(creep) {
        delete creep.memory.source;
        creep.memory.task = 'idle';
    }

    gather(creep) {

        // Full => idle
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            this.switchToIdle(creep);
            return;
        }

        // Get target
        var target = Game.getObjectById(creep.memory.source);

        // Determine type of gather
        if (target instanceof Creep) {
            this.gatherFromMiner(creep, target);
        } else if (target instanceof Source) {
            this.gatherFromSource(creep, target);
        } else if (target instanceof StructureContainer || target instanceof StructureStorage) {
            this.gatherFromContainer(creep, target);
        } else {
            creep.say('?SRC');
            this.assignResource(creep);
        }
    }

    gatherFromSource(creep, target) {
        var result = creep.harvest(target);
        this.respondToGather(creep, target, result, true);
    }
    gatherFromMiner(creep, target) {
        if ( creep.store.getFreeCapacity(RESOURCE_ENERGY) > target.store.getCapacity(RESOURCE_ENERGY) )
            var result = target.transfer( creep, RESOURCE_ENERGY, target.store.getCapacity(RESOURCE_ENERGY) );
        else
            var result = target.transfer( creep, RESOURCE_ENERGY, creep.store.getFreeCapacity(RESOURCE_ENERGY) );
        this.respondToGather(creep, target, result, false);
    }
    gatherFromContainer(creep, target) {
        var result = creep.withdraw(target, RESOURCE_ENERGY, creep.store.getFreeCapacity(RESOURCE_ENERGY));
        this.respondToGather(creep, target, result, false);
    }

    respondToGather(creep, target, result, waitForResource) {
        // Deal with exceptions
        switch (result) {
            case OK:
                // DO NOTHING
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, {visualizePathStyle: this.getGatherStyle()});
                break;
            case ERR_NOT_ENOUGH_RESOURCES:
                if (!waitForResource)
                    this.assignResource(creep);
                break;
            default:
                console.log('GTHR: ' + result);
                creep.say('GTHR: ' + result);
                break;
        }
    }
};
