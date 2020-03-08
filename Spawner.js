
// Load utility classes
const CreepCounter = require('CreepCounter');
const Functions = require('Functions');
const Finder = require('Finder');

// Different body types
const shells = [
    
    {   name: 'hauler',
        min: 2,
        bodies: [
            { energy:  300, body: [MOVE,MOVE, WORK, CARRY] },
            { energy:  550, body: [MOVE,MOVE,MOVE,MOVE,MOVE, WORK, CARRY,CARRY,CARRY,CARRY] },
            { energy:  800, body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY] },
            //{ energy: 1300, body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, WORK, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY] },
        ]
    },
    
    {   name: 'miner',
        min: 1,
        bodies: [
            { energy: 300, body: [MOVE, WORK,WORK, CARRY] },
            { energy: 550, body: [MOVE, WORK,WORK,WORK,WORK, CARRY] },
            { energy: 800, body: [MOVE, WORK,WORK,WORK,WORK,WORK, CARRY] }
            // MAX
        ]
    },
    
    {   name: 'worker',
        min: 1.5,
        bodies: [
            { energy:  300, body: [MOVE,MOVE, WORK, CARRY] },
            { energy:  550, body: [MOVE,MOVE,MOVE, WORK,WORK, CARRY,CARRY,CARRY,CARRY] },
            { energy:  800, body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, WORK,WORK,WORK, CARRY,CARRY,CARRY] },
            { energy: 1300, body: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, WORK,WORK,WORK,WORK,WORK, CARRY,CARRY,CARRY,CARRY,CARRY] },
        ]
    },
    
    {   name: 'warrior',
        min: 0,
        bodies: [
            { energy:  300, body: [TOUGH,TOUGH, ATTACK,ATTACK, MOVE,MOVE] },
            { energy:  550, body: [TOUGH,TOUGH, ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE] },
            { energy:  800, body: [TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] },
            { energy: 1300, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] },
        ]
    },
    
    {   name: 'drainer',
        min: 0,
        bodies: [
            { energy: 1800, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, HEAL,HEAL] },
        ]
    },
    
    {   name: 'defender',
        min: 0,
        bodies: [
            { energy:  300, body: [TOUGH,TOUGH, ATTACK,ATTACK, MOVE,MOVE] },
            { energy:  550, body: [TOUGH,TOUGH, ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE] },
            { energy:  800, body: [TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] },
            { energy: 1300, body: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH, ATTACK,ATTACK,ATTACK,ATTACK,ATTACK, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE] },
        ]
    },
];

// Auto spawn
module.exports.spawn = function(debug) {
    if (debug) console.log('--- Spawner ---');
    
    //console.log( getMaxSpawnEnergy(Game.spawns['Spawn1'].room) );
    
    const sourceCount = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;
    
    // Ensure small hauler
    if (CreepCounter.countShells('hauler') == 0) {
        Game.spawns['Spawn1'].spawnCreep(
            shells[0].bodies[0].body,
            'restarter' + Game.time,
            { memory: { shell: 'hauler', task: 'gather', info: {} } }
        );
        return;
    }
    
    // Ensure miner
    if (CreepCounter.countShells('miner') == 0) {
        Game.spawns['Spawn1'].spawnCreep(
            getBody(getMaxSpawnEnergy(Game.spawns['Spawn1'].room), 'miner').body,
            'miner' + Game.time,
            { memory: { shell: 'miner', task: 'gather', info: {} } }
        );
        return;
    }
    
    // Spawn
    if (debug) console.log('ShellCount: ' + getShellCount());
    for (var shell of shells) {
        
        // If needed
        if ( CreepCounter.countShells(shell.name) < shell.min*sourceCount ) {
            if (debug) console.log('Attempting to spawn ' + shell.name);
            
            // Try spawn
            var result = Game.spawns['Spawn1'].spawnCreep(
                getBody(getMaxSpawnEnergy(Game.spawns['Spawn1'].room), shell.name).body,
                shell.name + Game.time,
                { memory: { shell: shell.name, task: 'gather', info: {} } }
            );
            
            // Handle return value
            if (debug) console.log('SpawnResult: ' + result);
            if ( result === OK ) {
                console.log('Creating power ' + getBody(getMaxSpawnEnergy(Game.spawns['Spawn1'].room), shell.name).energy + ' ' + shell.name);
                return;
            }
            if ( result !== ERR_NOT_ENOUGH_ENERGY && result !== ERR_BUSY ) {
                console.log("Spawn error: " + result);
            }
            return;
        }
    }
    
    // If none required
    if (debug) console.log('Resources abundant: ' + Functions.resourcesAbundant(Game.spawns['Spawn1'].room));
    if (Functions.resourcesAbundant(Game.spawns['Spawn1'].room)) {
        var result = Game.spawns['Spawn1'].spawnCreep(
            getBody(getMaxSpawnEnergy(Game.spawns['Spawn1'].room), shells[2].name).body,
            'worker' + Game.time,
            { memory: { shell: 'worker', task: 'gather', info: {} } }
        );
        if (result === OK)
            console.log('Resources abundant; Creating power ' + getBody(getMaxSpawnEnergy(Game.spawns['Spawn1'].room), shells[2].name).energy + ' ' + shells[2].name);
    }
};

function getBody(energyLimit, shellName) {
    // Get shell
    for (var s in shells) {
        if (shells[s].name === shellName) {
            // Get body
            var highestEnergy = 0;
            var highestBody;
            for (var b in shells[s].bodies) {
                var body = shells[s].bodies[b];
                if (body.energy<=energyLimit && body.energy>highestEnergy) {
                    highestEnergy = body.energy;
                    highestBody = body;
                }
            }
            return highestBody;
        }
    }
}

function getMaxSpawnEnergy(room) {
    var spawnEnergy = Game.spawns['Spawn1'].store.getCapacity(RESOURCE_ENERGY);
    var extensionEnergy = 0;
    var extensions = Finder.extensions(room);
    for (var s in extensions) {
        if (extensions[s].isActive())
            extensionEnergy += extensions[s].store.getCapacity(RESOURCE_ENERGY);
    }
    return spawnEnergy + extensionEnergy;
}
