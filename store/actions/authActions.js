import axios from "axios";
import { url } from "../../api";

export const signUp = (user) => {
  return (dispatch, getState) => {
    axios
      .post(`${url}/create-user.php`, user)
      .then((data) => {
        dispatch({
          type: "SIGN_UP",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const signIn = (user) => {
  return (dispatch, getState) => {
    axios
      .post(`${url}/login-user.php`, user)
      .then((user) => {
        dispatch({
          type: "SIGN_IN",
          user: user.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
