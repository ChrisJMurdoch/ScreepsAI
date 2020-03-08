
module.exports = {
    
    class AbstractTask {
        
        assignTarget(creep) {
            
        }
        
        act(creep, target) {
            // Do action
            result = this.action(creep);
            // Respond to result
            switch(result) {
                case OK:
                    this.ok(creep);
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
        
        action(creep) {
            return creep.build(target, RESOURCE_ENERGY);
        }
        
        ok(creep) {
            // Do nothing
        }
        notInRange(creep, target, moveStyle) {
            creep.moveTo( target, {visualizePathStyle: moveStyle} );
        }
        notEnoughResources(creep) {
            // Gather
        }
        full(creep) {
            // Assign new target
        }
        
        
        
    }
    
    class Haul extends AbstractTask {
        
        act(creep) {
            
        }
        
        
    }
    
};