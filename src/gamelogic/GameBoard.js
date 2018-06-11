import explode from "../media/explode.mp3";
import victory from "../media/victory.mp3";

/**
 * GameBoard is a main game logic class, it handles how the game behaves and what happens, it also renders on canvas
 * Canvas node is a canvas element gotten from contructor while creating the GameBoard, ctx is a context created based on the canvasNode
 *
 */
export default class GameBoard {
  constructor(canvasNode) {
    this.canvasNode = canvasNode;
    this.ctx = canvasNode.getContext("2d");
  }
  //STARTS THE GAME
  startGame() {
    this.started = true;
    this.terminated = false;
  }
  //TERMINATES THE GAME WHEN LEAVING THE PAGE
  terminateGame() {
    this.started = false;
    this.terminated = true;
    this.ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height);
  }
  //GENERATES BLOCKS BASED ON AMOUNT OF ROWS AND COLUMNS
  prepareBlocks(totalRows, totalColumns) {
    var blocks = [];
    for (let col = 0; col < totalColumns; col++) {
      blocks[col] = [];
      for (let row = 0; row < totalRows; row++) {
        blocks[col][row] = {
          x: 0,
          y: 0,
          destroyed: false,
          health: 1
        };
      }
    }
    return blocks;
  }

  //PREPARES SOUND EFFECTS AND RETURNS BOTH OF THEM
  prepareSound() {
    const blockDestroyedSound = new Audio(explode);
    blockDestroyedSound.load();
    const victorySound = new Audio(victory);
    victorySound.load();
    const sounds = { blockDestroyedSound, victorySound };
    return sounds;
  }

  /**
   * Biggest and longest method builds the game logic alltogether.
   * Multiple variables are used throughout the whole process.
   */
  buildGameLogic() {
    //CLASS RELATED VARIABLES AND SOUND
    const board = this;
    const canvas = this.canvasNode;
    const ctx = this.ctx;
    const mode = this.mode;
    const sound = this.prepareSound().blockDestroyedSound;
    const victory = this.prepareSound().victorySound;
    //GAME AND STATS VARIABLES
    const speedMulti = this.speedMultiplier;
    let ballSize;
    let lives = 5;
    let score = 0;
    let games = 0;
    let hard = 0;
    let death = 0;
    let win = 0;
    let loss = 0;
    //MOVEMENT
    let rightArrow = false;
    let leftArrow = false;
    let dx;
    let dy;
    //ALTERING THE GAMEPLAY BASED ON MODE
    if (mode === "Difficult") {
      ballSize = 6;
      dx = 2 * speedMulti;
      dy = -2 * speedMulti;
      lives = 3;
    } else {
      ballSize = 10;
      dx = 3;
      dy = -3;
    }
    //RANDOMLY DETERMINES DIRECTION OF BALL AFTER START
    if (Math.random() * 100 < 50) {
      dx = -dx;
    }
    //GAME ELEMENTS VARIABLES
    var ballX = canvas.width / 2;
    var ballY = canvas.height - 30;
    var paddleHeight = 20;
    var paddleWidth = 120;
    var paddleX = (canvas.width - paddleWidth) / 2;
    //BLOCKS VARIABLES
    var totalRows = 10;
    var totalColumns = 5;
    var blockWidth = 69;
    var blockHeight = 25;
    var blockPadding = 10;
    var blockTopOffset = 30;
    var blockLeftOffset = 10;
    var blocks = board.prepareBlocks(totalRows, totalColumns);
    //listeners for movement action
    document.addEventListener("keydown", handleKeydown, false);
    document.addEventListener("keyup", handleKeyup, false);

    //handler for movement keydown event
    function handleKeydown(e) {
      if (e.keyCode === 39) {
        rightArrow = true;
      } else if (e.keyCode === 37) {
        leftArrow = true;
      }
    }
    //handler for movement keyup event
    function handleKeyup(e) {
      if (e.keyCode === 39) {
        rightArrow = false;
      } else if (e.keyCode === 37) {
        leftArrow = false;
      }
    }
    /**
     * Method to recognize when ball collides with a block.
     * It goes through every block if the ball "hit" one of them based on X,Y coordinates.
     * if so, the health of block decreases, if the health is 0, block is destroyed.
     * Getting score equal to amount of blocks results in winning.
     */
    function handleCollision() {
      for (var col = 0; col < totalColumns; col++) {
        for (var row = 0; row < totalRows; row++) {
          var singleBlock = blocks[col][row];
          if (!singleBlock.destroyed) {
            if (
              ballX >= singleBlock.x &&
              ballX <= singleBlock.x + blockWidth &&
              ballY >= singleBlock.y &&
              ballY <= singleBlock.y + blockHeight
            ) {
              dy = -dy;
              singleBlock.health--;
              if (singleBlock.health === 0) {
                singleBlock.destroyed = true;
                playSound();
                score++;
                if (mode === "Difficult") {
                  hard++;
                }
                if (score === totalRows * totalColumns) {
                  win++;
                  games++;
                  writeScore(score);
                  playVictory();
                  alert("YOU WIN, CONGRATS!");
                  document.location.reload();
                }
              }
            }
          }
        }
      }
    }
    //PLAYS THE EXPLOSIVE SOUND WHEN DESTROYING BLOCK
    function playSound() {
      sound.play();
    }
    //PLAYS THE VICTORY SOUND WHEN YOU WIN
    function playVictory() {
      victory.play();
    }
    //DRAWS BALL ON CANVAS
    function drawBall() {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
    //DRAWS PADDLE ON CANVAS
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.fillStyle = "silver";
      ctx.fill();
      ctx.closePath();
    }
    //DRAWS INDIVIDUAL BLOCKS
    function drawBlocks() {
      for (var col = 0; col < totalColumns; col++) {
        for (var row = 0; row < totalRows; row++) {
          if (!blocks[col][row].destroyed) {
            var blockX = row * (blockWidth + blockPadding) + blockLeftOffset;
            var blockY = col * (blockHeight + blockPadding) + blockTopOffset;
            blocks[col][row].x = blockX;
            blocks[col][row].y = blockY;
            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWidth, blockHeight);
            //coloring based on block health (durability)
            switch (blocks[col][row].health) {
              case 1:
                ctx.fillStyle = "#00b3b3";
                break;
              case 2:
                ctx.fillStyle = "yellow";
                break;
              case 3:
                ctx.fillStyle = "red";
                break;
              default:
                ctx.fillStyle = "black";
            }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
    //draws score tag in game board
    function drawScoreTag() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Game Score: " + score, canvas.width / 2 - 45, 20);
    }
    //draws mode tag in game board
    function drawMode() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      if (mode === "Difficult") {
        ctx.fillText("Mode: " + mode, 8, 20);
      } else {
        ctx.fillText("Mode: Easy", 8, 20);
      }
    }
    //draws remaining lives tag in game board
    function drawLivesTag() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }
    //writes score to localStorage
    //processes the string and integer values as the localStorage
    //keeps only string values
    function writeScore(score) {
      //TOTAL SCORE SAVING
      let scoreNow = localStorage.getItem("totalScore");
      let intScore = Number(scoreNow);
      let totalScore = score + intScore;
      totalScore = totalScore.toString();
      localStorage.setItem("totalScore", totalScore);
      //GAMES FINISHED SAVING
      let gamesNow = localStorage.getItem("gamesPlayed");
      let intGames = Number(gamesNow);
      let totalGames = games + intGames;
      totalGames = totalGames.toString();
      localStorage.setItem("gamesPlayed", totalGames);
      //HARDMODE SCORE SAVING
      let hardNow = localStorage.getItem("hardScore");
      let hardScore = Number(hardNow);
      let totalHard = hard + hardScore;
      totalHard = totalHard.toString();
      localStorage.setItem("hardScore", totalHard);
      //DEATHS AMOUNT SAVING
      let deathNow = localStorage.getItem("death");
      let intDeath = Number(deathNow);
      let totalDeath = death + intDeath;
      totalDeath = totalDeath.toString();
      localStorage.setItem("death", totalDeath);
      //WINS AMOUNT SAVING
      let winNow = localStorage.getItem("win");
      let intWin = Number(winNow);
      let totalWin = win + intWin;
      totalWin = totalWin.toString();
      localStorage.setItem("win", totalWin);
      //LOSS AMOUNT SAVING
      let lossNow = localStorage.getItem("loss");
      let intLoss = Number(lossNow);
      let totalLoss = loss + intLoss;
      totalLoss = totalLoss.toString();
      localStorage.setItem("loss", totalLoss);
    }

    /**
     * Draws the GameBoard itself with help of other drawing methods and calls handleCollision each time the requestAnimationFrame repeats the drawBoard().
     *
     */
    function drawBoard() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#006666";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawBlocks();
      drawBall();
      drawPaddle();
      drawMode();
      drawScoreTag();
      drawLivesTag();
      handleCollision();
      //sides of canvas bounce
      if (ballX + dx > canvas.width - ballSize || ballX + dx < ballSize) {
        dx = -dx;
      }
      if (ballY + dy < ballSize) {
        dy = -dy;
      } else if (ballY + dy > canvas.height - ballSize) {
        //top/bottom bounce
        if (
          //bounce happens when you are in X length of paddle
          ballX > paddleX &&
          ballX < paddleX + paddleWidth &&
          ballY + dy >= canvas.height - ballSize - paddleHeight
        ) {
          dy = -dy;
          //if so, you bounce in Y axis
        } else {
          //otherwise you lose life and death counts
          lives--;
          death++;
          if (!lives) {
            //0 lives = end of game, stats are added and written
            if (window.confirm("GAME OVER! Restart the game?")) {
              loss++;
              games++;
              writeScore(score);
              document.location.reload();
            } else {
              loss++;
              games++;
              writeScore(score);
              return;
            }
          } else {
            //if you are not out of lives, you start again and the game waits for you to start by moving left/right while stopping the game
            ballX = canvas.width / 2;
            ballY = canvas.height - 30;
            paddleX = (canvas.width - paddleWidth) / 2;
            board.started = false;
          }
        }
      }
      //movement of paddle based on left/right arrow movement
      if (rightArrow && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
      } else if (leftArrow && paddleX > 0) {
        paddleX -= 10;
      }
      //if the game has not started, game waits for you to start by pressing left/right arrow.
      if (!board.started) {
        if (rightArrow || leftArrow) {
          board.startGame();
          //this fixes the multi-life loss after dying once.
          if (mode === "Difficult") {
            dy = -2 * speedMulti;
          } else {
            dy = -3;
          }
          ballX += dx;
          ballY += dy;
        }
      } else {
        ballX += dx;
        ballY += dy;
      }
      //if the game is terminated, score is written and gameredrawing cycle is closed as not to cause trouble
      if (board.terminated) {
        writeScore(score);
        return;
      }
      requestAnimationFrame(drawBoard);
    }
    drawBoard();
  }
}
