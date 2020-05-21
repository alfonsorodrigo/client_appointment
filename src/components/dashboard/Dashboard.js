import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import AppointmentScheduling from "./AppointmentScheduling";
import Moment from "react-moment";
import { getAppointment } from "../../actions/appointment";

const Dashboard = ({
  getAppointment,
  appointment: { appointments },
  auth: { user },
}) => {
  useEffect(() => {
    getAppointment();
  }, [getAppointment]);
  const appointments_data = appointments.map((a) => (
    <tr key={a.id} className="appointmentscheduling">
      <td>{a.appointment_scheduling_data.pediatrician_data.name}</td>
      <td>
        <Moment format="YYYY/MM/DD">
          {a.appointment_scheduling_data.time_start}
        </Moment>
      </td>
      <td>
        de{" "}
        <Moment format="HH:mm a">
          {a.appointment_scheduling_data.time_start}
        </Moment>{" "}
        a{" "}
        <Moment format="HH:mm a">
          {a.appointment_scheduling_data.time_finish}
        </Moment>
      </td>
    </tr>
  ));

  return user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Welcome {user && user.email}
      </p>
      <AppointmentScheduling />

      <h2 className="my-2">Citas Confirmadas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Pediatra</th>
            <th className="hide-sm">Fecha</th>
            <th className="hide-sm">Horario</th>
          </tr>
        </thead>
        <tbody>{appointments_data}</tbody>
      </table>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  appointment: state.appointment,
});

export default connect(mapStateToProps, { getAppointment })(Dashboard);
