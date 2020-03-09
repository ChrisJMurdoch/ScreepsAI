
module.exports.select = function(array, aggregate, filters) {
    
    // Optionally filter
    if (filters)
        array = module.exports.filter(array, filters);
    
    // Validate array
    if (!array)
        throw "Select: no array";
    if (!(array instanceof Array))
        throw "Select: invalid array";
    if (!array.length)
        return null;
    
    // Validate aggregate
    if (!aggregate)
        throw "Select: no aggregate";
    if (!(aggregate instanceof Function))
        throw "Select: invalid aggregate";
    if (aggregate.length > 1)
        throw "Select: unbound aggregate";
    
    // Aggregate
    var out = aggregate(array);
    if (!out)
        throw "Select: aggregate failed";
    
    return out;
};

module.exports.filter = function(array, filters) {
    
    // Validate array
    if (!array)
        throw "Select: no array";
    if (!(array instanceof Array))
        throw "Select: invalid array";
    if (!array.length)
        return [];
        
    // Single filter -> Array
    if (!(filters instanceof Array))
        filters = [filters];
    
    // Validate filters
    for (var i in filters) {
        var filter = filters[i]
        if (!filter)
            throw "Select: missing filter";
        if (!(filter instanceof Function))
            throw "Select: invalid filter";
        if (filter.length > 1)
            throw "Select: unbound filter";
    }
    
    // Filter
    var filtered = [];
    for (var element of array) {
        if (test(element, filters))
            filtered.push(element);
    }
    
    return filtered;
};

function test(element, filters) {
    for (var i in filters) {
        var filter = filters[i];
        if (!filter(element))
            return false;
    }
    return true;
}
