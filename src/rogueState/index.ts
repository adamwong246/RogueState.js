import { iGame, iPlayer } from "rogueState/types";
import {
  ActorRef,
  assign,
  createMachine,
  interpret,
  Interpreter,
  spawn,
  StateMachine,
} from "xstate";

import ticTacToe from "./ticTacToe";

type DirectorEvent =
  | { type: "ADD_PLAYER"; playerName: string }
  | { type: "TICK"; tock: boolean }
  | { type: "SPEAK"; message: string }
  | { type: "GREEN_FLAG" }
  | { type: "CHECKERED_FLAG" };

// The context (extended state) of the machine
interface DirectorContext {
  time: number;
  logs: object[];
  players: any[];
}

let actor: ActorRef<any, any>;
let interpreter: Interpreter<any, any, any, any>;

const RogueFsm = {
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
              const fsm = {
                key: "Player",
                initial: "preGame",

                on: {
                  START: { target: "wait" },
                  SPEAK: {
                    actions: (context, event) => {
                      debugger
                      // interpreter.send('SPEAK', {sender: event.sender, payload: payload})
                    },
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

              const machine: StateMachine<any, any, any, any> =
                createMachine(fsm);
              actor = spawn(machine);
              interpreter = interpret(machine);
              interpreter.start();

              const newPlayer: iPlayer = {
                playerName: event.payload.playerName,
                machine,
                actor,
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
      type: "final",
    },
  },
};

const RogueStateMachine = createMachine<DirectorContext, DirectorEvent>(RogueFsm);

export default (callback) => {
  const directorActor = spawn(RogueStateMachine);
  const directorInterpreter = interpret(RogueStateMachine)
    .onStop((context, prevContext) => {
      console.log("onSend");
      console.log(" context", context);
      console.log(" prevContext", prevContext);
    })
    .onSend((context, prevContext) => {
      console.log("onSend");
      console.log(" context", context);
      console.log(" prevContext", prevContext);
    })
    .onEvent((context, prevContext) => {
      console.log("onEvent");
      console.log(" context", context);
      console.log(" prevContext", prevContext);
    })
    .onDone((context, prevContext) => {
      console.log("onDone");
      console.log(" context", context);
      console.log(" prevContext", prevContext);
    })
    .onTransition((value, context) => {
      console.log("onTransiion");
      console.log(" value", value);
      console.log(" context", context);
    })
    .onChange((context, prevContext) => {
      console.log("onChange");
      console.log(" context", context);
      console.log(" prevContext", prevContext);

      const director: iPlayer = {
        actor: directorActor,
        interpreter: directorInterpreter,
        fsm: RogueFsm,
        machine: RogueStateMachine,
        playerName: "DIRECTOR",
      };

      const gameConfig: iGame = ticTacToe();
      callback(director, gameConfig);
    });
  directorInterpreter.start();
};
