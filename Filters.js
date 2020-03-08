
function filter(list, filter) {
    var out = [];
    for (var i in list) {
        var elem = list[i];
        if (filter(elem))
            out.push(elem);
    }
    return out;
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

module.exports.lowEnergy = function(list) {
    return filter( list, elem => elem.store && elem.store.getUsedCapacity(RESOURCE_ENERGY) / elem.store.getCapacity(RESOURCE_ENERGY) < 0.25 );
}
