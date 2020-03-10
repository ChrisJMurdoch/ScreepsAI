
//Load utility classes
const Tools = require("Util.Tools");
const Lists = require("Util.Lists");
const Predicates = require("Util.Predicates");

const Display = require('Util.Display');

// Load delegate classes
const TaskManager = require('Command.TaskManager');
const Spawner = require('Command.Spawner');

// Load role classes
const Hauler = require('Civ.Dual.Hauler');
const Worker = require('Civ.Dual.Worker');
const Miner = require('Civ.Miner');
const Extractor = require("Civ.Dual.Extractor");

const Warrior = require('Soldier.Warrior');
const Defender = require('Soldier.Defender');
const Drainer = require('Soldier.Drainer');

const Tower = require('Struct.Tower');

// Create namespace with instantiated run classes
const runClasses = {
    hauler: new Hauler(),
    worker: new Worker(),
    miner: new Miner(),
    extractor: new Extractor(),
    warrior: new Warrior(),
    defender: new Defender(),
    drainer: new Drainer(),
    tower: new Tower(),
};

// Main loop
module.exports.loop = function () {
    
    // Cleanup
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    // Save room
    var room = Game.spawns['Spawn1'].room;
    
    // Auto spawn
    Spawner.spawn();
    
    // Designate tasks to idle creeps
    TaskManager.run();
    
    // Run creeps
    for (var creep of Lists.creeps(room)) {
        
        // Skip if does not exist yet
        if (creep.spawning)
            continue;
        
        // Run creep
        runClasses[creep.memory.shell].run(creep);
    }
    
    // Run structures
    for (var structure of Lists.structures(room)) {
        
        // Run towers
        if (structure.structureType === STRUCTURE_TOWER)
            runClasses.tower.run(structure);
    }
    
    // Mark low energy buildings
    for (var structure of Tools.filter(Lists.structures(room), Predicates.eFreeRatio.bind(null, 0.75))) {
        Display.circle(structure, 0.35, "red");
    }
    
    // Mark targeted buildings
    for (var structure of Tools.filter(Lists.structures(room), Predicates.targeted)) {
        Display.circle(structure, 0.45, "green");
    }
    
    // Mark each damaged structure in room
    for (var structure of Lists.structures(room)) {
        if (structure.structureType === STRUCTURE_WALL) {
            Display.mark(structure, Math.floor( structure.hits/1000 ) + 'K');
        } else {
            // Structure -> Display HP
            if (structure.hits < structure.hitsMax)
                Display.mark(structure, Math.floor( (structure.hits/structure.hitsMax)*100 ) + '%');
        }
    }
};
