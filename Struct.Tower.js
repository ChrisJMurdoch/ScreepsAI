
var Aggregates = require('Util.Aggregates');
var Finder = require('Util.Finder');
var Filters = require('Util.Filters');

module.exports = class Tower {
    
    run(tower) {
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length === 0) {
            var target = Aggregates.lowestHitpoints( Finder.damagedStructures(tower.room) );
            tower.repair(target);
        } else {
            var target = Aggregates.closest(tower, enemies);
            tower.attack(target);
        }
    }
}
