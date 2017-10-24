module.exports = {
 run: function(creep) {
   var flag = Game.flags.Protect;
   if (!flag) {
     return;
   }
   var targetPosition = flag.pos;
   var targetRoom = flag.room;

   if (!targetRoom || creep.pos.roomName !== targetPosition.roomName) {
     creep.moveTo(new RoomPosition(25, 25, targetPosition.roomName), {range: 20});
   } else {
     var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
     if (target) {
       if (creep.attack(target) === ERR_NOT_IN_RANGE) {
         creep.moveTo(target)
       }
     }
     else {
        var walls = creep.room.find(FIND_STRUCTURES, { filter: s => s instanceof StructureWall });
        var weakestWall = _.min(walls, w => w.hits);
        
        if (weakestWall) {
         if (creep.attack(weakestWall) === ERR_NOT_IN_RANGE) {
           creep.moveTo(weakestWall);
         }
       } else {
         creep.moveTo(new RoomPosition(25, 25, targetPosition.roomName), {range: 24});
       }
     }

   }
 }
};