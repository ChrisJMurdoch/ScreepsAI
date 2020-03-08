
// Load utility classes
var Functions  = require('Functions');
var Finder = require('Finder');
var Filters = require('Filters');

// Load superclass
var Dual = require('Unit.Dual');

module.exports = class Hauler extends Dual {
    
    getGatherStyle() { return { stroke: 'yellow', opacity: 0.2, lineStyle: 'dashed' }; }
    getWorkStyle() { return { stroke: 'cyan', opacity: 0.2, lineStyle: 'dashed' }; }
    
    assignResource(creep) {
        creep.memory.source = (
            Functions.highestEnergyPercent(Finder.filledStorage(creep.room, creep.store.getFreeCapacity(RESOURCE_ENERGY))) || 
            Functions.closest(creep, Finder.miners(creep.room)) ||
            Functions.closest(creep, creep.room.find(FIND_SOURCES))
        ).id;
    }
    assignTarget(creep) {
        creep.memory.target = (
            Functions.closest( creep, Filters.untargeted(Filters.lowEnergy(Finder.freeFriendlyTowers(creep.room))) ) ||
            Functions.closest( creep, Filters.untargeted(Finder.freeSpawnStructures(creep.room)) ) ||
            Functions.lowestEnergyPercent( Filters.untargeted(Finder.freeStorageStructures(creep.room).concat(Finder.freeFriendlyTowers(creep.room))) )
        ).id;
    }
    
    action(creep) {
        var target = Game.getObjectById(creep.memory.target);
        if ( target === null ) {
            this.assignTarget(creep);
            target = Game.getObjectById(creep.memory.target);
        }
        var result = creep.transfer(target, RESOURCE_ENERGY);
        if ( (target instanceof StructureTower) && (target.store.getUsedCapacity(RESOURCE_ENERGY) / target.store.getCapacity(RESOURCE_ENERGY) > 0.9) )
            this.assignTarget(creep);
        this.respondToAction(creep, target, result);
    }
}
