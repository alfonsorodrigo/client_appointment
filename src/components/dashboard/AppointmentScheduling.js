import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAppointmentScheduling } from "../../actions/appointment";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const AppointmentScheduling = ({
  getAppointmentScheduling,
  appointment: { appointmentscheduling, loading },
}) => {
  useEffect(() => {
    getAppointmentScheduling();
  }, [getAppointmentScheduling]);
  const appointmentscheduling_data = appointmentscheduling.map((a) => (
    <tr key={a.id} className="appointmentscheduling">
      <td>{a.pediatrician_data.name}</td>
      <td>
        <Moment format="YYYY/MM/DD">{a.time_start}</Moment>
      </td>
      <td>
        de <Moment format="HH:mm a">{a.time_start}</Moment> a{" "}
        <Moment format="HH:mm a">{a.time_finish}</Moment>
      </td>
      <td>
        <Link to={`/appointmentscheduling/${a.id}`} className="btn btn-primary">
          Agendar Cita{" "}
        </Link>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2 className="my-2">Citas Disponibles</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Pediatra</th>
                <th className="hide-sm">Fecha</th>
                <th className="hide-sm">Horario</th>
                <th />
              </tr>
            </thead>
            <tbody>{appointmentscheduling_data}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

AppointmentScheduling.propTypes = {
  getAppointmentScheduling: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  appointment: state.appointment,
});

export default connect(mapStateToProps, {
  getAppointmentScheduling,
})(AppointmentScheduling);
