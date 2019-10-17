
//updating room and players
function Controller(io, playerRoom){
  var parent = this;
  this.roomManager = playerRoom;

  this.update = setInterval(function(){
    for(var roomId in parent.roomManager.rooms){
      var room = parent.roomManager.rooms[roomId];
      var statuses = [];
      for(var object in room.objects){
        var obj = room.objects[object];
        obj.update(room.objects);
        statuses.push(obj.status);
      }
      io.to(room.id).emit('update',statuses);
    }
  },10);
}

module.exports = Controller;
