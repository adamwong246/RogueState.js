import { sendParent } from "xstate";

export default {
  key: "Player",
  initial: "preGame",

  on: {
    START: { target: "wait" },
    SPEAK: {
      actions: sendParent((ctx, event) => {
        return {
          type: "SPEAK",
          data: {
            ...event.data,
            sender: 22
          },
        };
      }),
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
