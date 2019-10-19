//paddle objects
//control the movement of paddles
//and which player is controlling which paddle

const SETTING = require("../settings/Customization.js");
let initObject = function() {
  this.status = {x: 0, y: 0};
};

let LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
let UNIT = 2;

function Paddle(id,position){
  //initObject.call(this);
  let {SHAPE, HEIGHT, WIDTH, GAP, COLOR} = SETTING.PLAYER;
  this.role = "paddle";
  this.id = id;
  this.score = 0;
  this.keypress = {};
  this.status = {
    shape : SHAPE,
    height : HEIGHT,
    width : WIDTH,
    color : COLOR
  };

  this.status.y = (SETTING.HEIGHT-this.status.height)/2;
  switch(position){
    case "LEFT":
      this.status.x = SETTING.PLAYER.GAP;
      break;
    case "RIGHT":
      this.status.x = SETTING.WIDTH-SETTING.PLAYER.GAP - this.status.width;
      break;
  }

}
Paddle.prototype = new initObject();
Paddle.prototype.constructor = Paddle;
Paddle.prototype.update = function(objects){
  if(this.keypress[UP] && this.status.y - UNIT >= SETTING.BORDER_WIDTH)
    this.status.y -= UNIT;
  if(this.keypress[DOWN] && this.status.y + this.status.height + UNIT <= SETTING.HEIGHT - SETTING.BORDER_WIDTH)
    this.status.y += UNIT;
};

module.exports = Paddle;
