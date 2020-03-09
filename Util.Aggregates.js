
var CreepCounter = require('Util.CreepCounter');

// Distance

module.exports.closest = function (marker, objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s => marker.pos.getRangeTo(s) )[0];
}

// Energy

module.exports.highestEnergy = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s => -s.store.getUsedCapacity(RESOURCE_ENERGY) )[0];
}
module.exports.highestEnergyPercent = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s => -(s.store.getUsedCapacity(RESOURCE_ENERGY)/s.store.getCapacity(RESOURCE_ENERGY)) )[0];
}

module.exports.lowestEnergy = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s => s.store.getUsedCapacity(RESOURCE_ENERGY) )[0];
}
module.exports.lowestEnergyPercent = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s => (s.store.getUsedCapacity(RESOURCE_ENERGY)/s.store.getCapacity(RESOURCE_ENERGY)) )[0];
}

// Building

module.exports.mostCompleted = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s =>  (s.progressTotal - s.progress) / s.progressTotal )[0];
}

module.exports.lowestHitpoints = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s =>  s.hits )[0];
}
module.exports.lowestHitpointPercent = function (objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, s =>  s.hits / s.hitsMax )[0];
}

// Assignment

module.exports.leastMinersAssigned = function(objects) {
    if (!valid(objects)) return;
    return _.sortBy(objects, m => CreepCounter.countMinersAssignedTo(m.id) )[0];
};

// helper functions

function valid(objects) {
    return objects && (objects.length > 0);
}
