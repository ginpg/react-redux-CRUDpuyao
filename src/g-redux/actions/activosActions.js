import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';


//                                 PAGINACION
export function paginacionAction(n){
    return async (dispatch) => {
        dispatch (paginacion(n))
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/activos/${n}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( paginacionSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( paginacionError() )
       } 
    }
}
const paginacion = n => ({
    type: constant.PAGINACION_ACTIVES,
    payload: n
})
const paginacionSuccess = projects => ({
    type: constant.PAGINACION_SUCCESS_ACTIVES,
    payload: projects
 });
 const paginacionError = () => ({
    type: constant.PAGINACION_ERROR_ACTIVES, 
    payload: true
 }); 


 //                                 PAGINACION LAST PAGE
export function lastPageAction(){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/activos/countpages`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( lastPageSuccess(respuesta.data.pages));
       } catch (error) {
           console.log(error);
           dispatch( lastPageError() )
       } 
    }
}
const lastPageSuccess = n => ({
    type: constant.LAST_PAGE_SUCCESS_ACTIVES,
    payload: n
})
const lastPageError = () => ({
    type: constant.LAST_PAGE_ERROR_ACTIVES,
    payload: true
})


 //                                 BUSQUEDA

 export function submitSearchAction({search,page}){
    return async (dispatch) => {
        dispatch (submitSearch())
        try {
            
            const respuesta = await clienteAxios.get(`/api/proyectos/activos/search/${search}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
            dispatch( submitSearchSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( submitSearchError() )
       } 
    }
}
const submitSearch = () => ({
    type: constant.SEARCH_ACTIVES,
    payload: true
})
const submitSearchSuccess = active => ({
    type: constant.SEARCH_ACTIVES_SUCCESS,
    payload: active
 });
 const submitSearchError = () => ({
    type: constant.SEARCH_ACTIVES_ERROR, 
    payload: true
 }); 


 //                                 CREAR

export function createProjectAction(project){
    return async (dispatch) => {
            dispatch( createNewProject());
            try {
                await clienteAxios.post(`/api/proyectos`,project,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( NewProjectSuccess(project));    
            } catch (error) {
                dispatch( NewProjectError()); 
                console.log(error.response.data);
                error && alert(error.response.data.message[0].split("_").join(" "))
                  
            }            
        }
}

const createNewProject = () => ({
    type:constant.NEW_PROJECT,
    payload: true
});
const NewProjectSuccess = project => ({
    type:constant.NEW_PROJECT_SUCCESS,
    payload: project
});
const NewProjectError = () => ({
    type:constant.NEW_PROJECT_ERROR,
    payload: true
});


 //                                 CAMBIAR STATUS

export function cambiarStatusAction({ id, status,nota_to_send}){
    return async (dispatch) => {
            dispatch( cambiarStatus());
            try {
                //console.log(`/api/proyectos/changestatus/${id}/${status}`+' '+nota_to_send)
                await clienteAxios.post(`/api/proyectos/changestatus/${id}/${status}`, nota_to_send,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( cambiarStatusSuccess(id));    
            } catch (error) {
                dispatch( cambiarStatusError()); 
                console.log(error);
                  
            }            
        }
}

const cambiarStatus = ()=> ({
    type:constant.PAUSAR_CANCELAR_ACTIVE,
});
const cambiarStatusSuccess = id => ({
    type:constant.PAUSAR_CANCELAR_ACTIVE_SUCCESS,
    payload: id
});
const cambiarStatusError = () => ({
    type:constant.PAUSAR_CANCELAR_ACTIVE_ERROR,
    payload: true
});


//                                   DETALLES

export function obtenerProyectoAction(id){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/proyectos/${id}`,{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( obtenerProyectoSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( obtenerProyectoError() )
       } 
    }
}
const obtenerProyectoSuccess = project => ({
    type: constant.OBTENER_PROYECTO_SUCCESS,
    payload: project
})

const obtenerProyectoError = () => ({
    type: constant.OBTENER_PROYECTO_ERROR,
    payload: true
})


//                                   PRE EDITAR

export function selectActivoToEditAction(project){
    return(dispatch) => {
        dispatch (selectActivoToEdit(project))
    }
}

const selectActivoToEdit = project => ({
    type: constant.SELECT_PROJECT_TO_EDIT,
    payload: project
})


export function fromActivoAction(value){
    return(dispatch) => {
        dispatch (fromActivo(value))
    }
}

const fromActivo = value => ({
    type: constant.FROM_PROJECT,
    payload: value
})



//                                  EDITAR
export function editProjectAction(id,project){
    return async (dispatch) => {
        dispatch( editProject(project) );
        try {
            await clienteAxios.put(`/api/proyectos/${id}`, project, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})
            dispatch( editProjectSuccess(project))
        } catch (error) {   
            dispatch( editProjectError())
        }
        
    }
}

const editProject =  project => ({
    type: constant.EDIT_PROJECT,
    payload: project
})

const editProjectSuccess = project => ({
    type: constant.EDIT_PROJECT_SUCCESS,
    payload: project
})

const editProjectError = () => ({
    type: constant.EDIT_PROJECT_ERROR,
    payload: true
})


//                      FROM EDITADO
export function toReloadAction(){
    return async (dispatch) => {
        dispatch( toReload() );
    }
}

const toReload =  () => ({
    type: constant.TO_RELOAD,
    payload: true
})