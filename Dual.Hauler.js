
// Load utility classes
const Tools = require("Util.Tools");
const L = require('Util.Lists');
const A = require('Util.Aggregates');
const P = require("Util.Predicates");

// Load superclass
const Dual = require('Dual');

module.exports = class Hauler extends Dual {
    
    getGatherStyle() { return { stroke: 'yellow', opacity: 0.2, lineStyle: 'dashed' }; }
    getWorkStyle()   { return { stroke: 'cyan',   opacity: 0.2, lineStyle: 'dashed' }; }
    
    assignResource(creep) {
        let source = (
            Tools.select( L.storage(creep.room), A.highestEnergyPercent, [P.eFilled.bind(null, creep.store.getFreeCapacity(RESOURCE_ENERGY))] ) ||
            Tools.select( L.miners(creep.room),  A.highestEnergyPercent ) ||
            Tools.select( L.sources(creep.room), A.highestEnergyPercent )
        );
        if (!source) throw "NoSource";
        creep.memory.source = source.id;
    }
    assignTarget(creep) {
        let target = (
            Tools.select( L.friendlyTowers(creep.room),  A.closest.bind(null, creep), [P.untargeted, P.eFreeRatio.bind(null, 0.75)] ) ||
            Tools.select( L.spawnStructures(creep.room), A.closest.bind(null, creep), [P.untargeted, P.eFree.bind(null, 1)]         ) ||
            Tools.select( L.labs(creep.room),            A.closest.bind(null, creep), [P.untargeted, P.eFree.bind(null, 1)]         ) ||
            Tools.select( L.storage(creep.room),         A.lowestEnergyPercent,       [P.untargeted, P.eFree.bind(null, 1)]         )
        );
        if (!target) throw "NoTarget";
        creep.memory.target = target.id;
    }
    action(creep) {
        let target = this.getTarget(creep, this.assignTarget);
        if (target !== null)
            this.respondToAction(creep, target, creep.transfer(target, RESOURCE_ENERGY));
    }
}
