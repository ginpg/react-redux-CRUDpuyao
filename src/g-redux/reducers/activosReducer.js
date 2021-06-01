import constant from '../types/constant'

const initialState = {
    activos: [],
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
                
        case constant.PAGINACION_ERROR_ACTIVES:
        case constant.LAST_PAGE_ERROR_ACTIVES:
        case constant.NEW_PROJECT_ERROR:
	    case constant.SEARCH_ACTIVES_ERROR:
        case constant.PAUSAR_CANCELAR_ACTIVE_ERROR:
        case constant.OBTENER_PROYECTO_ERROR:
        case constant.EDIT_PROJECT_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }

        
        case constant.NEW_PROJECT:
        case constant.SEARCH_ACTIVES:
        case constant.PAUSAR_CANCELAR_ACTIVE:
            return {
                ...state,
                loading: action.payload
        }

        case constant.PAGINACION_SUCCESS_ACTIVES:
        case constant.SEARCH_ACTIVES_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: false,
                    activos: action.payload,
                    reload: false
            }

        case constant.PAGINACION_ACTIVES:
            return{
                    ...state,
                    page: action.payload
            }

        case constant.LAST_PAGE_SUCCESS_ACTIVES:
            return{
                    ...state,
                    last_page: action.payload
            }
        
        case constant.NEW_PROJECT_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    activos: [...state.activos, action.payload]
            } 
        
        case constant.PAUSAR_CANCELAR_ACTIVE_SUCCESS:
            return {
                    ...state,
                    activos: state.activos.filter( e => e.id !== action.payload)
            }

        case constant.OBTENER_PROYECTO_SUCCESS:
        case constant.SELECT_PROJECT_TO_EDIT:
        case constant.EDIT_PROJECT:
            return{
                    ...state,
                    selected: action.payload
            }

        case constant.FROM_PROJECT:
            return{
                    ...state,
                    from: action.payload
            }
        
        case constant.EDIT_PROJECT_SUCCESS:
            return{
                    ...state,
                    activos: state.activos.map( activo =>
                        activo.id === action.payload.id ? activo = action.payload.id : activo
                    )
            }

        case constant.TO_RELOAD:
            return{
                ...state,
                reload: true
            }
        default:
            return state;
    }
}
