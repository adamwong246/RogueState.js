import { iPlayer } from "rogueState/types";
import {
  ActorRef,
  assign,
  createMachine,
  interpret,
  Interpreter,
  Machine,
  MachineConfig,
  spawn,
  StateMachine,
} from "xstate";

import playerFsm_er from "./player";

const playerFsm: MachineConfig<any, any, any> = playerFsm_er();

type DirectorEvent =
  | { type: "ADD_PLAYER"; playerName: string }
  | { type: "TICK"; tock: boolean }
  | { type: "SPEAK"; message: string }
  | { type: "GREEN_FLAG" }
  | { type: "CHECKERED_FLAG" };

interface DirectorContext {
  time: number;
  logs: object[];
  players: any[];
}

const fsm = {
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
        logs: (context: DirectorContext, event) => {
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
            logs: (context: DirectorContext, event) => {
              return context.logs.concat([
                {
                  sender: event.sender,
                  message: `THE DIRECTOR ADDED A PLAYER: ${event.payload.playerName}`,
                },
              ]);
            },

            players: (context, event, payload) => {

              const fsm = {
                ...playerFsm,
                key: event.payload.playerName
              };


              const machine: StateMachine<any, any, any, any> =
                createMachine(fsm, {});
              
              machine.parent = directorMachine;

              const interpreter: Interpreter<any, any, any, any> = interpret(
                machine
              ).onChange((context, prevContext) => {
                console.log("mark!");
              }).start();

              const newPlayer: iPlayer = {
                machine,
                interpreter,
                fsm,
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
      // type: "final",
    },
  },
};

const directorMachine = createMachine<DirectorContext, DirectorEvent>(fsm);

export default () => {
  return {
    RogueStateMachine: directorMachine,
    RogueFsm: fsm,
  };
};
