import { sendParent, send, MachineConfig } from "xstate";

let playerFsm: MachineConfig<any, any, any> = {
  key: "Player",
  initial: "preGame",

  on: {
    START: { target: "wait" },
    SPEAK: {
      actions: sendParent((ctx, vnt) => {
        return {
          type: "SPEAK",
          // target: ".interpreter",
          data: event.data,
        };
      }),

      // actions: sendParent((ctx, event) => {
      //   return {
      //     type: "SPEAK",
      //     data: {
      //       ...event.data,
      //       sender: 22
      //     },
      //   };
      // }),

      // actions: send((ctx, event) => {
      //   // actor.send({type:'SPEAK', payload:{sender: event.sender, payload: payload}});
      //   // interpreter.send('SPEAK', {sender: event.sender, payload: payload})
      // },
    },
  },

  states: {
    preGame: {},

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
