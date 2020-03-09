
// Energy

module.exports.free = function(list, amount=1) {
    return filter( list, elem => (elem.store.getFreeCapacity(RESOURCE_ENERGY) >= amount) );
};

module.exports.filled = function(list, amount=1) {
    return filter( list, elem => (elem.store.getUsedCapacity(RESOURCE_ENERGY) >= amount) );
};

module.exports.low = function(list) {
    return filter( list, elem => elem.store && elem.store.getUsedCapacity(RESOURCE_ENERGY) / elem.store.getCapacity(RESOURCE_ENERGY) < 0.25 );
};

// Hitpoints

module.exports.damaged = function(list, ignore=Infinity) {
    return filter( list, elem => (elem.hits < elem.hitsMax) && (elem.hits < ignore) );
};

// Targeting

module.exports.targeted = function(list) {
    return filter( list,
        function(elem) {
            var creeps = Game.creeps;
            for (var name in creeps) {
                var creep = creeps[name];
                if (creep.memory.target === elem.id)
                    return true;
            }
            return false;
        }
    );
}

module.exports.untargeted = function(list) {
    return filter( list,
        function(elem) {
            var creeps = Game.creeps;
            for (var name in creeps) {
                var creep = creeps[name];
                if (creep.memory.target === elem.id)
                    return false;
            }
            return true;
        }
    );
}

// Helper functions

function filter(list, filter) {
    var out = [];
    for (var i in list) {
        var elem = list[i];
        if (filter(elem))
            out.push(elem);
    }
    return ensure(out);
}

function ensure(list) {
    return (list && list.length>0) ? list : undefined;
}
