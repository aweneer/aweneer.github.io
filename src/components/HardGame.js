import React, { Component } from "react";
import DifficultGameBoard from "../gamelogic/DifficultGameBoard";

//component that is used as a controller for gameboard (canvas)
export default class HardGame extends Component {
  constructor(props) {
    super(props);
    this.board = React.createRef();
    this.controller = null;
  }

  //AFTER PAGELOAD creates controller of the GameBoard canvas and builds/starts the game
  componentDidMount() {
    this.controller = new DifficultGameBoard(this.board.current, 4);
    this.controller.buildGameLogic();
  }

  //AFTER LEAVING PAGE terminates the game so it doesn't run in background
  componentWillUnmount() {
    if (this.controller) {
      this.controller.terminateGame();
    }
  }
  // renders canvas and a link to other mode
  render() {
    return (
      <main>
        <section>
          <a class="easy" href="/game">
            TOO DIFFICULT? GO BACK
          </a>
        </section>
        <section>
          <canvas ref={this.board} id="gameBoard" width="800" height="600" />
        </section>
      </main>
    );
  }
}
