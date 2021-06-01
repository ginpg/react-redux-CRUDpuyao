import constant from '../types/constant'


const initialState = {
    departamentos: [],
    error: null,
    loading: false,
}

export default function(state = initialState, action){

    switch (action.type) {

        case constant.LIST_DTOS_SUCCESS:
            return {
                    ...state,
                    loading: false,
                    error: null,
                    departamentos: action.payload
            }

        case constant.LIST_DTOS: 
            return {
                    ...state,
                    loading: action.payload
            }

        case constant.LIST_DTOS_ERROR:
            return {
                    ...state,
                    loading: false,
                    error: action.payload
            }
    
        default:
            return state;
    }
}
