
// Find structures

module.exports.freeStorageStructures = function(room) {
    var filter = (structure) => { return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE ) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.freeSpawnStructures = function(room) {
    var filter = (structure) => { return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.storage = function(room) {
    var filter = (structure) => { return structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE; };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.filledStorage = function(room, amount) {
    var filter = (structure) => { return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity(RESOURCE_ENERGY) >= amount; };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.constructionSites = function(room) {
    var list = room.find(FIND_CONSTRUCTION_SITES);
    return ensure(list);
};

module.exports.damagedStructures = function(room) {
    var filter = (structure) => { return (structure.hits < structure.hitsMax) && ( structure.hits < 600000 ); };
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.extensions = function(room) {
    var filter = (structure) => { return structure.structureType == STRUCTURE_EXTENSION; }
    var list = room.find( FIND_STRUCTURES, { filter: filter } ); 
    return ensure(list);
};

module.exports.freeFriendlyTowers = function(room) {
    var filter = (structure) => { return structure.structureType === STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY)>0; };
    var list = room.find( FIND_MY_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.friendlyTowers = function(room) {
    var filter = (structure) => { return structure.structureType === STRUCTURE_TOWER; };
    var list = room.find( FIND_MY_STRUCTURES, { filter: filter } );
    return ensure(list);
};

module.exports.enemyTowers = function(room) {
    var filter = (structure) => { return structure.structureType === STRUCTURE_TOWER; };
    var list = room.find( FIND_HOSTILE_STRUCTURES, { filter: filter } );
    return ensure(list);
};

// Find creeps

module.exports.miners = function(room) {
    var filter = (creep) => { return creep.memory.shell == 'miner' };
    var list = room.find(FIND_MY_CREEPS, { filter: filter });
    return ensure(list);
};

function ensure(list) {
    return list || [];
}
