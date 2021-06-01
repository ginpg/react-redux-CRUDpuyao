import DiscoveriesConstants from '../constants/DiscoveriesConstants'

// Initial State
const initialState = {
  loading: false,
  discoveryList: [],
  discoverySelected: null,
  error: null,
  actualPage: 1,
  lastPage: 1
}

export const ManageDiscoveryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DiscoveriesConstants.ACTIVE_SELECTED:
      console.log('REDUCER 2 -> ACTIVE SELECTED')
      return {
        ...state,
        actualPage: 1
      }
    case DiscoveriesConstants.PENDING_SELECTED:
      console.log('REDUCER 2 -> PENDING SELECTED')
      return {
        ...state,
        actualPage: 1
      }
    case DiscoveriesConstants.CANCEL_SELECTED:
      console.log('REDUCER 2 -> CANCEL SELECTED')
      return {
        ...state,
        actualPage: 1
      }
    // --------------- Get the data ----------------------------//
    case DiscoveriesConstants.GET_DISCOVERY_DATA:
      console.log('REDUCER -> GET DISCOVERY DATA')
      return {
        ...state,
        loading: true
      }
    case DiscoveriesConstants.GET_DISCOVERY_DATA_SUCCESS:
      console.log('REDUCER -> GET DISCOVERY DATA SUCCESS')
      return {
        ...state,
        loading: false,
        discoveryList: action.payload
      }
    case DiscoveriesConstants.GET_DISCOVERY_DATA_ERROR:
      console.log('REDUCER -> GET DISCOVERY DATA ERROR')
      return { ...state }

    // --------------  Create a Discovery  ---------------------//
    case DiscoveriesConstants.CREATE_DISCOVERY:
      console.log('REDUCER -> CREATE DISCOVERY')
      return {
        ...state,
        loading: true
      }
    case DiscoveriesConstants.CREATE_DISCOVERY_SUCCESS:
      console.log('REDUCER -> CREATE DISCOVERY SUCCESS')

      return {
        ...state,
        loading: false,
        discoveryList: [...state.discoveryList, action.payload]
      }
    case DiscoveriesConstants.CREATE_DISCOVERY_ERROR:
      console.log('REDUCER -> CREATE DISCOVERY ERROR')

      return {
        ...state,
        error: action.payload
      }

    // ------------------ Update a Discovery ----------------------------//
    case DiscoveriesConstants.UPDATE_DISCOVERY:
      console.log('REDUCER -> UPDATE DISCOVERY')

      return {
        ...state,
        loading: true
      }
    case DiscoveriesConstants.UPDATE_DISCOVERY_SUCCESS:
      console.log('REDUCER -> UPDATE DISCOVERY SUCCESS')
      return {
        ...state,
        loading: false,
        discoveryList: state.discoveryList.map(discovery =>
          discovery.id === action.payload.id ? (discovery = action.payload) : discovery
        )
      }
    case DiscoveriesConstants.UPDATE_DISCOVERY_ERROR:
      console.log('REDUCER -> UPDATE DISCOVERY ERROR')
      return {
        ...state,
        error: action.payload
      }

    //  --------- Paginacion de discovery -------------------//
    case DiscoveriesConstants.MOVE_PAGE:
      console.log('REDUCER -> MOVE PAGE ')
      return {
        ...state,
        loading: true
      }
    case DiscoveriesConstants.MOVE_PAGE_SUCCESS:
      console.log('REDUCER -> MOVE PAGE SUCCESS')
      return {
        ...state,
        loading: false,
        actualPage: action.payload
      }
    case DiscoveriesConstants.MOVE_PAGE_ERROR:
      console.log('REDUCER -> MOVE PAGE ERROR')
      return {
        ...state,
        loading: false,
        actualPage: action.payload
      }

    case DiscoveriesConstants.GET_LAST_PAGE:
      console.log('REDUCER -> GET LAST PAGE')
      return {
        ...state,
        loading: true
      }

    case DiscoveriesConstants.GET_LAST_PAGE_SUCCESS:
      console.log('REDUCER -> GET LAST PAGE SUCCESS')

      return {
        ...state,
        loading: false,
        lastPage: action.payload
      }
    case DiscoveriesConstants.GET_LAST_PAGE_ERROR:
      console.log('REDUCER -> GET LAST PAGE ERROR')

      return {
        ...state,
        loading: false,
        lastPage: 1
      }

    // -- Going to update page of a selected discovery --//
    case DiscoveriesConstants.SELECT_TO_UPDATE:
      console.log('REDUCER -> SELECT TO UPDATE')

      return {
        ...state,
        discoverySelected: action.payload
      }

    default:
      return state
  }
}

export default ManageDiscoveryReducer
