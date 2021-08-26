import React from "react";
import ReactDOM from "react-dom";

import ReactApp from "./react/App.ts";
import RogueState from "./rogueState/index";

document.addEventListener("DOMContentLoaded", (event) => {
  RogueState((director, game) => {
    ReactDOM.render(
      React.createElement(
        ReactApp, {
          director,
          game
        }
      ),
      document.getElementById("root")
    );
  });
});