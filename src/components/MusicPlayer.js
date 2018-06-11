import React, { Component } from "react";

/**
 * Component rendering HTML5 audio element for background music
 */
export default class MusicPlayer extends Component {
  render() {
    return (
      <audio
        id="music"
        controls
        autoPlay
        loop
        preload="auto"
        src="http://www.freesfx.co.uk/rx2/mp3s/5/17658_1462196944.mp3"
      />
    );
  }
}
