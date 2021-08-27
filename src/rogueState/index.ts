// SFSMES
// Super Finite State Machine Entertainment System

import { iGame, iPlayer, iDirector } from "rogueState/types";
import { createMachine, interpret, spawn } from "xstate";

import ticTacToe from "./ticTacToe";

import RogueFsmMaker from "./fsms/director";

const { RogueStateMachine, RogueFsm } = RogueFsmMaker();

export default (callback) => {
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

      const director: iDirector = {
        interpreter: directorInterpreter,
        fsm: RogueFsm,
        machine: RogueStateMachine,
      };

      const gameConfig: iGame = ticTacToe();
      callback(director, gameConfig);
    });
  directorInterpreter.start();
};
