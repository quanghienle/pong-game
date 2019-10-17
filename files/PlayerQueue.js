//number of browsers open will be lined up in a queue
//the first 2 players are allowed to play

function PlayerQueue(io){
  let parent = this;
  this.queue = [];
  this.updating = false;

  //add player to waiting list (queue)
  this.push = function(socket){
    parent.queue.push(socket);
  };
  //remove a element in a queue
  this.kick = function(socket){
    var index = parent.queue.indexOf(socket);
    if(index >= 0) parent.queue.splice(index,1);
  };
  //deletes the queue
  this.clean = function(){
    var sockets = parent.queue;
    parent.queue = sockets.filter(function(socket){ return socket !== null; });
  };

  //pick the first 2 clients that open the browser
  this.dispatch = function(playerRoom){
    if(parent.dispatching) return;
    parent.dispatching = true;

    while(parent.queue.length > 1){
      var firstPlayer = parent.queue.splice(0,1)[0];
      var secondPlayer = parent.queue.splice(0,1)[0];
      playerRoom.create(firstPlayer,secondPlayer);
    }
    parent.dispatching = false;
  };
}
module.exports = PlayerQueue;
