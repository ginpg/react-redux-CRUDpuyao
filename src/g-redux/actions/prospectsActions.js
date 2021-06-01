import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';

//                               LISTAR

export function listProspectsAction(){
    return async (dispatch) => {
        dispatch( listProspects() );
        try {
            const respuesta = await clienteAxios.get('/api/candidatos/activos/1', {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( listProspectsSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( listProspectsError() )
       } 
   }
}
const listProspects = () => ({
   type: constant.LIST_PROSPECTS, 
   payload: true
}); 
const listProspectsSuccess = prospects => ({
   type: constant.LIST_PROSPECTS_SUCCESS,
   payload: prospects
});
const listProspectsError = () => ({
   type: constant.LIST_PROSPECTS_ERROR, 
   payload: true
});  



//                                  ELIMINAR

export function deleteProspectAction(id){
    return async (dispatch) => {
            dispatch(deleteProspect(id));
            try {
                await clienteAxios.delete(`/api/candidatos/${id}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( deleteProspectSuccess(id))
            } catch (error) {
                console.log(error)
                dispatch( deleteProspectError())
            }            
    }  

}
const deleteProspect = id => ({
    type: constant.DELETE_PROSPECT,
    payload: id
});
const deleteProspectSuccess = id => ({
    type: constant.DELETE_PROSPECT_SUCCESS,
    payload: id
})

const deleteProspectError= () => ({
    type: constant.DELETE_PROSPECT_ERROR,
    payload: true
})



//                          DESINCORPORAR
export function disincorporateProspectAction({id,motivo,observaciones}){
    return async (dispatch) => {
            dispatch(disincorporateProspect(id));
            try {
                await clienteAxios.post(`/api/candidatos/desincorporar/${id}`, {motivo,observaciones}, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch(disincorporateProspectSuccess(id));
            } catch (error) {
                console.log(error)
                dispatch( disincorporateProspectError())
            }            
    }  

}
const disincorporateProspect = id => ({
    type: constant.DISINCORPORATE_PROSPECT,
    payload: id
});
const disincorporateProspectSuccess = id => ({
    type: constant.DISINCORPORATE_PROSPECT_SUCCESS,
    payload: id
})

const disincorporateProspectError= () => ({
    type: constant.DISINCORPORATE_PROSPECT_ERROR,
    payload: true
})



//                                 CREAR

export function createProspectAction(prospect){
    return async (dispatch) => {
            dispatch( createProspect());
            try {
                //console.log(prospect);
                await clienteAxios.post(`/api/candidatos`,prospect, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( createProspectSuccess(prospect));    
            } catch (error) {
                console.log(error);
                dispatch( createProspectError());   
            }            
        }
}

const createProspect = () => ({
    type:constant.NEW_PROSPECT,
    payload: true
});
const createProspectSuccess = prospect => ({
    type:constant.NEW_PROSPECT_SUCCESS,
    payload: prospect
});
const createProspectError = () => ({
    type:constant.NEW_PROSPECT_ERROR,
    payload: true
});



//                                 PRE EDITAR
export function selectProspectToEditAction(prospect){
    return(dispatch) => {
        dispatch (selectProspectToEdit(prospect))
    }
}

const selectProspectToEdit = prospect => ({
    type: constant.SELECT_PROSPECT_TO_EDIT,
    payload: prospect
})

export function fromProspectAction(value){
    return(dispatch) => {
        dispatch (fromProspect(value))
    }
}

const fromProspect = value => ({
    type: constant.FROM_PROSPECT,
    payload: value
})

//                      EDITAR
export function editProspectAction(prospect){
    return async (dispatch) => {
        dispatch( editProspect(prospect) );
        try {
            await clienteAxios.put(`/api/candidatos/${prospect.id}`, prospect, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})
            dispatch( editProspectSuccess(prospect))
        } catch (error) {   
            dispatch( editProspectError())
        }
        
    }
}

const editProspect = prospect => ({
    type: constant.EDIT_PROSPECT,
    payload:  prospect
})
const editProspectSuccess = prospect => ({
    type: constant.EDIT_PROSPECT_SUCCESS,
    payload:  prospect
})
const editProspectError = () => ({
    type: constant.EDIT_PROSPECT_ERROR,
    payload: true
})


//                                 PAGINACION
export function paginacionAction(n){
    return async (dispatch) => {
        dispatch (paginacion(n))
        try {
            //console.log("Pidiendo pag "+ n);
            const respuesta = await clienteAxios.get(`/api/candidatos/activos/${n}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( paginacionSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( paginacionError() )
       } 
    }
}
const paginacion = n => ({
    type: constant.PAGINACION_PROSPECT,
    payload: n
})
const paginacionSuccess = prospects => ({
    type: constant.PAGINACION_SUCCESS_PROSPECT,
    payload: prospects
 });
 const paginacionError = () => ({
    type: constant.PAGINACION_ERROR_PROSPECT, 
    payload: true
 }); 


 //                  CONTRATAR               

export function hireAction(id,nuevo_empleado){   
    return async (dispatch) => {
            dispatch(hireProspect(id));
            try {
                //console.log(id)
                //console.log("contratando")
                await clienteAxios.post(`/api/candidatos/contratar/${id}`, nuevo_empleado, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch(hireProspectSuccess(id));
            } catch (error) {
                console.log(error)
                dispatch( hireProspectError())
            }            
    }  

}
const hireProspect = id => ({
    type: constant.HIRE_PROSPECT,
    payload: id
});
const hireProspectSuccess = id => ({
    type: constant.HIRE_PROSPECT_SUCCESS,
    payload: id
})

const hireProspectError= () => ({
    type: constant.HIRE_PROSPECT_ERROR,
    payload: true
})



 //                 BUSQUEDA
 export function submitSearchAction({search,page}){
    return async (dispatch) => {
        dispatch (submitSearch())
        try {
            //console.log("Pidiendo "+search+" en pag "+ page);
            const respuesta = await clienteAxios.get(`/api/candidatos/search/${search}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
            dispatch( submitSearchSuccess(respuesta.data) )
           
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
const submitSearchSuccess = prospects => ({
    type: constant.SEARCH_SUCCESS,
    payload: prospects
 });
 const submitSearchError = () => ({
    type: constant.SEARCH_ERROR, 
    payload: true
 }); 



 //                                 PAGINACION LAST PAGE
export function lastPageAction(){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/candidatos/countpages`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( lastPageSuccess(respuesta.data.pages));
       } catch (error) {
           console.log(error);
           dispatch( lastPageError() )
       } 
    }
}
const lastPageSuccess = n => ({
    type: constant.LAST_PAGE_SUCCESS_PROSPECT,
    payload: n
})
const lastPageError = () => ({
    type: constant.LAST_PAGE_ERROR_PROSPECT,
    payload: true
})

//                      FROM EDITADO
export function toReloadAction(){
    return async (dispatch) => {
        dispatch( toReload() );
    }
}

const toReload =  () => ({
    type: constant.RELOAD_PROSPECTS,
    payload: true
})