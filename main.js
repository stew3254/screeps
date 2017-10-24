require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleRemoteHarvester2 = require('role.remoteHarvester2');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleSoldier = require('role.soldier');
var roleGuard = require('role.guard');
var roleClaimer = require('role.claimer');
var roleCarrier = require('role.carrier');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleRemoteBuilder2 = require('role.remoteBuilder2');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleRemoteUpgrader2 = require('role.remoteUpgrader2');
       
module.exports.loop = function () {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'remoteHarvester') {
            roleRemoteHarvester.run(creep);
        }
        else if (creep.memory.role == 'remoteHarvester2') {
            roleRemoteHarvester2.run(creep);
        }
        else if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role == 'guard') {
            roleGuard.run(creep);
        }
        else if (creep.memory.role == 'remoteBuilder') {
            roleRemoteBuilder.run(creep);
        }
        else if (creep.memory.role == 'remoteBuilder2') {
            roleRemoteBuilder2.run(creep);
        }
        else if (creep.memory.role == 'remoteUpgrader') {
            roleRemoteUpgrader.run(creep);
        }
        else if (creep.memory.role == 'remoteUpgrader2') {
            roleRemoteUpgrader2.run(creep);
        }
    }

    var towers = Game.rooms.E35N59.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
        else {
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
                for (tower of towers) {
                    if (tower.energy >= 500) {
                    tower.repair(target);
                    }
                }
            }
        }
    }
    
    var minimumNumberOfHarvesters = 2;
    var minimumNumberOfCarriers = 1;
    var minimumNumberOfRemoteHarvesters = 3;
    var minimumNumberOfRemoteHarvester2s = 3;
    var minimumNumberOfRemoteHarvester3s = 0;
    var minimumNumberOfRemoteBuilders = 0;
    var minimumNumberOfRemoteBuilder2s = 0;
    var minimumNumberOfRemoteUpgraders = 0;
    var minimumNumberOfRemoteUpgrader2s = 0;
    var minimumNumberOfUpgraders = 2;
    var minimumNumberOfBuilders = 3;
    var minimumNumberOfRepairers = 3;
    var minimumNumberOfSoldiers =  0;
    var minimumNumberOfGuards = 0;
    var minimumNumberOfClaimers = 0;
    var maximumNumberOfBuilders = 4;
    var maximumNumberOfSoldiers = 3;
    

    var numberOfRemoteHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'remoteHarvester');
    var numberOfRemoteHarvester2s = _.sum(Game.creeps, (c) => c.memory.role == 'remoteHarvester2');
    var numberOfRemoteHarvester3s = _.sum(Game.creeps, (c) => c.memory.role == 'remoteHarvester3');
    var numberOfRemoteBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'remoteBuilder');
    var numberOfRemoteBuilder2s = _.sum(Game.creeps, (c) => c.memory.role == 'remoteBuilder2');
    var numberOfRemoteUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'remoteUpgrader');
    var numberOfRemoteUpgrader2s = _.sum(Game.creeps, (c) => c.memory.role == 'remoteUpgrader2');
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfCarriers = _.sum(Game.creeps, (c) => c.memory.role == 'carrier');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfSoldiers = _.sum(Game.creeps, (c) => c.memory.role == 'soldier');
    var numberOfGuards = _.sum(Game.creeps, (c) => c.memory.role == 'guard');
    var numberOfClaimer = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');


    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;


    
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
        
    }
     else if (numberOfCarriers < minimumNumberOfCarriers) {
        name = Game.spawns.Spawn1.createCustomCarrier(energy, 'carrier');
    }   
    else if (numberOfGuards < minimumNumberOfGuards) {
        name = Game.spawns.Spawn1.createCustomSoldier(energy, 'guard');
    }   
    else if (numberOfRemoteHarvesters < minimumNumberOfRemoteHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteHarvester');
    }
    else if (numberOfRemoteBuilders < minimumNumberOfRemoteBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteBuilder');
    }
    else if (numberOfRemoteUpgraders < minimumNumberOfRemoteUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteUpgrader');
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    else if (numberOfSoldiers < minimumNumberOfSoldiers) {
        name = Game.spawns.Spawn1.createCustomSoldier(energy, 'soldier');
    }
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else if (numberOfRemoteHarvester2s < minimumNumberOfRemoteHarvester2s) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteHarvester2');
    }
    else if (numberOfRemoteBuilder2s < minimumNumberOfRemoteBuilder2s) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteBuilder2');
    }
    else if (numberOfRemoteUpgrader2s < minimumNumberOfRemoteUpgrader2s) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'remoteUpgrader2');
    }
    else if(numberOfClaimer < minimumNumberOfClaimers && Game.flags.Claimroom != undefined) {
        name = Game.spawns.Spawn1.createClaimer(energy, 'claimer');
    }
    else if(numberOfBuilders < maximumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
};












