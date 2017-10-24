var roleRemoteHarvester = require('role.remoteHarvester');
module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity
            });
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else if (structure == undefined) {
                creep.transfer(creep.room.storage, RESOURCE_ENERGY);
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.storage);
                }
            }
        } 
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (source != undefined) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
                roleRemoteHarvester.run(creep);
            }
        }
    }
};