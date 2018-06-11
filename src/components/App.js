import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "../css/style.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Score from "./Score";
import Game from "./Game";
import Controls from "./Controls";
import About from "./About";
import Footer from "./Footer";
import OfflineCheck from "./OfflineCheck";
import MusicPlayer from "./MusicPlayer";
import HardGame from "./HardGame";

/**
 * Main App component, Uses BrowserRouter to handle history and calls all underlying Components to render.
 */
class App extends Component {
  userProfile;
  gamePage;

  //Checks if profileName exists in localStorage, if not client cannot access Score, Profile or Game pages without creating profile
  profileExists() {
    return localStorage.getItem("profileName");
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navigation />
          <Route path="/profile" component={Profile} />
          <Route
            path="/score"
            render={props =>
              this.profileExists() ? <Score /> : <Redirect to="/profile" />
            }
          />
          <Route
            path="/game"
            render={props =>
              this.profileExists() ? <Game /> : <Redirect to="/profile" />
            }
          />
          <Route path="/controls" component={Controls} />
          <Route path="/about" component={About} />
          <Route path="/hard" component={HardGame} />

          <OfflineCheck />
          <MusicPlayer />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
