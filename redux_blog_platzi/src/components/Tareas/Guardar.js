import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

import * as tareasActions from "../../actions/tareasActions";

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { userId, tarId },
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo,
      limpiarForma,
    } = this.props;

    if (userId && tarId) {
      const tarea = tareas[userId][tarId];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    } else {
      limpiarForma();
    }
  }

  cambioUsuarioId = (event) => {
    this.props.cambioUsuarioId(event.target.value);
  };

  cambioTitulo = (event) => {
    this.props.cambioTitulo(event.target.value);
  };

  guardar = () => {
    const {
      match: {
        params: { userId, tarId },
      },
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar,
    } = this.props;

    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    };

    if (userId && tarId) {
      const tarea = tareas[userId][tarId];
      const tareaEditada = {
        ...nuevaTarea,
        completed: tarea.completed,
        id: tarea.id,
      };
      editar(tareaEditada);
    } else {
      agregar(nuevaTarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) return true;

    if (!usuario_id || !titulo) return true;

    return false;
  };

  mostrarAccion = () => {
    const { cargando, error } = this.props;

    if (cargando) return <Spinner />;

    if (error) return <Fatal mensaje={error} />;
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br />
        <br />
        Titulo:
        <input value={this.props.titulo} onChange={this.cambioTitulo} />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
