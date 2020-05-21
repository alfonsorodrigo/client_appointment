import axios from "axios";
import {
  GET_APPOINTMENT_SCHEDULE,
  ERROR_APPOINTMENT_SCHEDULE,
  GET_APPOINTMENT,
  ERROR_APPOINTMENT,
} from "./types";

// Get AppointmentScheduling
export const getAppointmentScheduling = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/service/appointmentscheduling/");
    dispatch({
      type: GET_APPOINTMENT_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_APPOINTMENT_SCHEDULE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Appointment
export const getAppointment = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/service/appointment/");
    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_APPOINTMENT,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
