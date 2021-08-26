import { Component, createElement } from "react";

import { iPlayer } from "rogueState/types";
import ContextPage from "./ContextPage";
import FsmPage from "./FsmPage";
import SendForm from "./SendForm";
import StatePage from "./StatePage";

export default class extends Component<
  {
    player: iPlayer
  },
  {
    tab: string
  }
> {
  constructor(props) {
    super(props);
    this.state = { tab: 'context' };
  }
  componentDidMount() {
  }

  render() {
    
    return createElement(
      "div",
      {},

        createElement(
          "button",
          {
            onClick: (e) => this.setState({ tab: "state" }),
          },
          "state"
        ),

        createElement(
          "button",
          {
            onClick: (e) => this.setState({ tab: "fsm" }),
          },
          "fsm"
        ),
      
        createElement(
          "button",
          {
            onClick: (e) => this.setState({ tab: "send" }),
          },
          "send"
      ),

      this.state.tab === "context" &&
        createElement(ContextPage, {
          extendedState: this.props.player.interpreter.state.context,
        }),

      this.state.tab === "state" &&
        createElement(StatePage, {
          finiteState: this.props.player.interpreter.state.value
        }),

      this.state.tab === "fsm" &&
        createElement(FsmPage, {
          fsm: this.props.player.fsm,
        }),

      this.state.tab === "send" &&
        createElement(
          SendForm,
          {
            player: this.props.player,
          },
          []
        )
    );
  }
}
