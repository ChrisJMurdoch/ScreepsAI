
var Functions = require('Functions');
var Finder = require('Finder');
var Filters = require('Filters');

module.exports = class Tower {
    
    run(tower) {
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length === 0) {
            var target = Functions.lowestHitpoints( Finder.damagedStructures(tower.room) );
            tower.repair(target);
        } else {
            var target = Functions.closest(tower, enemies);
            tower.attack(target);
        }
    }
}
