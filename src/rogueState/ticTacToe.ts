import { createMachine, assign } from "xstate";
import { iGame } from "./types";

enum marker {
  X,
  Y,
  _,
}

interface BoardContext {
  board: marker[][];
}

const initialContext: BoardContext = {
  board: [
    [marker._, marker._, marker._],
    [marker._, marker._, marker._],
    [marker._, marker._, marker._],
  ],
};

const fsm = {
  id: "ticTacToe",
  initial: "setup",
  states: {
    setup: {
      on: {
        BEGIN: { target: "awaitX" },
      },
    },

    awaitX: {
      on: {
        SUBMIT_X: { target: "checkX" },
      },
    },

    checkX: {
      on: {
        GAME_OVER: {target: 'gameOver'},
        CONTINUE: {target: 'awaitY'}
      }
    },

    awaitY: {
      on: {
        SUBMIT_Y: { target: "checkY" },
      },
    },
    

    checkY: {
      on:{
        GAME_OVER: {target: 'gameOver'},
        CONTINUE: {target: 'awaitX'}
      }
    },

    gameOver: {
      type: 'final'
    },

  },
};

const ticTacToeMachine: iGame = {
  name: "TicTacToe",
  description: "Also known as 'Cross and Naughts'",
  numberOfPlayers: 2,
  machine: createMachine(fsm),
  fsm
};

export default () => ticTacToeMachine;
