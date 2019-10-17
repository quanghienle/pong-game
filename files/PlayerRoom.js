//creates a match for only 2 players

let Player = require("./Paddle.js");
let Ball = require("./Ball.js");
let Score = require("./Score.js");

function PlayerRoom(io){
  var parent = this;
  this.rooms = {};
  this.roomIndex = {};

  //creates new room
  this.create = function(socket0,socket1){
    var roomId = socket0.id+socket1.id;
    var room = new Room(roomId,socket0,socket1);
    socket0.join(roomId);
    socket1.join(roomId);
    io.to(roomId).emit("in");
    parent.rooms[roomId] = room;
    parent.roomIndex[socket0.id] = roomId;
    parent.roomIndex[socket1.id] = roomId;
    console.log("Room Created :", roomId);
  };

  //deletes room
  this.destroy = function(roomId, queue){
    var room = parent.rooms[roomId];
    room.players.forEach(function(socket){
      queue.push(socket);
      delete parent.roomIndex[socket.id];
    });
    delete parent.rooms[roomId];
  };
}

module.exports = PlayerRoom;

//generates a new room with 2 players
function Room(id, socket0, socket1) {
  this.id = id;
  this.status = "waiting";
  this.players = [socket0,socket1];
  this.objects = {};
  this.objects[socket0.id] = new Player(socket0.id, "LEFT");
  this.objects[socket1.id] = new Player(socket1.id, "RIGHT");
  this.objects.player0Score = new Score(socket0.id, "LEFT");
  this.objects.player1Score = new Score(socket1.id, "RIGHT");
  this.objects.ball = new Ball(socket0.id, socket1.id);
}
