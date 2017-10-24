require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    
    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var creepName = undefined;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        creepName = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
        if (name == ERR_NOT_ENOUGH_ENERGY && harvesters.length == 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');

        }
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    if(builders.length < 4) {
        var newName = 'Builder' + Game.time;
        creepName = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    
    if(repairers.length < 3) {
        var newName = 'Repairer' + Game.time;
        creepName = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    if(upgraders.length < 4) {
        var newName = 'Upgrader' + Game.time;
        creepName = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
}