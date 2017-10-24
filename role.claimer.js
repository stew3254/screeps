module.exports = {
    run: function(creep) {
        if (Game.flags.Calimroom != undefined){
        var flag = Game.flags.Claimroom;
        var targetPosition = flag.pos;
        var targetRoom = flag.room;
        
        if (!targetRoom || creep.pos.roomName !== targetPosition.roomName) {
        //  If room is not visible or creep is not in the room , Move towards the room
        creep.moveTo(new RoomPosition(25, 25, targetPosition.roomName), {range: 24});
        } 
   
            else {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                
                }
            }
        }
    }
};