import {
  GET_APPOINTMENT_SCHEDULE,
  ERROR_APPOINTMENT_SCHEDULE,
  GET_APPOINTMENT,
} from "../actions/types";

const initialState = {
  appointmentscheduling: [],
  appointments: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENT_SCHEDULE:
      return {
        ...state,
        appointmentscheduling: payload,
        loading: false,
      };
    case ERROR_APPOINTMENT_SCHEDULE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };
    default:
      return state;
  }
}
