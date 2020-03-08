
// Load utility classes
var Functions  = require('Functions');
var Finder = require('Finder');
var Filters = require('Filters');

// Load superclass
var Dual = require('Unit.Dual');

module.exports = class Worker extends Dual {

    getGatherStyle() { return { stroke: 'yellow', opacity: 0.2, lineStyle: 'dotted' }; }
    getWorkStyle() { return { stroke: 'cyan', opacity: 0.2, lineStyle: 'dotted' }; }
    
    assignResource(creep) {
        creep.memory.source = (
            Functions.closest(creep, Finder.filledStorage(creep.room, creep.store.getFreeCapacity(RESOURCE_ENERGY))) ||
            Functions.closest(creep, Finder.miners(creep.room)) ||
            Functions.closest(creep, creep.room.find(FIND_SOURCES))
        ).id;
    }
    
    action(creep) {
        this[creep.memory.task](creep);
    }

    build(creep) {
        var target = Functions.mostCompleted(Finder.constructionSites(creep.room));
        if (!target) throw "NoTarget";
        var result = creep.build(target, RESOURCE_ENERGY);
        this.respondToAction(creep, target, result);
    }

    assignRepairTarget(creep) {
        var target = Functions.lowestHitpoints( Filters.untargeted(Finder.damagedStructures(creep.room)) );
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    repair(creep) {
        var target = Game.getObjectById(creep.memory.target);
        if ( target === null ) {
            this.assignRepairTarget(creep);
            target = Game.getObjectById(creep.memory.target);
        }
        var result = creep.repair(target, RESOURCE_ENERGY);
        if (target.hits === target.hitsMax)
            this.assignRepairTarget(creep);
        this.respondToAction(creep, target, result);
    }

    upgrade(creep) {
        var target = creep.room.controller;
        if (!target) throw "NoTarget";
        var result = creep.upgradeController(target);
        this.respondToAction(creep, target, result);
    }
};
