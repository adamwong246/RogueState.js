import { ActorRef, StateMachine, Interpreter } from "xstate";

export interface iPlayer {
  fsm: object;
  interpreter: Interpreter<any>;
  machine: StateMachine<any, any, any, any>;
}

export interface iGame {
  description: string;
  fsm: object;
  machine: any;
  name: string;
  numberOfPlayers: number;
}
