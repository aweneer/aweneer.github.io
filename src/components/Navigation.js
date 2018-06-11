import React from "react";
import { Link, withRouter } from "react-router-dom";

//function component that returns a navigation menu, contains React Router for creation of the links
const Navigation = ({ location }) => {
  //changes address bar code from PLAY to game to ensure link shows PLAY, but clicking on it redirects to /game
  function changeRouteTitle(route) {
    if (route === "PLAY") {
      return (route = "game");
    } else {
      return route;
    }
  }

  return (
    <nav>
      <ul>
        {["profile", "score", "PLAY", "controls", "about"].map(route => (
          <li key={route}>
            <Link
              className={
                location.pathname.includes(route) ? "active" : undefined
              }
              to={changeRouteTitle(route)}
            >
              {`${route[0].toUpperCase()}${route.slice(1)}`}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
