import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR
} from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};

    respuesta.data.map(
      (tarea) =>
        (tareas[tarea.userId] = {
          ...tareas[tarea.userId],
          [tarea.id]: { ...tarea },
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Información de tareas no disponible",
    });
  }
};

export const cambioUsuarioId = (usuarioId) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuarioId,
  });
};

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo,
  });
};

export const agregar = (nuevaTarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nuevaTarea
    );

    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se pudo subir la nueva tarea",
    });
  }
};

export const editar = (tareaEditada) => async(dispatch) => {
  dispatch({
    type: CARGANDO,
  });

  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tareaEditada.id}`,
      tareaEditada
    );

    dispatch({
      type: GUARDAR,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "No se pudo actualizar la nueva tarea",
    });
  }
};

export const cambioCheck = (userId, tarId) => (dispatch, getState) => {
  const {tareas} = getState().tareasReducer;
  const tareaSeleccionada = tareas[userId][tarId];

  const actualizadas = {
    ...tareas,
  };
  actualizadas[userId] = {
    ...tareas[userId],
  }
  actualizadas[userId][tarId] = {
    ...tareas[userId][tarId],
    completed: !tareaSeleccionada.completed
  }

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas
  })

};

export const eliminar = (tarId) => async(dispatch) => {

  dispatch({
    type: CARGANDO
  });

  try{
    const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tarId}`);
    dispatch({
      type: TRAER_TODAS,
      payload: {}
    });

  }catch(error){
    dispatch({
      type: ERROR,
      payload: "La tarea no pudo ser eliminada"
    });
  }

};

export const limpiarForma = () => (dispatch) => {
  dispatch({
    type: LIMPIAR
  });
}
