import { STATE_TEST } from "./actions";

const initialState = {
  testState: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STATE_TEST:
      return {
        ...state,
        testState: action.payload,
      };
    default:
      return state;
  }
};
