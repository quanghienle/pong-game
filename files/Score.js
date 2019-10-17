/* keeping track of the score of each player */

const CUSTOMIZATION = require("./Customization.js");
let init = function() {
  this.status = {x: 0, y: 0};
}

//takes player id and position which is left or right
function Score(id,position){
  init.call(this);
  this.playerId = id;
  // this.status.shape = "text";
  // this.status.color = CUSTOMIZATION.SCORE.COLOR;
  // this.status.font = CUSTOMIZATION.SCORE.FONT;
  // this.status.textAlign = "center";
  // this.status.size = CUSTOMIZATION.SCORE.SIZE;
  // this.status.text = undefined;
  // this.status.y = CUSTOMIZATION.SCORE.Y;
  this.status = {
    shape : "text",
    color : CUSTOMIZATION.SCORE.COLOR,
    font : CUSTOMIZATION.SCORE.FONT,
    textAlign : "center",
    size : CUSTOMIZATION.SCORE.SIZE,
    text : undefined,
    y : CUSTOMIZATION.SCORE.Y
  };
  switch(position){
    case "LEFT":
      this.status.x = CUSTOMIZATION.WIDTH/2-CUSTOMIZATION.SCORE.GAP;
      break;
    case "RIGHT":
      this.status.x = CUSTOMIZATION.WIDTH/2+CUSTOMIZATION.SCORE.GAP;
      break;
  }
}
Score.prototype = new init();
Score.prototype.constructor = Score;
Score.prototype.update = function(objects){
  this.status.text = objects[this.playerId].score;
};
module.exports = Score;
