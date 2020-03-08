
const CreepCounter = require('CreepCounter');
const Functions = require('Functions');
const Finder = require('Finder');
const Filters = require('Filters');

module.exports.run = function(debug) {
    if (debug) console.log('--- TaskManager ---');

    // Re-assign every idle creep
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if ( creep.spawning || creep.memory.task !== 'idle' ) {
            continue;
        }

        switch (creep.memory.shell) {

            case 'hauler':
                creep.memory.task = 'haul';
                break;

            case 'worker':
                if ( Filters.untargeted(Finder.damagedStructures(creep.room)).length>0 && CreepCounter.countTasks('repair')<0 ) {
                    creep.memory.task = 'repair';
                    if (debug) console.log('Assigning: repair');
                } else if ( totalBuildPoints(Game.spawns['Spawn1'].room)>0 ) {
                    creep.memory.task = 'build';
                    if (debug) console.log('Assigning: build');
                } else {
                    creep.memory.task = 'upgrade';
                    if (debug) console.log('Assigning: upgrade');
                }
                break;

            case 'miner':
                creep.memory.task = 'mine';
                break;
        }
    }

    // Display shell count
    Functions.display( 11, 15,
        'H M W S D V',
        '- - - - - -',
        CreepCounter.countShells('hauler') + ' ' + CreepCounter.countShells('miner') + ' ' + CreepCounter.countShells('worker') + ' ' + CreepCounter.countShells('warrior') + ' ' + CreepCounter.countShells('defender') + ' ' + CreepCounter.countShells('drainer')
    );
    
    // Display task count
    Functions.display( 22, 15, 
        'B R U',
        '- - -',
        CreepCounter.countTasks('build') + ' ' + CreepCounter.countTasks('repair') + ' ' + CreepCounter.countTasks('upgrade')
    );
};

totalBuildPoints = function (room) {
    var buildsites = room.find(FIND_CONSTRUCTION_SITES);
    var total = 0;
    for (var b in buildsites) {
        total += buildsites[b].progressTotal - buildsites[b].progress;
    }
    return total;
};

totalRepairPoints = function (room) {
    var structures = room.find(FIND_STRUCTURES);
    var total = 0;
    for (var s in structures) {
        if (structures[s].structureType === STRUCTURE_WALL)
            continue;
        var repair = structures[s].hitsMax - structures[s].hits;
        if (repair)
            total += structures[s].hitsMax - structures[s].hits;
    }
    return total;
};
