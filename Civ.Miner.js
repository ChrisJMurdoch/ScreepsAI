
// Load utility classes
const Lists = require("Util.Lists");
const Aggregates = require('Util.Aggregates');
const Finder = require('Util.Finder');

// Load superclass
const Unit = require('Civ');

module.exports = class Miner extends Unit {

    getGatherStyle() { return { stroke: 'yellow', opacity: 0.1, lineStyle: 'solid' }; }

    run(creep) {
        
        // Validate memorised position
        if (!creep.memory.pos)
            this.assignResource(creep);
        
        // Go to position and mine
        if ( (creep.pos.x !== creep.memory.pos.x) || (creep.pos.y !== creep.memory.pos.y) ) {
            creep.moveTo(creep.memory.pos.x, creep.memory.pos.y, {visualizePathStyle: this.getGatherStyle()});
        } else {
            creep.harvest(Game.getObjectById(creep.memory.source));
            creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY);
        }
    }

    assignResource(creep) {
        
        // Get source and nearest container
        var source = Aggregates.leastMinersAssigned(Lists.sources(creep.room));
        var target = Aggregates.closest(source, Lists.storage(creep.room));
        
        // Create and save position
        var pos = new RoomPosition( (source.pos.x+target.pos.x)/2, (source.pos.y+target.pos.y)/2, creep.room.name );
        creep.memory.source = source.id;
        creep.memory.target = target.id;
        creep.memory.pos = pos;
    }
};
