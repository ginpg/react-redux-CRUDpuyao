import DiscoveriesConstants from '../constants/DiscoveriesConstants'

// Initial State
const initialState = {
  active_selected: true,
  pending_selected: false,
  canceled_selected: false
}

export const ViewSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case DiscoveriesConstants.ACTIVE_SELECTED:
      console.log('REDUCER -> ACTIVE SELECTED')
      return {
        ...state,
        active_selected: true,
        pending_selected: false,
        canceled_selected: false
      }
    case DiscoveriesConstants.PENDING_SELECTED:
      console.log('REDUCER -> PENDING SELECTED')
      return {
        ...state,
        active_selected: false,
        pending_selected: true,
        canceled_selected: false
      }
    case DiscoveriesConstants.CANCEL_SELECTED:
      console.log('REDUCER -> CANCEL SELECTED')
      return {
        ...state,
        active_selected: false,
        pending_selected: false,
        canceled_selected: true
      }
    default:
      return state
  }
}

export default ViewSelectedReducer
