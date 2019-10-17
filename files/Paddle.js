//paddle objects
//control the movement of paddles
//and which player is controlling which paddle

const GRID = require("./Grid.js");
let initObject = function() {
  this.status = {x: 0, y: 0};
}

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
var UNIT = 2;

function paddle(id,position){
  initObject.call(this);
  var color = "#778899";
  this.role = "paddle";
  this.status.shape = "rectangle";
  this.status.height = GRID.PLAYER.HEIGHT;
  this.status.width = GRID.PLAYER.WIDTH;
  this.status.y = (GRID.HEIGHT-this.status.height)/2;

  switch(position){
    case "LEFT":
      this.status.x = GRID.PLAYER.GAP;
      break;
    case "RIGHT":
      this.status.x = GRID.WIDTH-GRID.PLAYER.GAP -this.status.width;
      break;
  }
  this.status.color = "#778899";
  this.id = id;
  this.score = 0;
  this.keypress = {};
}
paddle.prototype = new initObject();
paddle.prototype.constructor = paddle;
paddle.prototype.update = function(objects){
  if(this.keypress[UP] && this.status.y - UNIT >= 0 + GRID.BORDER_WIDTH)
    this.status.y -= UNIT;
  if(this.keypress[DOWN] && this.status.y + this.status.height + UNIT <= GRID.HEIGHT - GRID.BORDER_WIDTH)
    this.status.y += UNIT;
};

module.exports = paddle;
