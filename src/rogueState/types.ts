import { ActorRef, StateMachine, Interpreter } from "xstate";

export interface iFsmEntity {
  fsm: object;
  machine: StateMachine<any, any, any, any>;
  // interpreter: Interpreter<any>;
}

export interface iDirector extends iFsmEntity{
  interpreter: Interpreter<any>;
}

export interface iPlayer extends iFsmEntity{
  // actor: ActorRef<any, any>;
  interpreter: Interpreter<any>;
}

export interface iGame {
  description: string;
  fsm: object;
  machine: any;
  name: string;
  numberOfPlayers: number;
}
