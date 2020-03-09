
// Load utility
var Finder = require('Util.Finder');

module.exports = class Warrior {

    run(creep) {
        
        const flag = Game.flags['A'];
        
        var enemies = Finder.enemyTowers(creep.room) || creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length == 0) {
            this.move(creep, flag);
            return;
        } else {
            this.attack(creep, enemies);
        }
    }
    
    attack(creep, enemies) {
        var target = Functions.closest(creep, enemies);
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo( target, {visualizePathStyle: { stroke: 'white', opacity: 0.6, lineStyle: 'solid' } } );
        }
    }
    
    move(creep, flag) {
        creep.moveTo( flag, {visualizePathStyle: { stroke: 'white', opacity: 0.6, lineStyle: 'dashed' } } );
    }
    
};
