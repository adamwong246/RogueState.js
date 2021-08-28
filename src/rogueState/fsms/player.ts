import { sendParent, send, MachineConfig } from "xstate";

let playerFsm: MachineConfig<any, any, any> = {
  key: "Player",
  initial: "preGame",

  on: {
    SPEAK: {
      actions: sendParent((ctx, vnt) => {
        return {
          type: "SPEAK",
          data: event.data,
        };
      }),
    },
  },

  states: {
    preGame: {
      on: {
        GREEN_FLAG: { target: "wait" },
      },
    },

    wait: {
      on: {
        MY_MOVE: { target: "moving" },
        GAME_OVER: { target: "postGame" },
      },
    },
    moving: {
      on: {
        YOUR_MOVE: { target: "wait" },
      },
    },

    postGame: {},
  },
};

export default () => playerFsm;
