import constant from '../types/constant'

const initialState = {
    pausados: [],
    error: false,
    loading: false,
    selected: null,
    page:1,
    last_page: 1,
    from: ''
}

export default function(state = initialState, action){

    switch (action.type) {
                
        case constant.PAGINACION_ERROR_PAUSED:
        case constant.LAST_PAGE_ERROR_PAUSED:
        case constant.SEARCH_PAUSED_ERROR:
        case constant.ACTIVAR_CANCELAR_PAUSED_ERROR:
        case constant.EDIT_PAUSED_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        case constant.PAGINACION_SUCCESS_PAUSED:
        case constant.SEARCH_PAUSED_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: false,
                    pausados: action.payload
            }

        case constant.PAGINACION_PAUSED:
            return{
                    ...state,
                    page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_PAUSED:
            return{
                ...state,
                last_page: action.payload
            }
        
        case constant.SEARCH_PAUSED:
        case constant.ACTIVAR_CANCELAR_PAUSED:
            return {
                ...state,
                loading: action.payload
        }

        case constant.ACTIVAR_CANCELAR_PAUSED_SUCCESS:
            return {
                    ...state,
                    pausados: state.pausados.filter( e => e.id !== action.payload)
            }

        case constant.EDIT_PAUSED_SUCCESS:
            return{
                    ...state,
                    pausados: state.pausados.map( pausado =>
                        pausado.id === action.payload.id ? pausado = action.payload : pausado
                    )
            }

        case constant.EDIT_PAUSED:
            return{
                    ...state,
                    selected: action.payload
            }

        default:
            return state;
    }
}