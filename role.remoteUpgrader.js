var roleRemoteHarvester = require('role.remoteHarvester');
module.exports = {
    run: function(creep) {
        if (creep.room.controller.level > 1) {
    roleRemoteHarvester.run(creep);
    return;
}
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            
            if (creep.pos.roomName != Game.flags.Harvest1.pos.roomName){
                creep.moveTo(Game.flags.Harvest1.pos);
            } 
            else if (creep.room.controller.level < 2) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    }
                }
        }
        else {
            if (creep.pos.roomName != Game.flags.Harvest1.pos.roomName){
                creep.moveTo(Game.flags.Harvest1.pos);
            }
            else {
            /*var genergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter:s=>s.resourceType==RESOURCE_ENERGY});            
            if(creep.pickup(genergy) == ERR_NOT_IN_RANGE){
                creep.moveTo(genergy);
            }*/
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};