import { Component, createElement } from "react";

export default class extends Component<any, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }

  render() {
    return createElement("div", {}, [
      createElement("pre", {},
`# README

RogueState.ts is an experimental Typescript rogue-ish game engine and multiplayer server/client. It's hallmark is the use of Finite State Machine (FSMs), which it employs in many ways.

1) RogueState.ts - The Game Engine. A FSM which handles the loading of games acts as a multiplayer server

2) unititledRogueClone.js -  A hypothetical game implemented with xstate.js FSMs, plus the appropriate "hooks". When loaded into RogueState.ts, it produces a rogue-like multiplayer turn-based game.

3) unititledRogueClone/levels/first.json - a hypothetical level/dungeon/content for the unititledRogueClone game

4) Actors - Players are also represented as FSMs
4.a) Director  - the DM. The Actor FSM
4.b) Players   - each Player is an Actor FSM

5) Run-time moves - at it's most abstract, RogueState.ts allows users to submit moves, at run-time, which are themselves FSMs, __effectivelly allowing players to create their own the state machines on the fly.__

## Technologies

- 'xstate.js' - finite state machine
- 'rot.js'    - utlities
- 'react.js'  - view
- 'json-schema'  - data validation, form generation

### constraints
- every game has 1 Director, an Actor, and many Players, (multiple Actors).
- all Actors can chat with each other in the "log" page

## Caveats

This is all experimental. Once I work out the basics, project will be split in server/clients but for now, just do it all on 1 page.
      `)
    ]);
  }
};

// ## Game loop

// RogueState is designed to be run both real-time and turn-based games. When in "turn-based" mode, the FMS will wait for a response from every player before increasing the GameClock. In "real-time" mode, the FMS will NOT wait for a response, increasing the GameClock as fast as possible.

// ## Actors

// ### Director (server)

// Responsible for creating the game, gathering Moves from Players, incrementing the clock either real-time or turn-based.

// ### Player (client)

// Player Actors are clients connecting to a game. They submit sets of Moves.

// ## Player Roles
// - god mode    - limited only by the limits of the model
// - normal mode - limited by the limits of the game 