
// Structures

module.exports.structures = function(room) {
    var list = room.find( FIND_STRUCTURES );
    return list || [];
};

module.exports.sources = function(room) {
    var list = room.find( FIND_SOURCES );
    return list || [];
};

module.exports.spawnStructures = function(room) {
    var filter = ( structure => (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) );
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return list || [];
};

module.exports.storage = function(room) {
    var filter = ( structure => (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) );
    var list = room.find( FIND_STRUCTURES, { filter: filter } );
    return list || [];
};

module.exports.constructionSites = function(room) {
    var list = room.find(FIND_CONSTRUCTION_SITES);
    return list || [];
};

module.exports.extensions = function(room) {
    var filter = ( structure => (structure.structureType == STRUCTURE_EXTENSION) );
    var list = room.find( FIND_STRUCTURES, { filter: filter } ); 
    return list || [];
};

module.exports.friendlyTowers = function(room) {
    var filter = ( structure => (structure.structureType === STRUCTURE_TOWER) );
    var list = room.find( FIND_MY_STRUCTURES, { filter: filter } );
    return list || [];
};

module.exports.enemyTowers = function(room) {
    var filter = ( structure => (structure.structureType === STRUCTURE_TOWER) );
    var list = room.find( FIND_HOSTILE_STRUCTURES, { filter: filter } );
    return list || [];
};

// Creeps

module.exports.creeps = function(room) {
    var list = room.find(FIND_MY_CREEPS);
    return list || [];
};

module.exports.miners = function(room) {
    var filter = ( creep => (creep.memory.shell == 'miner') );
    var list = room.find(FIND_MY_CREEPS, { filter: filter });
    return list || [];
};


