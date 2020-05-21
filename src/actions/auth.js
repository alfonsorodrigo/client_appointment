import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/service/user/me/");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/service/user/create/", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(login(email, password));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      errors.email.forEach((error) => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/service/user/token/", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      errors.non_field_errors.forEach((error) =>
        dispatch(setAlert(error, "danger"))
      );
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Create Appointment
export const create_appointment = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { id, comments, user } = formData;
  const body = JSON.stringify({
    appointment_scheduling: id,
    comments: comments,
    user: user,
  });
  try {
    await axios.post(`/api/service/appointment/`, body, config);
    dispatch(loadUser());
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      if (err.response.status !== 404) {
        errors.non_field_errors.forEach((error) =>
          dispatch(setAlert(error, "danger"))
        );
      } else {
        dispatch(setAlert("Not found.", "danger"));
      }
    }
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
