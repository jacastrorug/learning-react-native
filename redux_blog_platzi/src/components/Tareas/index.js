import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

import * as tareasActions from "../../actions/tareasActions";

class Tareas extends React.Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  componentDidUpdate() {
    const { tareas, cargando, traerTodas } = this.props;
    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
      console.log(this.props);
    }
  }

  mostratContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) {
      return <Spinner></Spinner>;
    }

    if (error) {
      return <Fatal mensaje={error}></Fatal>;
    }

    return Object.keys(tareas).map((userId) => {
      return (
        <div key={userId}>
          <h2>Usuario {userId}</h2>
          <div className="contenedor_tareas">{this.ponerTareas(userId)}</div>
        </div>
      );
    });
  };

  ponerTareas = (userId) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const tarea = {
      ...tareas[userId],
    };

    return Object.keys(tarea).map((tarId) => {
      return (
        <div key={tarId}>
          <input
            type="checkbox"
            defaultChecked={tarea[tarId].completed}
            onChange={() => cambioCheck(userId, tarId)}
          />
          ,{tarea[tarId].title}
          <button className="m_left">
            <Link to={`/tareas/guardar/${userId}/${tarId}`}>Editar</Link>
          </button>
          <button onClick={() => eliminar(tarId)} className="m_left">
            Borrar
          </button>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <button>
          <Link to="/tareas/guardar">Agregar</Link>
        </button>
        {this.mostratContenido()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.tareasReducer;
};

export default connect(mapStateToProps, tareasActions)(Tareas);
