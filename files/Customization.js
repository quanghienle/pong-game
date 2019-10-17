//initialize basic info for the game

const CUSTOMIZATION = {
  WIDTH : 600,
  HEIGHT : 400,
  BORDER_WIDTH : 10,
  BACKGROUND_COLOR : "#FFFFFF",
  PLAYER : {
    SHAPE : "rectangle",
    WIDTH : 15,
    HEIGHT : 80,
    GAP : 20,
    COLOR : "#778899"
  },
  BALL : {
    SHAPE : "rectangle",
    WIDTH : 15,
    HEIGHT : 15,
    COLOR : "#000000",
  },
  NET : {
    WIDTH : 6
  },
  SCORE : {
    Y : 50,
    SIZE : 30,
    GAP : 50,
    FONT : "Arial",
    COLOR : "#FF0000"
  }
};

module.exports = CUSTOMIZATION;
