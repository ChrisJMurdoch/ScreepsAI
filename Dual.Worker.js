
// Load utility classes
const Tools = require("Util.Tools");
const Lists = require("Util.Lists");
const Aggregates = require('Util.Aggregates');
const Predicates = require("Util.Predicates");

const Finder = require('Util.Finder');
const Filters = require('Util.Filters');

// Load superclass
const Dual = require('Dual');

module.exports = class Worker extends Dual {

    getGatherStyle() { return { stroke: 'yellow', opacity: 0.2, lineStyle: 'dotted' }; }
    getWorkStyle() { return { stroke: 'cyan', opacity: 0.2, lineStyle: 'dotted' }; }
    
    assignResource(creep) {
        let source = (
            Tools.select( Lists.storage(creep.room),    Aggregates.closest.bind(null, creep),   [ Predicates.eFilled.bind(null, creep.store.getFreeCapacity(RESOURCE_ENERGY)) ]     ) ||
            Tools.select( Lists.miners(creep.room),     Aggregates.closest.bind(null, creep)                                                                                        ) ||
            Tools.select( Lists.sources(creep.room),    Aggregates.closest.bind(null, creep)                                                                                        )
        );
        if (!source) throw "NoSource";
        creep.memory.source = source.id;
    }
    
    action(creep) {
        // Redirect
        this[creep.memory.task](creep);
    }
    
    assignBuildTarget(creep) {
        let target = Aggregates.mostCompleted(Lists.constructionSites(creep.room));
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    build(creep) {
        let target = this.getTarget(creep, this.assignBuildTarget);
        if (target !== null)
            this.respondToAction(creep, target, creep.build(target, RESOURCE_ENERGY));
    }

    assignRepairTarget(creep) {
        let target = Tools.select( Lists.structures(creep.room), Aggregates.lowestHitpoints, [ Predicates.untargeted, Predicates.damaged.bind(null, 600000) ] );
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    repair(creep) {
        let target = this.getTarget(creep, this.assignRepairTarget);
        if (target !== null)
            this.respondToAction(creep, target, creep.repair(target, RESOURCE_ENERGY));
        // Check target
        if (target.hits === target.hitsMax)
            this.assignRepairTarget(creep);
    }
    
    assignUpgradeTarget(creep) {
        let target = creep.room.controller;
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    upgrade(creep) {
        let target = this.getTarget(creep, this.assignUpgradeTarget);
        if (target !== null)
            this.respondToAction(creep, target, creep.upgradeController(target));
    }
};
