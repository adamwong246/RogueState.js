import { Component, createElement } from "react";
import { iPlayer, iGame } from "rogueState/types";

import AboutPage from "./About";
import FsmPage from "./FsmPage";

import { MenuItem } from "./Menu";
import PlayerPage from "./PlayerPage";

class App extends Component<
  {
    director: iPlayer;
    game: iGame;
  },
  {
    tab: string;
  }
> {
  constructor(props) {
    super(props);
    this.state = { tab: MenuItem.about };
  }

  render() {
    return createElement("div", { id: "main-container" }, [
      createElement(
        "nav",
        {
          style: {
            textAlign: 'center'
          }
        },
        createElement(
          "pre",
          {},
          createElement(
            "a",
            {
              href: "https://adamwong246.github.io/blog/47-RogueStatejs-v001/",
            },
            "RogueState.js"
          )
        ),
        createElement("hr", {}),

        createElement(
          "button",
          { onClick: () => this.setState({ tab: MenuItem.about }) },
          "about"
        ),
        createElement(
          "button",
          { onClick: () => this.setState({ tab: MenuItem.log }) },
          "Logs"
        ),
        createElement("button", {
          onClick: () => this.setState({ tab: MenuItem.director }),
        }, "Director"),
        
        createElement("button", {
          onClick: () => this.setState({ tab: MenuItem.game }),
        }, "Game"),


        createElement('hr', {}),
        createElement(
          "ul",
          {},
          ...this.props.director.interpreter.state.context.players.map(
            (player: iPlayer) => {
              return createElement(
                "li",
                {},
                createElement(
                  "button",
                  {
                    onClick: (e) => this.setState({ tab: player.actor.id }),
                  },
                  `#${player.actor.id} aka ${player.playerName}`
                )
              );
            }
          )
        )
      ),
      createElement(
        "main",
        {},

        this.state.tab === MenuItem.about && createElement(AboutPage, {}),

        this.state.tab === MenuItem.director &&
          createElement(PlayerPage, {
            player: this.props.director,
          }),

        this.state.tab === MenuItem.game &&
          createElement('div', {},
            createElement('h1', {}, this.props.game.name),
            createElement('h2', {}, this.props.game.description),
            createElement('h3', {}, `Number of players: ${this.props.game.numberOfPlayers}`),

            createElement(FsmPage, {
              fsm: this.props.game.fsm,
            }),

            createElement('pre', {}, JSON.stringify(this.props.game.machine))
          ),

        this.state.tab === MenuItem.log &&
          createElement(
            "div",
            {},

            createElement("h2", {}, "Logs"),

            createElement(
              "ol",
              {},
              this.props.director.interpreter.state.context.logs.map((log) => {
                return createElement(
                  "li",
                  {},
                  createElement("pre", {}, `${log.sender}: "${log.message}"`)
                );
              })
            )
          ),

        this.props.director.interpreter.state.context.players
          .filter((player) => player.actor.id === this.state.tab)
          .map((player: iPlayer) => {
            return createElement(PlayerPage, {
              player,
            });
          })
      ),
    ]);
  }
}

export default App;
