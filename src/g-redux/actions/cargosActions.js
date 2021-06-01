import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                               LISTAR

export function listCargosAction(){
    return async (dispatch) => {
        dispatch( listCargos() );
        try {
            const respuesta = await clienteAxios.get('/api/cargo',{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            //console.log(respuesta.data);
            dispatch( listCargosSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( listCargosError() )
       } 
   }
}
const listCargos = () => ({
   type: constant.LIST_CARGO, 
   payload: true
}); 
const listCargosSuccess = cargos => ({
   type: constant.LIST_CARGO_SUCCESS,
   payload: cargos
});
const listCargosError = () => ({
   type: constant.LIST_CARGO_ERROR, 
   payload: true
});  