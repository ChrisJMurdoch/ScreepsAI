
// Load utility
var Functions  = require('Functions');
var Finder = require('Finder');

// Load superclass
var Unit = require('Unit');

module.exports = class Warrior {

    run(creep) {
        
        // Validate flag
        if (!flag)
            creep.memory.tacticalFlag = 'C';
        
        // Heal
        creep.heal(creep);
        
        // Direct fire => walls
        var flag = Game.flags[creep.memory.tacticalFlag];
        // If creep can see room
        if (flag.room) {
            // Get structures
            for ( var s in flag.room.find(FIND_STRUCTURES) ) {
                var structure = flag.room.find(FIND_STRUCTURES)[s];
                if ( structure.pos.x === flag.pos.x && structure.pos.y === flag.pos.y ) {
                    creep.say('DirTarget');
                    // Attack wall
                    this.attackSingle(creep, structure);
                    return;
                }
            }
        }
        
        // Go to flag
        if (flag) {
            creep.moveTo( flag, {visualizePathStyle: { stroke: 'green', opacity: 0.2, lineStyle: 'solid' } } );
        } else {
            creep.memory.tacticalFlag = 'C';
            return;
        }
        
        // Designate flag
        if ( creep.memory.taticalFlag === 'C' && (creep.hitsMax-creep.hits)>900 ) {
            creep.memory.tacticalFlag = 'D';
        } else if ( creep.memory.taticalFlag === 'D' && (creep.hitsMax-creep.hits) === 0 ) {
            creep.memory.tacticalFlag = 'C';
        }
        
    }
    
    
    attackSingle(creep, target) {
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo( target, {visualizePathStyle: { stroke: 'red', opacity: 0.2, lineStyle: 'solid' } } );
        }
    }
    
};
