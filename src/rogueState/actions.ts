export default {
  ADD_PLAYER: {
    additionsToPropertiesAtMessagePayload: { playerName: { type: "string" } },
  },
  SPEAK: {
    additionsToPropertiesAtMessagePayload: { message: { type: "string" } },
  },
  GREEN_FLAG: {
    additionsToPropertiesAtMessagePayload: {},
    director: true
  },
  START: {
    additionsToPropertiesAtMessagePayload: {},
    director: true
  },
  CHECKERED_FLAG: {
    additionsToPropertiesAtMessagePayload: {},
    director: true
  },
  // PED_COUNTDOWN: {
  //   additionsToPropertiesAtMessagePayload: {},
  // },
    // TICK: {
  //   additionsToPropertiesAtMessagePayload: { tock: { type: "boolean" } },
  // },
};
