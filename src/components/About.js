import React, { Component } from "react";

/**
 * This component contains elements of About page.
 * It renders three sections, Description of the game, Documentation links and Used content
 */
export default class About extends Component {
  render() {
    return (
      <main>
        <section>
          <h1>About BouncyBall</h1>
          <h3>Description</h3>
          <p>
            BouncyBall is a very simple game based on legendary arcade game
            Arkanoid.
          </p>
        </section>
        <section>
          <h3>Documentation and source code</h3>
          <p>
            Documentation and code is available at&nbsp;<a href="https://github.com/honza999/honza999.github.io">
              link
            </a>
          </p>
        </section>
        <section>
          <h3>Used content</h3>
          <p>
            <h4>Background Music</h4>'Spaghetti Guitar In Space' created by and
            available at&nbsp;
            <a href="http://www.freesfx.co.uk">http://www.freesfx.co.uk</a>
          </p>
          <p>
            <h4>Sound effects</h4>'Ta Da Sound' created by 'Alexander'<br />Available
            at&nbsp;
            <a href="http://www.orangefreesounds.com/ta-da-sound/">
              http://www.orangefreesounds.com/ta-da-sound/
            </a>
          </p>
          <p>
            'Explosion 1' sound effect created by 'Partners In Rhyme'<br />
            Available at&nbsp;
            <a href="https://www.freesoundeffects.com/free-track/explosion-1-466446/">
              https://www.freesoundeffects.com/free-track/explosion-1-466446/
            </a>
          </p>
        </section>
      </main>
    );
  }
}
