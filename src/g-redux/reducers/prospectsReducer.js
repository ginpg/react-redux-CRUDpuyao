import constant from '../types/constant'

const initialState = {
    prospects: [],
    error: null,
    loading: false,
    selected: null,
    page: 1,
    last_page:1,
    from: '',
    reload: false
}

export default function( state = initialState, action){

    switch (action.type) {

        case constant.LIST_PROSPECTS_ERROR: 
        case constant.DELETE_PROSPECT_ERROR:
        case constant.DISINCORPORATE_PROSPECT_ERROR:
        case constant.NEW_PROSPECT_ERROR:
        case constant.EDIT_PROSPECT_ERROR:
        case constant.PAGINACION_ERROR_PROSPECT:
        case constant.HIRE_PROSPECT_ERROR:
        case constant.SEARCH_ERROR:
        case constant.LAST_PAGE_ERROR_PROSPECT:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        case constant.NEW_PROSPECT:
        case constant.LIST_PROSPECTS:
        case constant.SEARCH:
            return {
                    ...state,
                    loading: action.payload
            }     
            
        case constant.LIST_PROSPECTS_SUCCESS:
        case constant.PAGINACION_SUCCESS_PROSPECT:
        case constant.SEARCH_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: null,
                    prospects: action.payload,
                    reload: false
            }
    
        case constant.DELETE_PROSPECT:
            return{
                    ...state,
                    selected: action.payload
            }
                    
    
        case constant.DELETE_PROSPECT_SUCCESS:
            return{
                    ...state,
                    prospects: state.prospects.filter( e => e.id !== state.selected),
                    selected: null
            }
    
        case constant.DISINCORPORATE_PROSPECT:
        case constant.HIRE_PROSPECT:
        case constant.EDIT_PROSPECT:
            return {
                    ...state,
                    loading: false,
                    error:false,
                    selected: action.payload
            }

        case constant.DISINCORPORATE_PROSPECT_SUCCESS:
        case constant.HIRE_PROSPECT_SUCCESS:
            return {
                    ...state,
                    prospects: state.prospects.filter( e => e.id !== state.selected),
                    selected: null
            }
             
        case constant.NEW_PROSPECT_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    prospects: [...state.prospects, action.payload]
            }  
    
        case constant.SELECT_PROSPECT_TO_EDIT:
            return{
                    ...state,
                    selected: action.payload
            }

        case constant.EDIT_PROSPECT_SUCCESS:
            return{
                    ...state,
                    prospects: state.prospects.map( prospect =>
                    prospect.id === action.payload.id ? prospect = action.payload : prospect
                )
            }
            
        case constant.PAGINACION_PROSPECT:
            return{
                ...state,
                page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_PROSPECT:
            return{
                ...state,
                last_page: action.payload
            }

        case constant.FROM_PROSPECT:
            return{
                ...state,
                from: action.payload
            }

        case constant.RELOAD_PROSPECTS:
            return{
                ...state,
                reload: true
            }
        default:
            return state;
    }
}
