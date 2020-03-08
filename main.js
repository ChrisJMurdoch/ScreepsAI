
//Load utility classes
var Functions = require('Functions');
var Finder = require('Finder');
var Filters = require('Filters');

// Load delegate classes
var TaskManager = require('TaskManager');
var Spawner = require('Spawner');

// Load role classes
var Hauler = require('Unit.Dual.Hauler');
var Worker = require('Unit.Dual.Worker');
var Miner = require('Unit.Miner');
var Warrior = require('Soldier.Warrior');
var Defender = require('Soldier.Defender');
var Drainer = require('Soldier.Drainer');

// Load tower class
var Tower = require('Tower');
var tower = new Tower();

var debug = false;

// Create namespace with instantiated run classes
const runClasses = {
    hauler: new Hauler(),
    worker: new Worker(),
    miner: new Miner(),
    warrior: new Warrior(),
    defender: new Defender(),
    drainer: new Drainer(),
};

// Main loop
module.exports.loop = function () {
    if (debug) console.log('--- --- --- --- --- --- --- --- --- --- Tick --- --- --- --- --- --- --- --- --- ---');
    
    // Cleanup
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    // Auto spawn
    Spawner.spawn(debug);
    
    // Designate tasks to idle creeps
    TaskManager.run(debug);
    
    // Delete all building sites
    /*var sites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
    for (var b in sites) {
        sites[b].remove();
    }*/
    /*
    var all = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES);
    console.log(all.length);
    var filtered = Filters.untargeted(all);
    console.log(filtered.length);
    */
    
    // Act
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        // Common commands
        
        //creep.suicide();
        //delete creep.memory.source;
        //creep.drop(RESOURCE_ENERGY);
        //creep.memory.action = 'idle';
        
        // Skip if does not exist yet
        if (creep.spawning) {
            continue;
        }
        
        // Run creep
        runClasses[creep.memory.shell].run(creep);
        
    }
    
    // Each owned tower
    for (var s in Game.structures) {
        var structure = Game.structures[s];
        if (structure.structureType === STRUCTURE_TOWER)
            tower.run(structure);
    }
    
    // Mark targeted buildings
    for (var structure of Filters.targeted(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES)) ) {
        Functions.mark(structure, ' ', 0.3, 'lime');
    }
    
    // Mark low energy buildings
    for (var structure of Filters.lowEnergy(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES)) ) {
        Functions.mark(structure, '   ', 0.3, 'red');
    }
    
    // Mark each damaged structure in room
    for (var structure of Game.spawns['Spawn1'].room.find(FIND_STRUCTURES) ) {
        if (structure.structureType === STRUCTURE_WALL) {
            // Wall -> Display HP
            if (structure.hits < structure.hitsMax)
                Functions.clearMark(structure, Math.floor( structure.hits/1000 ) + 'K');
        } else {
            // Structure -> Display HP
            if (structure.hits < structure.hitsMax)
                Functions.clearMark(structure, Math.floor( (structure.hits/structure.hitsMax)*100 ) + '%');
        }
    }
};
