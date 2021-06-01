import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                                 LISTAR

export function listDisincorporatedAction(){
    return async (dispatch) => {
        dispatch( listDis() );
        try {
            const respuesta = await clienteAxios.get('/api/empleado/desincorporado/1', {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            const dis_employees = respuesta.data.empleados;
            const dis_prospects = respuesta.data.candidatos;
            dispatch( listDisSuccess(dis_employees.concat(dis_prospects)) );
            //dispatch( listDisSuccess(respuesta.data.candidatos) );
       } catch (error) {
           console.log(error);
           dispatch( listDisError() )
       } 
   }
}
const listDis = () => ({
   type: constant.LIST_DISINCORPORATED, 
   payload: true
}); 
const listDisSuccess = disincorporated => ({
   type: constant.LIST_DISINCORPORATED_SUCCESS,
   payload: disincorporated
});
const listDisError = () => ({
   type: constant.LIST_DISINCORPORATED_ERROR, 
   payload: true
}); 


//                          INCORPORAR EMPLEADO
export function incorporateEmployeeAction(id){
   return async (dispatch) => {
           dispatch(incorporateEmployee(id));
           try {
               await clienteAxios.get(`/api/empleado/incorporar/${id}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
               dispatch(incorporateEmployeeSuccess(id));
           } catch (error) {
               console.log(error)
               dispatch( incorporateEmployeeError())
           }            
   }  

}
const incorporateEmployee = id => ({
   type: constant.INCORPORATE_EMPLOYEE,
   payload: id
});
const incorporateEmployeeSuccess = id => ({
   type: constant.INCORPORATE_EMPLOYEE_SUCCESS,
   payload: id
});
const incorporateEmployeeError= () => ({
   type: constant.INCORPORATE_EMPLOYEE_ERROR,
   payload: true
});


//                          INCORPORAR PROSPECTOS
export function incorporateProspectAction(id){
   return async (dispatch) => {
           dispatch(incorporateProspects(id));
           try {
               await clienteAxios.get(`/api/candidatos/incorporar/${id}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
               dispatch(incorporateProspectsSuccess(id));
           } catch (error) {
               console.log(error)
               dispatch( incorporateProspectsError())
           }            
   }  

}
const incorporateProspects = id => ({
   type: constant.INCORPORATE_PROSPECT,
   payload: id
});
const incorporateProspectsSuccess = id => ({
   type: constant.INCORPORATE_PROSPECT_SUCCESS,
   payload: id
});
const incorporateProspectsError= () => ({
   type: constant.INCORPORATE_PROSPECT_ERROR,
   payload: true
});


//                                 PAGINACION
export function paginacionAction(n){
   return async (dispatch) => {
       dispatch (paginacion(n))
       try {
           //console.log("Pidiendo pag "+ n);
           const respuesta = await clienteAxios.get(`/api/empleado/desincorporado/${n}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
           const dis_employees = respuesta.data.empleados;
           const dis_prospects = respuesta.data.candidatos;
           dispatch( paginacionSuccess(dis_employees.concat(dis_prospects)) )
          
      } catch (error) {
          console.log(error);
          dispatch( paginacionError() )
      } 
   }
}
const paginacion = n => ({
   type: constant.PAGINACION_DIS,
   payload: n
})
const paginacionSuccess = disincorporated => ({
   type: constant.PAGINACION_SUCCESS_DIS,
   payload: disincorporated
});
const paginacionError = () => ({
   type: constant.PAGINACION_ERROR_DIS, 
   payload: true
}); 


 //                 BUSQUEDA
 export function submitSearchAction({search,page}){
   return async (dispatch) => {
       dispatch (submitSearch())
       try {
           //console.log("Pidiendo "+search+" en pag "+ page);
           const respuesta = await clienteAxios.get(`/api/empleado/desincorporados/search/${search}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
           const dis_employees = respuesta.data.empleados;
           const dis_prospects = respuesta.data.candidatos;
           dispatch( submitSearchSuccess(dis_employees.concat(dis_prospects)) )
          
      } catch (error) {
          console.log(error);
          dispatch( submitSearchError() )
      } 
   }
}
const submitSearch = () => ({
   type: constant.SEARCH,
   payload: true
})
const submitSearchSuccess = disincorporated => ({
   type: constant.SEARCH_SUCCESS,
   payload: disincorporated
});
const submitSearchError = () => ({
   type: constant.SEARCH_ERROR, 
   payload: true
}); 



//                                 PAGINACION LAST PAGE
export function lastPageAction(){
   return async (dispatch) => {
       try {
           const respuesta = await clienteAxios.get(`/api/empleado/desincorporados/countpages`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
           dispatch( lastPageSuccess(respuesta.data.pages));
      } catch (error) {
          console.log(error);
          dispatch( lastPageError() )
      } 
   }
}
const lastPageSuccess = n => ({
   type: constant.LAST_PAGE_SUCCESS_DIS,
   payload: n
})
const lastPageError = () => ({
   type: constant.LAST_PAGE_ERROR_DIS,
   payload: true
})