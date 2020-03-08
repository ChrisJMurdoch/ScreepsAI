
module.exports.countTasks = function(task) {
    return _.filter(Game.creeps, (creep) => creep.memory.task == task).length;
};

module.exports.countShells = function(shell) {
    return _.filter(Game.creeps, (creep) => creep.memory.shell == shell).length;
};
