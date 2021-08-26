import actions from "./actions";

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

export default (nextEvents: string[]) => {
  const depOptions: { additionsToPropertiesAtMessagePayload: object; } = {additionsToPropertiesAtMessagePayload: {}};
  nextEvents.forEach((e) => (depOptions[e] = actions[e]));

  const schema = {
    title: "Make your move",
    type: "object",
    required: ["messageType", "messagePayload"],

    properties: {
      messageType: { type: "string", enum: nextEvents },
      messagePayload: {},
    },

    ...deps("messageType", depOptions),
  };

  return schema;
}
