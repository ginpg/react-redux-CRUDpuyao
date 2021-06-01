import constant from '../types/constant'


const initialState = {
    cargos: [],
    error: null,
    loading: false,
}

export default function(state = initialState, action){

    switch (action.type) {

        case constant.LIST_CARGO_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: null,
                    cargos: action.payload
            }

        case constant.LIST_CARGO: 
            return {
                    ...state,
                    loading: action.payload
            }

        case constant.LIST_CARGO_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }
    
        default:
            return state;
    }
}
