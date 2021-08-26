import { iGame, iPlayer } from "rogueState/types";
import {
  createMachine,
  interpret,
  spawn,
} from "xstate";

import ticTacToe from "./ticTacToe";

import RogueFsm from "./fsms/director";

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
