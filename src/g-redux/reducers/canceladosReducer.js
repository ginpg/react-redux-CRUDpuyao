import constant from '../types/constant'

const initialState = {
    cancelados: [],
    error: false,
    loading: false,
    selected: null,
    page:1,
    last_page: 1,
    from: ''
}

export default function(state = initialState, action){

    switch (action.type) {
                
        case constant.PAGINACION_ERROR_CANCELED:
        case constant.LAST_PAGE_ERROR_CANCELED:
        case constant.SEARCH_CANCELED_ERROR:
        case constant.ACTIVAR_PAUSAR_CANCELED_ERROR:
        case constant.EDIT_CANCELED_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        case constant.PAGINACION_SUCCESS_CANCELED:
        case constant.SEARCH_CANCELED_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: false,
                    cancelados: action.payload
            }

        case constant.PAGINACION_CANCELED:
            return{
                    ...state,
                    page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_CANCELED:
            return{
                ...state,
                last_page: action.payload
            }
        
        case constant.SEARCH_CANCELED:
        case constant.ACTIVAR_PAUSAR_CANCELED:
            return{
                ...state,
                loading: action.payload
            }

        case constant.ACTIVAR_PAUSAR_CANCELED_SUCCESS:
            return {
                    ...state,
                    cancelados: state.cancelados.filter( e => e.id !== action.payload)
            }

        
        case constant.EDIT_CANCELED_SUCCESS:
            return{
                    ...state,
                    cancelados: state.cancelados.map( cancelado =>
                        cancelado.id === action.payload.id ? cancelado = action.payload : cancelado
                    )
            }

        case constant.EDIT_CANCELED:
            return{
                    ...state,
                    selected: action.payload
            }

        default:
            return state;
    }
}