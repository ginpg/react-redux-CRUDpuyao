import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                               LISTAR

export function listDepartamentosAction(){
    return async (dispatch) => {
        dispatch( listDepartamentos() );
        try {
            const respuesta = await clienteAxios.get('/departamento',{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            //console.log(respuesta.data);
            dispatch( listDepartamentosSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( listDepartamentosError() )
       } 
   }
}
const listDepartamentos = () => ({
   type: constant.LIST_DTOS, 
   payload: true
}); 
const listDepartamentosSuccess = dtos => ({
   type: constant.LIST_DTOS_SUCCESS,
   payload: dtos
});
const listDepartamentosError = () => ({
   type: constant.LIST_DTOS_ERROR, 
   payload: true
});  