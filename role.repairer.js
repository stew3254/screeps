var roleHarvester = require('role.harvester');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working == true) {
            var walls = Game.rooms.E35N59.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_WALL && s.hits < 250000) || (s.structureType == STRUCTURE_RAMPART && s.hits < 250000)
            });
            let target = undefined;
            
            for (let percentage = 0.00001; percentage <= 1; percentage = percentage + 0.00001){
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }
                if (target != undefined) {
                    break;
                }
            }

            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
                if (container != undefined) {
                    if (creep.store(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
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
                roleHarvester.run(creep);
            }
        }
    }
};