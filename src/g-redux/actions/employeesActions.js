import constant from '../types/constant'
import clienteAxios from '../../configuracion_axios/axios';



//                               LISTAR

export function listEmployeesAction(n){
    return async (dispatch) => {
        dispatch( listEmployees() );
        try {
            //console.log("Pidiendo pag "+n);
            const respuesta = await clienteAxios.get(`/api/empleado/activos/${n}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( listEmployeesSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( listEmployeesError() )
       } 
   }
}
const listEmployees = () => ({
   type: constant.LIST_EMPLOYEES, 
   payload: true
}); 
const listEmployeesSuccess = employees => ({
   type: constant.LIST_EMPLOYEES_SUCCESS,
   payload: employees
});
const listEmployeesError = () => ({
   type: constant.LIST_EMPLOYEES_ERROR, 
   payload: true
});  



//                                 CREAR

export function createEmployeeAction(employee){
    return async (dispatch) => {
            //console.log(employee)
            dispatch( createNewEmployee());
            try {
                await clienteAxios.post(`/api/empleado`, employee, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch( NewEmployeeSuccess(employee));    
            } catch (error) {
                dispatch( NewEmployeeError()); 
                console.log(error.response.data);
                error && alert(error.response.data.message[0].split("_").join(" "))
            }            
        }
}

const createNewEmployee = () => ({
    type:constant.NEW_EMPLOYEE,
    payload: true
});
const NewEmployeeSuccess = employee => ({
    type:constant.NEW_EMPLOYEE_SUCCESS,
    payload: employee
});
const NewEmployeeError = () => ({
    type:constant.NEW_EMPLOYEE_ERROR,
    payload: true
});



//                          DESINCORPORAR
export function disincorporateEmployeeAction({id,motivo,observaciones}){
    return async (dispatch) => {
            dispatch(disincorporateEmployee(id));
            try {
                await clienteAxios.post(`/api/empleado/desincorporar/${id}`, {motivo,observaciones}, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
                dispatch(disincorporateEmployeeSuccess(id));
            } catch (error) {
                console.log(error)
                dispatch( disincorporateEmployeeError())
            }            
    }  

}
const disincorporateEmployee = id => ({
    type: constant.DISINCORPORATE_EMPLOYEE,
    payload: id
});
const disincorporateEmployeeSuccess = id => ({
    type: constant.DISINCORPORATE_EMPLOYEE_SUCCESS,
    payload: id
})

const disincorporateEmployeeError= () => ({
    type: constant.DISINCORPORATE_EMPLOYEE_ERROR,
    payload: true
})



//                                 PRE EDITAR
export function selectEmployeeToEditAction(employee){
    return(dispatch) => {
        dispatch (selectEmployeeToEdit(employee))
    }
}

const selectEmployeeToEdit = employee => ({
    type: constant.SELECT_EMPLOYEE_TO_EDIT,
    payload: employee
})

export function fromEmployeeAction(value){
    return(dispatch) => {
        dispatch (fromEmployee(value))
    }
}

const fromEmployee = value => ({
    type: constant.FROM,
    payload: value
})

//                      EDITAR
export function editEmployeeAction(id, employee){
    return async (dispatch) => {
        dispatch( editEmployee(employee) );
        try {
            await clienteAxios.put(`/api/empleado/${id}`, employee, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}})
            dispatch( editEmployeeSuccess(employee))
        } catch (error) {   
            dispatch( editEmployeeError())
        }
        
    }
}

const editEmployee =  employee => ({
    type: constant.EDIT_EMPLOYEE,
    payload: employee
})

const editEmployeeSuccess = employee => ({
    type: constant.EDIT_EMPLOYEE_SUCCESS,
    payload: employee
})

const editEmployeeError = () => ({
    type: constant.EDIT_EMPLOYEE_ERROR,
    payload: true
})


//                                 PAGINACION
export function paginacionAction(n){
    return async (dispatch) => {
        dispatch (paginacion(n))
        try {
            //console.log("Pidiendo pag "+ n);
            const respuesta = await clienteAxios.get(`/api/empleado/activos/${n}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( paginacionSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( paginacionError() )
       } 
    }
}
const paginacion = n => ({
    type: constant.PAGINACION_EMPLOYEES,
    payload: n
})
const paginacionSuccess = employees => ({
    type: constant.PAGINACION_SUCCESS_EMPLOYEES,
    payload: employees
 });
 const paginacionError = () => ({
    type: constant.PAGINACION_ERROR_EMPLOYEES, 
    payload: true
 }); 



 //                 BUSQUEDA
 export function submitSearchAction({search,page}){
    return async (dispatch) => {
        dispatch (submitSearch())
        try {
            //console.log("Pidiendo "+search+" en pag "+ page);
            const respuesta = await clienteAxios.get(`/api/empleado/search/${search}`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}}); 
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
const submitSearchSuccess = employees => ({
    type: constant.SEARCH_SUCCESS,
    payload: employees
 });
 const submitSearchError = () => ({
    type: constant.SEARCH_ERROR, 
    payload: true
 }); 



//                                 PAGINACION LAST PAGE
export function lastPageAction(){
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.get(`/api/empleado/countpages`, {headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            dispatch( lastPageSuccess(respuesta.data.pages));
       } catch (error) {
           console.log(error);
           dispatch( lastPageError() )
       } 
    }
}
const lastPageSuccess = n => ({
    type: constant.LAST_PAGE_SUCCESS_EMPLOYEES,
    payload: n
})
const lastPageError = () => ({
    type: constant.LAST_PAGE_ERROR_EMPLOYEES,
    payload: true
})



//                               LISTAR PMs

export function listPMAction(){
    return async (dispatch) => {
        dispatch( listPM() );
        try {
            const respuesta = await clienteAxios.get('/api/empleado/getpms',{headers:{Authorization:`Bearer ${localStorage.getItem("access_token")}`}});
            //console.log(respuesta.data);
            dispatch( listPMSuccess(respuesta.data) )
           
       } catch (error) {
           console.log(error);
           dispatch( listPMError() )
       } 
   }
}
const listPM = () => ({
   type: constant.LIST_PM, 
   payload: true
}); 
const listPMSuccess = pm => ({
   type: constant.LIST_PM_SUCCESS,
   payload: pm
});
const listPMError = () => ({
   type: constant.LIST_PM_ERROR, 
   payload: true
});  


//                      FROM EDITADO
export function toReloadEmployeeAction(){
    return async (dispatch) => {
        dispatch( toReloadEmployee() );
    }
}

const toReloadEmployee =  () => ({
    type: constant.RELOAD_EMPLOYEES,
    payload: true
})