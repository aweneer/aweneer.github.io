import React, { Component } from "react";

/**
 * Footer component, renders footer element with author email and name
 */
export default class Profile extends Component {
  render() {
    return (
      <footer>
        <p>
          BouncyBall created in 2018 by
          <a className="footerLink" href="mailto:hlavaj28@fel.cvut.cz">
            Jan Hlaváč
          </a>for FEL ČVUT
        </p>
      </footer>
    );
  }
}
