import React, { Component } from "react";
import { connect } from "react-redux";
import Cargando from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comentarios from "./Comentarios";

import * as usuariosActions from "../../actions/usuariosActions";
import * as publicacionesActions from "../../actions/publicacionesActions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
} = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: {
        params: { key },
      },
    } = this.props;

    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }

    if (this.props.usuariosReducer.error) {
      return;
    }

    if (!("publicaciones_key" in this.props.usuariosReducer.usuarios[key])) {
      publicacionesTraerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { key },
      },
    } = this.props;

    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }

    if (usuariosReducer.usuarios.length <= 0 || usuariosReducer.cargando) {
      return <Cargando />;
    }

    const nombre = usuariosReducer.usuarios[key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key },
      },
    } = this.props;

    if (!usuarios.length) return;
    if (usuariosReducer.error) return;

    if (publicacionesReducer.cargando) {
      return <Cargando></Cargando>;
    }

    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error}></Fatal>;
    }

    if (!publicaciones.length) return;
    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    );
  };

  mostrarInfo = (publicaciones, pub_key) => {
    return publicaciones.map((publicacion, com_key) => (
      <div
        className="pub_titulo"
        key={publicacion.id}
        onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {publicacion.abierto ? <Comentarios comentarios={publicacion.comentarios}/> : ""}
      </div>
    ));
  };

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    if(!comentarios.length){
      this.props.traerComentarios(pub_key, com_key);
    }
  }

  render() {
    return (
      <div>
        {this.props.match.params.key}
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const stateMapToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer,
  };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios
};

export default connect(stateMapToProps, mapDispatchToProps)(Publicaciones);
