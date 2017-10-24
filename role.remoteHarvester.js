module.exports = {
  run: function(creep) {
    var remoteFlag = Game.flags.Harvest1;
    var homeFlag = Game.flags.ReturnHarvest;

    if (creepIsWorking(creep)) {
      if (creep.pos.roomName !== homeFlag.pos.roomName) {
        creep.moveTo(homeFlag);
      } else {
        transferToStorage(creep);
      }
      
    } else {
      if (creep.pos.roomName !== remoteFlag.pos.roomName) {
        creep.moveTo(remoteFlag);
      } else {
        mineFromSource(creep);
      }
    }
  }
};

function transferToStorage(creep) {
  creep.transfer(creep.room.storage, RESOURCE_ENERGY);
  if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.storage);
  }
  else {
      creep.transfer(creep.room.controller, RESOURCE_ENERGY)
      if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
        }
    }
}

function mineFromSource(creep) {
  var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
    creep.moveTo(source);
  }
}

function creepIsWorking(creep) {
  if (creep.memory.working === true && creep.carry.energy === 0) {
    creep.memory.working = false;
  }
  else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
    creep.memory.working = true;
  }
  return creep.memory.working;
}