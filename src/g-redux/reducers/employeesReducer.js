import constant from '../types/constant'

const initialState = {
    employees: [],
    managers: [],
    error: false,
    loading: false,
    selected: null,
    page:1,
    last_page: 1,
    from: '',
    reload: false
}

export default function(state = initialState, action){

    switch (action.type) {

        case constant.LIST_EMPLOYEES: 
        case constant.NEW_EMPLOYEE:
        case constant.SEARCH:
        case constant.LIST_PM:
            return {
                    ...state,
                    loading: action.payload
            }

        case constant.DISINCORPORATE_EMPLOYEE_ERROR:
        case constant.LIST_EMPLOYEES_ERROR:
        case constant.NEW_EMPLOYEE_ERROR:
        case constant.EDIT_EMPLOYEE_ERROR:
        case constant.PAGINACION_ERROR_EMPLOYEES:
        case constant.SEARCH_ERROR:
        case constant.LAST_PAGE_ERROR_EMPLOYEES:
        case constant.LIST_PM_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        case constant.LIST_EMPLOYEES_SUCCESS:
        case constant.PAGINACION_SUCCESS_EMPLOYEES:
        case constant.SEARCH_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: false,
                    employees: action.payload,
                    reload: false
            }

        case constant.DISINCORPORATE_EMPLOYEE:
        case constant.EDIT_EMPLOYEE:
            return {
                    ...state,
                    loading: false,
                    error:false,
                    selected: action.payload
            }

        case constant.DISINCORPORATE_EMPLOYEE_SUCCESS:
            return {
                    ...state,
                    employees: state.employees.filter( e => e.id !== state.selected),
                    selected: null
            }
         

        case constant.NEW_EMPLOYEE_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    employees: [...state.employees, action.payload]
            }     
            
        case constant.SELECT_EMPLOYEE_TO_EDIT:
                return{
                    ...state,
                    selected: action.payload
                }

        case constant.EDIT_EMPLOYEE_SUCCESS:
            return{
                ...state,
                employees: state.employees.map( employee =>
                    employee.id === action.payload.id ? employee = action.payload : employee
                )
            }
        
        case constant.PAGINACION_EMPLOYEES:
            return{
                ...state,
                page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_EMPLOYEES:
            return{
                ...state,
                last_page: action.payload
            }
        
        case constant.FROM:
            return{
                ...state,
                from: action.payload
            }


        case constant.LIST_PM_SUCCESS:
            return{
                ...state,
                managers: action.payload
            }
            
        case constant.RELOAD_EMPLOYEES:
            return{
                ...state,
                reload: true
            }
        default:
            return state;
    }
}