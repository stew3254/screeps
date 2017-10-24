var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            
            if (creep.pos.roomName != Game.flags.Harvest2.pos.roomName){
                creep.moveTo(Game.flags.Harvest2.pos);
            }
            else if (creep.pos.roomName == Game.flags.Harvest2.pos.roomName) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                    }  
                }
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});
                if (structure != undefined) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
            if (creep.pos.roomName != Game.flags.Harvest2.pos.roomName){
                creep.moveTo(Game.flags.Harvest2.pos);
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