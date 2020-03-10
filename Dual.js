
module.exports = class Dual {
    
    run(creep) {
        switch (creep.memory.task) {
        
        case "idle":
            console.log("idle");
            creep.say("idle");
            break;
        
        case "gather":
            this.gather(creep);
            break;
        
        default:
            try {
                this.action(creep);
            } catch (e) {
                // Can't reassign => Idle
                console.log(e);
                this.switchToIdle(creep);
            }
        }
    }
    
    gather(creep) {
            
        // Get target
        var target = Game.getObjectById(creep.memory.source);
        
        // Full => idle
        if (creep.store.getFreeCapacity() === 0) {
            this.switchToIdle(creep);
            return;
        }
        
        // Determine type of gather
        if (target instanceof Creep) {
            let result = target.transfer(creep, RESOURCE_ENERGY, Math.min(target.store.getCapacity(RESOURCE_ENERGY), creep.store.getFreeCapacity(RESOURCE_ENERGY)));
            this.respondToGather(creep, target, result, false);
            
        } else if (target instanceof Source || target instanceof Mineral) {
            let result = creep.harvest(target);
            this.respondToGather(creep, target, result, true);
            
        } else if (target instanceof StructureContainer || target instanceof StructureStorage) {
            let result = creep.withdraw(target, RESOURCE_ENERGY, creep.store.getFreeCapacity(RESOURCE_ENERGY));
            this.respondToGather(creep, target, result, false);
            
        } else {
            creep.say('?SRC');
            this.assignResource(creep);
        }
    }
    
    getTarget(creep, assign) {
        
        // Validate current target
        let target = Game.getObjectById(creep.memory.target);
        if (target) return target;
        
        // Try to get new target
        try {
            assign(creep);
            return Game.getObjectById(creep.memory.target);
        } catch (e) {
            creep.say(e);
            return null;
        }
    }
    
    respondToAction(creep, target, result) {
        switch(result) {
            case OK:
                // DO NOTHING
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo( target, {visualizePathStyle: this.getWorkStyle()} );
                break;
            case ERR_NOT_ENOUGH_RESOURCES:
                this.switchToGather(creep);
                break;
            case ERR_FULL:
                this.assignTarget(creep);
                break;
            default:
                console.log('ACTN: ' + result + ' ' + Game.getObjectById(creep.memory.target) + ' - ' + creep.memory.action);
                creep.say('ACTN: ' + result);
                break;
        }
    }
    
    respondToGather(creep, target, result) {
        // Deal with exceptions
        switch (result) {
            case OK:
                // DO NOTHING
                break;
            case ERR_NOT_IN_RANGE:
                creep.moveTo(target, {visualizePathStyle: this.getGatherStyle()});
                break;
            case ERR_NOT_ENOUGH_RESOURCES:
                this.assignResource(creep);
                break;
            case ERR_TIRED:
                break;
            default:
                console.log('GTHR: ' + result);
                creep.say('GTHR: ' + result);
                break;
        }
    }
    
    switchToGather(creep) {
        delete creep.memory.target;
        this.assignResource(creep);
        creep.memory.task = 'gather';
    }
    switchToIdle(creep) {
        delete creep.memory.source;
        // Wait for task assignment
        creep.memory.task = 'idle';
    }
};
