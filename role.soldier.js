module.exports = {
 run: function(creep) {
     
   var flag = Game.flags.Invade;
   if (!flag) {
     
     return;
   }
   var targetPosition = flag.pos;
   var targetRoom = flag.pos.roomName;

   if ((!targetRoom) || (creep.pos.roomName !== targetPosition.roomName)) {
     creep.moveTo(targetPosition);
   } 
   else {
     var espawn = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: s => s instanceof StructureSpawn });
     var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
     if (target) {
        
       if (creep.attack(target) === ERR_NOT_IN_RANGE) {
         creep.moveTo(target)
       }
     } 
     else if (espawn){
         if (creep.attack(espawn) === ERR_NOT_IN_RANGE) {
         creep.moveTo(espawn)
       }
     }
     else {
        var walls = creep.room.find(FIND_STRUCTURES, { filter: s => s instanceof StructureWall});
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