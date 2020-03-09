
module.exports.countTasks = function(task) {
    return _.filter(Game.creeps, (creep) => creep.memory.task == task).length;
};

module.exports.countShells = function(shell) {
    return _.filter(Game.creeps, (creep) => creep.memory.shell == shell).length;
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

module.exports.countUnitsAssignedTo = function (id) {
    var count = 0;
    for(var creep in Memory.creeps) {
        if ( Game.creeps[creep].memory.source == id ) {
            count++;
        }
    };
    return count;
};
