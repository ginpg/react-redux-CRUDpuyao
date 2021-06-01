import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                                 PAGINACION
export function paginacionAction(n){
    return async (dispatch) => {
        dispatch (paginacion(n))
        try {
            //console.log("Pidiendo pag "+ n);
            const respuesta = await clienteAxios.get(`/api/proyectos/pausados/${n}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( paginacionSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( paginacionError() )
       } 
    }
}
const paginacion = n => ({
    type: constant.PAGINACION_PAUSED,
    payload: n
})
const paginacionSuccess = projects => ({
    type: constant.PAGINACION_SUCCESS_PAUSED,
    payload: projects
 });
 const paginacionError = () => ({
    type: constant.PAGINACION_ERROR_PAUSED, 
    payload: true
 }); 


  //                                 PAGINACION LAST PAGE
export function lastPageAction(){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/pausados/countpages`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( lastPageSuccess(respuesta.data.pages));
       } catch (error) {
           console.log(error);
           dispatch( lastPageError() )
       } 
    }
}
const lastPageSuccess = n => ({
    type: constant.LAST_PAGE_SUCCESS_PAUSED,
    payload: n
})
const lastPageError = () => ({
    type: constant.LAST_PAGE_ERROR_PAUSED,
    payload: true
})


 //                 BUSQUEDA
 export function submitSearchAction({search,page}){
    return async (dispatch) => {
        dispatch (submitSearch())
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/pausados/search/${search}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
            dispatch( submitSearchSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( submitSearchError() )
       } 
    }
}
const submitSearch = () => ({
    type: constant.SEARCH_PAUSED,
    payload: true
})
const submitSearchSuccess = paused => ({
    type: constant.SEARCH_PAUSED_SUCCESS,
    payload: paused
 });
 const submitSearchError = () => ({
    type: constant.SEARCH_PAUSED_ERROR, 
    payload: true
 }); 

  //                                 CAMBIAR STATUS

export function cambiarStatusPausadoAction({ id,status,nota_to_send}){
    return async (dispatch) => {
            dispatch( cambiarStatus());
            try {
              //console.log(`/api/proyectos/changestatus/${id}/${status}`+' '+nota_to_send)
                await clienteAxios.post(`/api/proyectos/changestatus/${id}/${status}`,nota_to_send, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( cambiarStatusSuccess(id));    
            } catch (error) {
                dispatch( cambiarStatusError()); 
                console.log(error);
                  
            }            
        }
}

const cambiarStatus = ()=> ({
    type:constant.ACTIVAR_CANCELAR_PAUSED,
});
const cambiarStatusSuccess = id => ({
    type:constant.ACTIVAR_CANCELAR_PAUSED_SUCCESS,
    payload: id
});
const cambiarStatusError = () => ({
    type:constant.ACTIVAR_CANCELAR_PAUSED_ERROR,
    payload: true
});




//                                              EDITAR
export function editPausedAction(id,project){
    return async (dispatch) => {
        //console.log(project)
        dispatch( editPaused(project) );
        try {
            await clienteAxios.put(`/api/proyectos/${id}`, project, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})
            dispatch( editPausedSuccess(project))
        } catch (error) {   
            dispatch( editPausedError())
        }
        
    }
}

const editPaused =  project => ({
    type: constant.EDIT_PAUSED,
    payload: project
})

const editPausedSuccess = project => ({
    type: constant.EDIT_PAUSED_SUCCESS,
    payload: project
})

const editPausedError = () => ({
    type: constant.EDIT_PAUSED_ERROR,
    payload: true
})