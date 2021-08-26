export default {
  ADD_PLAYER: {
    additionsToPropertiesAtMessagePayload: { playerName: { type: "string" } },
  },
  TICK: {
    additionsToPropertiesAtMessagePayload: { tock: { type: "boolean" } },
  },
  SPEAK: {
    additionsToPropertiesAtMessagePayload: { message: { type: "string" } },
  },
  GREEN_FLAG: {
    additionsToPropertiesAtMessagePayload: {},
  },
  CHECKERED_FLAG: {
    additionsToPropertiesAtMessagePayload: {},
  },
  PED_COUNTDOWN: {
    additionsToPropertiesAtMessagePayload: {},
  },
};
