import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                                 PAGINACION
export function paginacionAction(n){
    return async (dispatch) => {
        dispatch (paginacion(n))
        try {
            //console.log("Pidiendo pag "+ n);
            const respuesta = await clienteAxios.get(`/api/proyectos/cancelados/${n}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( paginacionSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( paginacionError() )
       } 
    }
}
const paginacion = n => ({
    type: constant.PAGINACION_CANCELED,
    payload: n
})
const paginacionSuccess = projects => ({
    type: constant.PAGINACION_SUCCESS_CANCELED,
    payload: projects
 });
 const paginacionError = () => ({
    type: constant.PAGINACION_ERROR_CANCELED, 
    payload: true
 }); 


  //                                 PAGINACION LAST PAGE
export function lastPageCanceledAction(){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/empleado/countpages`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( lastPageSuccess(respuesta.data.pages));
       } catch (error) {
           console.log(error);
           dispatch( lastPageError() )
       } 
    }
}
const lastPageSuccess = n => ({
    type: constant.LAST_PAGE_CANCELED_SUCCESS,
    payload: n
})
const lastPageError = () => ({
    type: constant.LAST_PAGE_CANCELED_ERROR,
    payload: true
})


 //                 BUSQUEDA
 export function submitSearchAction({search,page}){
    return async (dispatch) => {
        dispatch (submitSearch())
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/cancelados/search/${search}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
            dispatch( submitSearchSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( submitSearchError() )
       } 
    }
}
const submitSearch = () => ({
    type: constant.SEARCH_CANCELED,
    payload: true
})
const submitSearchSuccess = canceled => ({
    type: constant.SEARCH_CANCELED_SUCCESS,
    payload: canceled
 });
 const submitSearchError = () => ({
    type: constant.SEARCH_CANCELED_ERROR, 
    payload: true
 }); 


   //                                 CAMBIAR STATUS

export function cambiarStatusCanceladoAction({ id,status,nota_to_send}){
    return async (dispatch) => {
            dispatch( cambiarStatus());
            try {
              //console.log(`/api/proyectos/changestatus/${id}/${status}`+' '+nota_to_send)
                await clienteAxios.post(`/api/proyectos/changestatus/${id}/${status}`,nota_to_send,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( cambiarStatusSuccess(id));    
            } catch (error) {
                dispatch( cambiarStatusError()); 
                console.log(error);
                  
            }            
        }
}

const cambiarStatus = ()=> ({
    type:constant.ACTIVAR_PAUSAR_CANCELED,
});
const cambiarStatusSuccess = id => ({
    type:constant.ACTIVAR_PAUSAR_CANCELED_SUCCESS,
    payload: id
});
const cambiarStatusError = () => ({
    type:constant.ACTIVAR_PAUSAR_CANCELED_ERROR,
    payload: true
});


//                                              EDITAR
export function editCanceledAction(id,project){
    return async (dispatch) => {
        console.log(project)
        dispatch( editCanceled(project) );
        try {
            await clienteAxios.put(`/api/proyectos/${id}`, project, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})
            dispatch( editCanceledSuccess(project))
        } catch (error) {   
            dispatch( editCanceledError())
        }
        
    }
}

const editCanceled =  project => ({
    type: constant.EDIT_CANCELED,
    payload: project
})

const editCanceledSuccess = project => ({
    type: constant.EDIT_CANCELED_SUCCESS,
    payload: project
})

const editCanceledError = () => ({
    type: constant.EDIT_CANCELED_ERROR,
    payload: true
})