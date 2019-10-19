/* keeping track of the score of each player */

const CUSTOMIZATION = require("../settings/Customization.js");
let init = function () {
    this.status = {x: 0, y: 0};
};
let getX = function (pos) {
    switch (pos) {
        case "LEFT":
            return CUSTOMIZATION.WIDTH / 2 - CUSTOMIZATION.SCORE.GAP;
        case "RIGHT":
            return CUSTOMIZATION.WIDTH / 2 + CUSTOMIZATION.SCORE.GAP;
    }
};

//takes player id and position which is left or right
function Score(id, position) {
    init.call(this);
    this.playerId = id;
    this.status = {
        shape: "text",
        color: CUSTOMIZATION.SCORE.COLOR,
        font: CUSTOMIZATION.SCORE.FONT,
        textAlign: "center",
        size: CUSTOMIZATION.SCORE.SIZE,
        text: undefined,
        y: CUSTOMIZATION.SCORE.Y,
        x: getX(position)
    };
}

Score.prototype = new init();
Score.prototype.constructor = Score;
Score.prototype.update = function (objects) {
    this.status.text = objects[this.playerId].score;
};
module.exports = Score;
