import { iPlayer } from "rogueState/types";
import {
  ActorRef,
  assign,
  createMachine,
  interpret,
  Interpreter,
  spawn,
  StateMachine,
} from "xstate";

import playerFsm from "./player";

let actor: ActorRef<any, any>;
let interpreter: Interpreter<any, any, any, any>;

export default {
  id: "rogueState",
  key: "Rogue State",
  context: {
    time: 0,
    logs: [],
    players: [],
  },
  initial: "pregame",

  on: {
    SPEAK: {
      actions: assign({
        logs: (context, event) => {
          console.log("SPEAK", event);
          return context.logs.concat([
            {
              sender: event.sender,
              message: event.payload.message,
            },
          ]);
        },
      }),
    },
  },

  states: {
    pregame: {
      on: {
        GREEN_FLAG: { target: "running" },
        ADD_PLAYER: {
          target: "pregame",
          actions: assign({
            logs: (context, event) => {
              return context.logs.concat([
                {
                  sender: event.sender,
                  message: `THE DIRECTOR ADDED A PLAYER: ${event.payload.playerName}`,
                },
              ]);
            },
            players: (context, event, payload) => {

              const machine: StateMachine<any, any, any, any> =
                createMachine(playerFsm);
              actor = spawn(machine);
              interpreter = interpret(machine);
              interpreter.start();

              const newPlayer: iPlayer = {
                playerName: event.payload.playerName,
                machine,
                actor,
                interpreter,
                fsm: playerFsm,
              };

              return context.players.concat([newPlayer]);
            },
          }),
        },
      },
    },
    running: {
      on: {
        TICK: { target: "running" },
        CHECKERED_FLAG: { target: "postgame" },
      },
    },
    postgame: {
      type: "final",
    },
  },
};
