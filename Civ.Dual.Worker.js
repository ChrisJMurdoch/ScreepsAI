
// Load utility classes
const Tools = require("Util.Tools");
const Lists = require("Util.Lists");
const Aggregates = require('Util.Aggregates');
const Predicates = require("Util.Predicates");

const Finder = require('Util.Finder');
const Filters = require('Util.Filters');

// Load superclass
const Dual = require('Civ.Dual');

module.exports = class Worker extends Dual {

    getGatherStyle() { return { stroke: 'yellow', opacity: 0.2, lineStyle: 'dotted' }; }
    getWorkStyle() { return { stroke: 'cyan', opacity: 0.2, lineStyle: 'dotted' }; }
    
    assignResource(creep) {
        creep.memory.source = (
            Tools.select( Lists.storage(creep.room),    Aggregates.closest.bind(null, creep),   [ Predicates.eFilled.bind(null, creep.store.getFreeCapacity(RESOURCE_ENERGY)) ]     ) ||
            Tools.select( Lists.miners(creep.room),     Aggregates.closest.bind(null, creep)                                                                                        ) ||
            Tools.select( Lists.sources(creep.room),    Aggregates.closest.bind(null, creep)                                                                                        )
        ).id;
    }
    
    action(creep) {
        this[creep.memory.task](creep);
    }


    assignBuildTarget(creep) {
        var target = Aggregates.mostCompleted(Lists.constructionSites(creep.room));
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    build(creep) {
        
        // Get target
        var target = Game.getObjectById(creep.memory.target);
        if ( target === null ) {
            this.assignBuildTarget(creep);
            target = Game.getObjectById(creep.memory.target);
        }
        
        // Go
        this.respondToAction(creep, target, creep.build(target, RESOURCE_ENERGY));
    }

    assignRepairTarget(creep) {
        var target = Tools.select( Lists.structures(creep.room), Aggregates.lowestHitpoints, [ Predicates.untargeted, Predicates.damaged.bind(null, 600000) ] );
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    repair(creep) {
        
        // Get target
        var target = Game.getObjectById(creep.memory.target);
        if ( target === null ) {
            this.assignRepairTarget(creep);
            target = Game.getObjectById(creep.memory.target);
        }
        
        // Go
        var result = creep.repair(target, RESOURCE_ENERGY);
        if (target.hits === target.hitsMax)
            this.assignRepairTarget(creep);
        this.respondToAction(creep, target, result);
    }
    
    assignUpgradeTarget(creep) {
        var target = creep.room.controller;
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    upgrade(creep) {
        
        // Get target
        var target = Game.getObjectById(creep.memory.target);
        if ( target === null ) {
            this.assignUpgradeTarget(creep);
            target = Game.getObjectById(creep.memory.target);
        }
        
        // Go
        var result = creep.upgradeController(target);
        this.respondToAction(creep, target, result);
    }
};
