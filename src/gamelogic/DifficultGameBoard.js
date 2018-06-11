import GameBoard from "./GameBoard";

/**
 * Class that inherits from GameBoard to ensure prototypal inheritance
 * Two methods widen the functionality, specifically the random generating of blocks
 * prepareBlocks is overridden
 * two new variables are there: mode and speedMultiplier, both alter the gameplay
 *
 * More description in parent class
 */
export default class DifficultGameBoard extends GameBoard {
  constructor(canvasNode, speedMultiplier) {
    super(canvasNode);
    this.mode = "Difficult";
    this.speedMultiplier = speedMultiplier;
  }
  //GENERATES RANDOM INTEGER WITHIN RANGE
  getRandomHealthValue(rangeFrom, rangeTo) {
    return Math.floor(Math.random() * (rangeTo - rangeFrom) + rangeFrom);
  }
  //GENERATES DURABLE BLOCKS
  prepareRandomDurableBlocks(totalRows, totalColumns) {
    var blocks = [];
    for (let col = 0; col < totalColumns; col++) {
      blocks[col] = [];
      for (let row = 0; row < totalRows; row++) {
        let health = this.getRandomHealthValue(1, 5);
        blocks[col][row] = {
          x: 0,
          y: 0,
          destroyed: false,
          health: health
        };
      }
    }
    return blocks;
  }
  //OVERRIDES ORIGINAL METHOD IN PARENT CLASS AND RETURNS DURABLE BLOCKS
  prepareBlocks(totalRows, totalColumns) {
    return this.prepareRandomDurableBlocks(totalRows, totalColumns);
  }
}
