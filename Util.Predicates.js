
// Energy

module.exports.eFilled = function(amount, elem) {
    return elem.store && elem.store.getUsedCapacity(RESOURCE_ENERGY) >= amount;
};

module.exports.eFree = function(amount, elem) {
    return elem.store && elem.store.getFreeCapacity(RESOURCE_ENERGY) >= amount;
};

module.exports.eFilledRatio = function(amount, elem) {
    return elem.store && elem.store.getUsedCapacity(RESOURCE_ENERGY) / elem.store.getCapacity(RESOURCE_ENERGY) >= amount;
};

module.exports.eFreeRatio = function(amount, elem) {
    return elem.store && elem.store.getFreeCapacity(RESOURCE_ENERGY) / elem.store.getCapacity(RESOURCE_ENERGY) >= amount;
};

// Hitpoints

module.exports.damaged = function(ignore, elem) {
    return elem.hits && elem.hits < elem.hitsMax && elem.hits < ignore;
};

// Targeting

module.exports.targeted = function(elem) {
    var creeps = Game.creeps;
    for (var name in creeps) {
        if (creeps[name].memory.target === elem.id)
            return true;
    }
    return false;
}

module.exports.untargeted = function(elem) {
    var creeps = Game.creeps;
    for (var name in creeps) {
        if (creeps[name].memory.target === elem.id)
            return false;
    }
    return true;
}
