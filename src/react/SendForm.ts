import { Component, createElement } from "react";
import Form from "@rjsf/core";
import { iPlayer, iDirector } from "rogueState/types";
import actions from "../rogueState/actions";

const deps = (
  a: string,
  b: { additionsToPropertiesAtMessagePayload: object }
) => {
  const oneOf = Object.keys(b).map((k, ndx) => {
    return {
      properties: {
        [a]: {
          enum: [k],
        },
        messagePayload: {
          properties: b[k]?.additionsToPropertiesAtMessagePayload,
        },
      },
      ...b[k]?.additionsToSchema,
    };
  });

  return {
    dependencies: {
      [a]: { oneOf },
    },
  };
};

export default class extends Component<
  {
    player: iPlayer;
    director: iDirector;
  },
  {}
> {
  constructor(props) {
    super(props);
  }

  makeSchema(nextEvents: string[]) {
    const depOptions = {};
    nextEvents.forEach((e) => (depOptions[e] = actions[e]));

    return {
      title: "Send a message to the DM",
      type: "object",
      required: ["messageType", "messagePayload"],

      properties: {
        messageType: { type: "string", enum: nextEvents },
        messagePayload: {},
      },

      ...deps("messageType", depOptions),
    };
  }

  activateActor(formdata: { messageType: string; messagePayload: object }) {
    const player: iPlayer = this.props.player;
    const director: iDirector = this.props.director;
    director.interpreter.send(formdata.messageType, {
      payload: formdata.messagePayload,
      sender: player.machine.id,
    });
  }

  render() {
    const player: iPlayer = this.props.player;

    return createElement(Form, {
      onSubmit: (e) => {
        this.activateActor(
          e.formData as { messageType: string; messagePayload: object }
        );
      },

      schema: this.makeSchema(
        player.interpreter.state.nextEvents
      ),
    });
  }
}

// const ADD_PLAYER = "ADD_PLAYER";
// const TICK = "TICK";
// const SPEAK = "SPEAK";
// const GREEN_FLAG = "GREEN_FLAG";
// const CHECKERED_FLAG = "CHECKERED_FLAG";

// const dependents = {
//   ADD_PLAYER: {
//     additionsToPropertiesAtMessagePayload: { playerName: { type: "string" } },
//   },
//   // TICK: {
//   //   additionsToPropertiesAtMessagePayload: { tock: { type: "boolean" } },
//   // },
//   SPEAK: {
//     additionsToPropertiesAtMessagePayload: { message: { type: "string" } },
//   },
//   // GREEN_FLAG: {
//   //   additionsToPropertiesAtMessagePayload: {},
//   // },
//   // CHECKERED_FLAG: {
//   //   additionsToPropertiesAtMessagePayload: {},
//   // },
//   // PED_COUNTDOWN: {
//   //   additionsToPropertiesAtMessagePayload: {},
//   // },
// };
