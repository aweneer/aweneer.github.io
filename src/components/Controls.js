import React, { Component } from "react";

/**
 * This component contains elemnets of Controls page
 * It allows to control whether the background music plays or not
 */
export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: false
    };
  }
  //on click of button switches music variable value
  onChange(field) {
    return event => {
      this.setState({
        [field]: !this.state[field]
      });
    };
  }

  //on submit stops/plays the music
  onSubmit() {
    let music = document.getElementById("music");
    if (music) {
      if (!music.paused) {
        music.pause();
      } else {
        music.play();
      }
    }
  }

  //renders two sectons, Controls describing how to play and Music switch
  render() {
    return (
      <main>
        <section>
          <h1>Controls</h1>
          <p>
            BouncyBall has very easy controls. All you need to do is create your
            profile and then you can click the PLAY button in navigation. Once
            the game loads, you will start the game by pressing attempting to
            move. Moving the platform is done by <code>Left</code> and{" "}
            <code>Right</code> arrow keys.
          </p>
        </section>
        <section>
          <h1>Background music switch</h1>
          <button onClick={this.onSubmit}>Play/Pause music</button>
        </section>
      </main>
    );
  }
}
