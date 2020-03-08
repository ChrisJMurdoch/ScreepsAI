


module.exports.closest = function (marker, objects) {
    if ( !objects || objects.length === 0 ) return;
    return _.sortBy(objects, s => marker.pos.getRangeTo(s) )[0];
};

module.exports.highestEnergy = function (objects) {
    if ( !objects || objects.length === 0 ) return;
    return _.sortBy(objects, s =>  999999 - s.store.getUsedCapacity(RESOURCE_ENERGY) )[0];
};
module.exports.highestEnergyPercent = function (objects) {
    if ( !objects || objects.length === 0 ) return;
    return _.sortBy(objects, s =>  999999 - (s.store.getUsedCapacity(RESOURCE_ENERGY)/s.store.getCapacity(RESOURCE_ENERGY)) )[0];
};

module.exports.lowestEnergy = function (objects) {
    if ( !objects || objects.length === 0 ) return;
    return _.sortBy(objects, s => s.store.getUsedCapacity(RESOURCE_ENERGY) )[0];
};
module.exports.lowestEnergyPercent = function (objects) {
    if ( !objects || objects.length === 0 ) return;
    return _.sortBy(objects, s => (s.store.getUsedCapacity(RESOURCE_ENERGY)/s.store.getCapacity(RESOURCE_ENERGY)) )[0];
};

module.exports.mostCompleted = function (sites) {
    if ( !sites || sites.length === 0 ) return;
    return _.sortBy(sites, s =>  (s.progressTotal - s.progress) / s.progressTotal )[0];
};

module.exports.lowestHitpoints = function (sites) {
    if ( !sites || sites.length === 0 ) return;
    return _.sortBy(sites, s =>  s.hits )[0];
};

module.exports.lowestHitpointPercent = function (sites) {
    if ( !sites || sites.length === 0 ) return;
    return _.sortBy(sites, s =>  s.hits / s.hitsMax )[0];
};

module.exports.countMinersAssignedTo = function (id) {
    var count = 0;
    for(var creep in Memory.creeps) {
        if (
            Game.creeps[creep].memory.shell == 'miner' &&
            Game.creeps[creep].memory.source == id
        ) {
            count++;
        }
    };
    return count;
};

module.exports.leastMiners = function(room) {
    return _.sortBy(room.find(FIND_SOURCES), m => module.exports.countMinersAssignedTo(m.id) )[0];
};

module.exports.countUnitsAssignedTo = function (id) {
    var count = 0;
    for(var creep in Memory.creeps) {
        if ( Game.creeps[creep].memory.source == id ) {
            count++;
        }
    };
    return count;
};

miners = function(room) {
    var filter = (creep) => { return creep.memory.shell == 'miner' };
    var list = room.find(FIND_MY_CREEPS, { filter: filter });
    return list.length>0 ? list : undefined;
};
module.exports.leastUnitsMiner = function(room) {
    return _.sortBy( miners(room), m => module.exports.countUnitsAssignedTo(m.id) )[0];
};

module.exports.display = function(x, y, message1, message2=' ', message3=' ', message4=' ') {
    var font = '1 Lucida Console';
    Game.spawns['Spawn1'].room.visual.text( message1, x,  y + 2,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message2, x,  y + 3,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message3, x,  y + 4,  {align: 'left', opacity: 0.8, font: font} );
    Game.spawns['Spawn1'].room.visual.text( message4, x,  y + 5,  {align: 'left', opacity: 0.8, font: font} );
};

module.exports.mark = function(creep, text, opacity=1, colour='black') {
    var font = '0.25 Lucida Console';
    Game.spawns['Spawn1'].room.visual.text( text, creep.pos.x,  creep.pos.y,  {opacity: opacity, font: font, color: 'white', backgroundColor: colour} );
};

module.exports.clearMark = function(creep, text, opacity=1) {
    var font = '0.25 Lucida Console';
    Game.spawns['Spawn1'].room.visual.text( text, creep.pos.x,  creep.pos.y,  {opacity: opacity, font: font, color: 'white' } );
};


storage = function(room) {
    var filter = (structure) => { return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE; };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return list.length>0 ? list : undefined;
};
module.exports.resourcesAbundant = function(room) {
    var stores = storage(room);
    if (!stores) return false;
    for (var s of stores) {
        if (s.store.getUsedCapacity(RESOURCE_ENERGY) < s.store.getCapacity(RESOURCE_ENERGY) * 0.75 )
            return false;
    }
    return true;
};



