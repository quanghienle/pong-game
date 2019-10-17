/* keeping track of the score of each player */

const GRID = require("./Grid.js");
let init = function() {
  this.status = {x: 0, y: 0};
}

//takes player id and position which is left or right
function Score(id,position){
  init.call(this);
  this.playerId = id;
  this.status.shape = "text";
  this.status.color = "#FF0000";
  this.status.font = "Arial";
  this.status.textAlign = "center";
  this.status.size = GRID.SCORE.SIZE;
  this.status.text = undefined;
  this.status.y = GRID.SCORE.Y;
  switch(position){
    case "LEFT":
      this.status.x = GRID.WIDTH/2-GRID.SCORE.GAP;
      break;
    case "RIGHT":
      this.status.x = GRID.WIDTH/2+GRID.SCORE.GAP;
      break;
  }
}
Score.prototype = new init();
Score.prototype.constructor = Score;
Score.prototype.update = function(objects){
  this.status.text = objects[this.playerId].score;
};
module.exports = Score;
