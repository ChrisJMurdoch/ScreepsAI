
var Finder = require('Util.Finder');

module.exports.resourcesAbundant = function(room) {
    var stores = Finder.storage(room);
    if (!stores) return false;
    for (var s of stores) {
        if (s.store.getUsedCapacity(RESOURCE_ENERGY) < s.store.getCapacity(RESOURCE_ENERGY) * 0.75 )
            return false;
    }
    return true;
};
