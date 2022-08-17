import axios from "axios";

export const STATE_TEST = "STATE_TEST";

export const stateTest = () => {
  return (dispatch) => {
    console.log("Soy la action prueba");
    dispatch({
      type: STATE_TEST,
      payload: { m: "llegué al state" },
    });
  };
};
