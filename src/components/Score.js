import React, { Component } from "react";

export default class Score extends Component {
  // RENDERS THE SCOREBOARD
  render() {
    return (
      <main>
        <section>
          <h1>Your Bouncy statistics</h1>
          <p>
            Hello {localStorage.getItem("profileName")}, this page contains your
            statistics in the game. If your stats do not update, try reloading
            the page.
          </p>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total score</td>
                <td>{localStorage.getItem("totalScore")}</td>
              </tr>
              <tr>
                <td>Games finished</td>
                <td>{localStorage.getItem("gamesPlayed")}</td>
              </tr>
              <tr>
                <td>Hard score</td>
                <td>{localStorage.getItem("hardScore")}</td>
              </tr>
              <tr>
                <td>Deaths</td>
                <td>{localStorage.getItem("death")}</td>
              </tr>
              <tr>
                <td>Wins</td>
                <td>{localStorage.getItem("win")}</td>
              </tr>
              <tr>
                <td>Loses</td>
                <td>{localStorage.getItem("loss")}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}
