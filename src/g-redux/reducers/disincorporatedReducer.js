import constant from '../types/constant'


const initialState = {
    disincorporated: [],
    error: null,
    loading: false,
    selected: null,
    page: 1,
    last_page_disincorporated: 1
}

export default function( state = initialState, action){

    switch (action.type) {

        case constant.LIST_DISINCORPORATED:
        case constant.SEARCH:
            return {
                    ...state,
                    loading: action.payload
            }

        case constant.INCORPORATE_EMPLOYEE_ERROR:
        case constant.LIST_DISINCORPORATED_ERROR:
        case constant.INCORPORATE_PROSPECT_ERROR:
        case constant.PAGINACION_ERROR_DIS:
        case constant.SEARCH_ERROR:
        case constant.LAST_PAGE_ERROR_DIS:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        case constant.LIST_DISINCORPORATED_SUCCESS:
        case constant.PAGINACION_SUCCESS_DIS:
        case constant.SEARCH_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: null,
                    disincorporated: action.payload
            }
            
        case constant.INCORPORATE_EMPLOYEE:
        case constant.INCORPORATE_PROSPECT:
            return {
                    ...state,
                    loading: false,
                    error:false,
                    selected: action.payload
            }

        case constant.INCORPORATE_EMPLOYEE_SUCCESS:
        case constant.INCORPORATE_PROSPECT_SUCCESS:
            return {
                    ...state,
                    loading:false,
                    disincorporated: state.disincorporated.filter( e => e.id !== state.selected),
                    selected: null
            }
    
        case constant.PAGINACION_DIS:
            return{
                ...state,
                page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_DIS:
            return{
                ...state,
                last_page_disincorporated: action.payload
            }

            default:
                return state;
    }
}
