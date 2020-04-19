import React from "react";
import { connect } from "react-redux";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

const Comentarios = (props) => {

  if (props.com_cargando && !props.comentarios.length) {
    return <Spinner />;
  }

  if (props.com_error && !props.comentarios.length) {
    return <Fatal mensaje={props.com_error} />;
  }

  const ponerComentarios = () =>
    props.comentarios.map((comentario) => (
      <li key={comentario.id}>
        <b>
          <u>comentario.email</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));

  return <ul>{ponerComentarios()}</ul>;
};

const mapStateToProps = (reducers) => {
  return reducers.publicacionesReducer;
};

export default connect(mapStateToProps)(Comentarios);
