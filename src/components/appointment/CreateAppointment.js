import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { create_appointment } from "../../actions/auth";

const CreateAppointment = ({
  create_appointment,
  auth: { user, loading },
  match,
  history,
}) => {
  useEffect(() => {
    setFormData({
      id: match.params.id,
      user: user ? user.id : null,
    });
  }, [loading, user, match]);

  const [formData, setFormData] = useState({
    comments: "",
    id: "",
    user: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    create_appointment(formData, history);
  };
  const { comments } = formData;
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Agendar Cita</h1>
      <p className="lead">
        <i className="fas fa-pump-medical"></i> Su solicitud de guardará en
        nuestras bases de datos
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            required
            type="text"
            placeholder="Escriba sus comentarios"
            name="comments"
            value={comments}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">Escriba sus comentarios</small>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          value="Solicitar Cita"
        />
        <Link className="btn btn-light my-1" to="/dashboard">
          Regresar
        </Link>
      </form>
    </Fragment>
  );
};

CreateAppointment.propTypes = {
  create_appointment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { create_appointment })(
  withRouter(CreateAppointment)
);
