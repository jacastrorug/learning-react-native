import axios from "axios";
import { TRAER_TODOS, CARGANDO, ERROR } from "../types/usuariosTypes";

export const traerTodos = () => {
  return async function (dispatch) {
    dispatch({
        type: CARGANDO
    });

    try {
      const respuesta = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      dispatch({
        type: TRAER_TODOS,
        payload: respuesta.data,
      });
    } catch (error) {
        dispatch({
          type: ERROR,
          payload: "Información de usuarios no disponible"
        });
    }
  };
};
