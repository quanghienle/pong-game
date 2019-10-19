//ball object
//control movement of the ball
//bouncing off wall and paddles

const SETTING = require("../settings/Customization.js");
let initObject = function() {
  this.status = {x: 0, y: 0};
};


let COLLUSION_TYPE = { NO_COLLUSION: -1, VERTICAL: 1, HORIZONTAL: 2};
let {SHAPE, COLOR, HEIGHT, WIDTH, SPEED} = SETTING.BALL;

//this is a constructor
function Ball(player0Id, player1Id){
  //initObject.call(this);
  this.playerIds = [player0Id,player1Id];
  this.dx = 1;
  this.dy = 1;
  this.speed = SPEED;
  this.move = true;
  this.status = {
    shape : SHAPE,
    x : (SETTING.WIDTH - WIDTH)/2,
    y : (SETTING.HEIGHT - HEIGHT)/2,
    width : WIDTH,
    height : HEIGHT,
    color : COLOR
  }
}

Ball.prototype = new initObject();
Ball.prototype.constructor = Ball;
Ball.prototype.update = function(objects){
  if(this.move){
    //increasing x and y
    this.status.x += this.dx*this.speed;
    this.status.y += this.dy*this.speed;

    //ball goes to left end
    if(this.status.x <= 0 - this.status.width*2){
      objects[this.playerIds[1]].score++;
      this.dx = Math.abs(this.dx);
      this.initialize();
    }
    //ball goes to right end
    if(this.status.x + this.status.width >= SETTING.WIDTH + this.status.width*2){
      objects[this.playerIds[0]].score++;
      this.dx = -Math.abs(this.dx);
      this.initialize();
    }
    if(this.status.y <= 0 + SETTING.BORDER.WIDTH)
    this.dy = Math.abs(this.dy);
    if(this.status.y + this.status.height >= SETTING.HEIGHT - SETTING.BORDER.WIDTH)
    this.dy = -Math.abs(this.dy);

    //hitting the paddle
    for(var object in objects){
      if(objects[object].role == "paddle"){
        var playerStat = objects[object].status;
        var collusionType = ballCollusionCheck(this.status, playerStat, this.dx*this.speed);
        switch(collusionType){
          case COLLUSION_TYPE.NO_COLLUSION:
          break;
          case COLLUSION_TYPE.VERTICAL:
          this.dy = bounce(this.status.y+this.status.height/2, playerStat.y+playerStat.height/2, this.dy);
          break;
          case COLLUSION_TYPE.HORIZONTAL:
          this.dx = bounce(this.status.x+this.status.width/2, playerStat.x+playerStat.width/2, this.dx);
          break;
        }
      }
    }
  }
};

Ball.prototype.initialize = function(objects){
  this.status.x = (SETTING.WIDTH - WIDTH)/2;
  this.status.y = (SETTING.HEIGHT - HEIGHT)/2;
};

module.exports = Ball;

//bouncing
function bounce (x, y, v){
  return x<y ? -Math.abs(v) : Math.abs(v);
}

//checking for collision
function ballCollusionCheck(ballStat,playerStat,dx){
  if(pointSquareCollusionCheck(ballStat.x, ballStat.y, playerStat)){
    return pointSquareCollusionCheck(ballStat.x - dx, ballStat.y, playerStat)?
      COLLUSION_TYPE.VERTICAL:
      COLLUSION_TYPE.HORIZONTAL;
  }
  if(pointSquareCollusionCheck(ballStat.x + ballStat.width, ballStat.y, playerStat)){
    return pointSquareCollusionCheck(ballStat.x - dx + ballStat.width, ballStat.y , playerStat)?
      COLLUSION_TYPE.VERTICAL:
      COLLUSION_TYPE.HORIZONTAL;
  }
  if(pointSquareCollusionCheck(ballStat.x, ballStat.y + ballStat.height, playerStat)){
    return pointSquareCollusionCheck(ballStat.x - dx, ballStat.y + ballStat.height, playerStat)?
      COLLUSION_TYPE.VERTICAL:
      COLLUSION_TYPE.HORIZONTAL;
  }
  if(pointSquareCollusionCheck(ballStat.x + ballStat.width, ballStat.y + ballStat.height, playerStat)){
    return pointSquareCollusionCheck(ballStat.x - dx + ballStat.width, ballStat.y + ballStat.height, playerStat)?
      COLLUSION_TYPE.VERTICAL:
      COLLUSION_TYPE.HORIZONTAL;
  }
  return COLLUSION_TYPE.NO_COLLUSION;
}

//hitting the conners
function pointSquareCollusionCheck(x,y,square){
  if(x >= square.x && x <= square.x + square.width && y >= square.y && y <= square.y + square.height )
    return true;
}
