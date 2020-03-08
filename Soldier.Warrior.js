
// Load utility
var Functions  = require('Functions');
var Finder = require('Finder');

// Load superclass
var Unit = require('Unit');

module.exports = class Warrior {

    run(creep) {
        
        const flag = Game.flags['B'];
        
        for ( var s in flag.room.find(FIND_STRUCTURES) ) {
            var structure = flag.room.find(FIND_STRUCTURES)[s];
            if ( structure.pos.x === flag.pos.x && structure.pos.y === flag.pos.y ) {
                creep.say('WallTarget');
                this.attackSingle(creep, structure);
                return;
            }
        }
        
        var enemies = Finder.enemyTowers(creep.room) || creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length == 0) {
            creep.say('Moving');
            this.move(creep, flag);
            return;
        } else {
            creep.say('CreepTarget');
            this.attack(creep, enemies);
            return;
        }
    }
    
    attackSingle(creep, target) {
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo( target, {visualizePathStyle: { stroke: 'red', opacity: 0.2, lineStyle: 'solid' } } );
        }
    }
    attack(creep, enemies) {
        var target = Functions.closest(creep, enemies);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo( target, {visualizePathStyle: { stroke: 'red', opacity: 0.2, lineStyle: 'solid' } } );
        }
    }
    
    move(creep, flag) {
        creep.moveTo( flag, {visualizePathStyle: { stroke: 'red', opacity: 0.2, lineStyle: 'dashed' } } );
    }
    
};
