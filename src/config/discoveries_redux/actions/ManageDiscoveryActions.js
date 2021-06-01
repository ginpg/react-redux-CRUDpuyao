import DiscoveriesConstants from '../constants/DiscoveriesConstants'
import clienteAxios from '../../../configuracion_axios/axios'

export const axiosObject = {
  headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
}

// ------------ GET DISCOVERY INFO -----------------//
// State changers GET DISCOVERY INFO
const getDiscovery = () => ({
  type: DiscoveriesConstants.GET_DISCOVERY_DATA
})
const getDiscoverySuccess = discoveryList => ({
  type: DiscoveriesConstants.GET_DISCOVERY_DATA_SUCCESS,
  payload: discoveryList
})
const getDiscoveryError = () => ({
  type: DiscoveriesConstants.GET_DISCOVERY_DATA_ERROR
})

// Manager function
export function getDiscoveryList() {
  console.log('- Get Discovery List action- ')

  return async dispatch => {
    // Set state to loading
    dispatch(getDiscovery())
    // Make get call
    try {
      const response = await clienteAxios.get('api/discoveries', axiosObject)

      console.log('Response GET discovery LIST:->')
      console.log('discovery LIST:->', response.data)

      // Assign result of get to store
      dispatch(getDiscoverySuccess(response.data))
    } catch (error) {
      console.log('ERROR GET DISCOVERY LIST')
      console.log(error)
      dispatch(getDiscoveryError())
    }
  }
}

// ----------- --- NEW DISCOVERY ------- ----------- //
// State changers NEW DISCOVERY
const newDiscovery = () => ({
  type: DiscoveriesConstants.CREATE_DISCOVERY
})
const newDiscoverySuccess = discovery => ({
  type: DiscoveriesConstants.CREATE_DISCOVERY_SUCCESS,
  payload: discovery
})
const newDiscoveryError = () => ({
  type: DiscoveriesConstants.CREATE_DISCOVERY_ERROR
})

// Manager function
export function createNewDiscovery(discovery) {
  console.log('- Create new discovery action -')

  return async dispatch => {
    // Change state to loading
    dispatch(newDiscovery())
    // Make a post call to DB
    try {
      await clienteAxios.post('api/discoveries', discovery, axiosObject)

      // Add the new Discovery to discoveryList array in store
      dispatch(newDiscoverySuccess(discovery))
    } catch (error) {
      console.log('ERROR CREATING DISCOVERY')
      console.log(error.response.status)
      console.log(error.response.data.error)
      console.log(error.response.data.message)
      dispatch(newDiscoveryError())
    }
  }
}

// ------------------------ Update discoveries -----------------------------------//
export function UpdateAction(discovery, id, status, nota) {
  console.log('Data recibida en action  ' + discovery + ' ' + id + ' ' + status + ' ' + nota)
  const querystring = require('querystring')
  console.log(querystring.stringify({ newStatus: status, nota: nota }))
  const query = querystring.stringify({ newStatus: status, nota: nota })
  console.log(`/api/discoveries/${id}?${query}`)
  return async dispatch => {
    dispatch(UpdateDiscovery(discovery))
    try {
      await clienteAxios.put(`/api/discoveries/${id}?${query}`, discovery, axiosObject)
      dispatch(UpdateDiscoverySuccess(discovery))
    } catch (error) {
      console.log(error)
      dispatch(UpdateDiscoveryError())
    }
  }
}

// STATE changers for update
const UpdateDiscovery = discovery => ({
  type: DiscoveriesConstants.UPDATE_DISCOVERY,
  payload: discovery
})

const UpdateDiscoverySuccess = discovery => ({
  type: DiscoveriesConstants.UPDATE_DISCOVERY_SUCCESS,
  payload: discovery
})

const UpdateDiscoveryError = () => ({
  type: DiscoveriesConstants.UPDATE_DISCOVERY_ERROR,
  payload: true
})

// ------------------------ Cambiar status -----------------------------------//
export function cambiarStatusAction(id, status, nota) {
  console.log(id + ' ' + status + ' ' + nota)
  return async dispatch => {
    dispatch(cambiarStatus())
    try {
      //console.log(`/api/proyectos/changestatus/${id}/${status}`+' '+nota_to_send)
      await clienteAxios.post(`/api/discoveries/changestatus/${id}/${status}`, nota, axiosObject)

      dispatch(cambiarStatusSuccess(id))
    } catch (error) {
      dispatch(cambiarStatusError())
      console.log(error)
    }
  }
}

const cambiarStatus = () => ({
  type: DiscoveriesConstants.UPDATE_STATUS
})
const cambiarStatusSuccess = id => ({
  type: DiscoveriesConstants.UPDATE_STATUS_SUCCESS,
  payload: id
})
const cambiarStatusError = () => ({
  type: DiscoveriesConstants.UPDATE_STATUS_ERROR,
  payload: true
})

// State changers PAGINACION
const movePageState = () => ({
  type: DiscoveriesConstants.MOVE_PAGE
})
const movePageStateSuccess = actualPage => ({
  type: DiscoveriesConstants.MOVE_PAGE_SUCCESS,
  payload: actualPage
})
const movePageStateError = () => ({
  type: DiscoveriesConstants.MOVE_PAGE_ERROR,
  payload: 1
})

// Manager function
export function movePage(pageNumber, lastPage) {
  console.log(' - Moving Page Action - ')
  console.log('Moving to page: ', pageNumber)
  console.log('Last page value: ', lastPage)

  return async dispatch => {
    if (pageNumber > lastPage || pageNumber < 1) {
      // then its an error
      console.log('Error moving the page')
      dispatch(movePageStateError())
    } else {
      // Change state to loading
      dispatch(movePageState())

      // Change page in store
      dispatch(movePageStateSuccess(pageNumber))
    }
  }
}

// State changers PAGINACION GET LAS PAGE
const getLastPageState = () => ({
  type: DiscoveriesConstants.GET_LAST_PAGE
})
const getLastPageStateSuccess = lastPage => ({
  type: DiscoveriesConstants.GET_LAST_PAGE_SUCCESS,
  payload: lastPage
})
const getLastPageStateError = () => ({
  type: DiscoveriesConstants.GET_LAST_PAGE_ERROR
})

// Manager function
export function getLastPage(fromView) {
  console.log('- Get last page Action -')

  return async dispatch => {
    // Change state to loading
    dispatch(getLastPageState())

    try {
      const response = await clienteAxios.get(`api/discoveries/${fromView}/countpages`, axiosObject)

      console.log('Response GET last PAGE:->')
      console.log('last page response', response.data.pages)
      dispatch(getLastPageStateSuccess(response.data.pages))
    } catch (error) {
      console.log('ERROR GETTING LAST PAGE ! ')
      console.log(error.response)
      console.log(error.response.data.error)
      console.log(error.response.data.message)
      dispatch(getLastPageStateError())
    }
  }
}

// ---------- Going to update page ------------- //
// Manager function
export function goUpdatePage(discovery, history) {
  console.log('- Go to update page action -')

  console.log('Going to update Page with: ')
  console.log(discovery.id)
  console.log(discovery.nombre)

  history.push(`/gestion-operaciones/discoveries/edit/${discovery.id}`)

  return {
    type: DiscoveriesConstants.SELECT_TO_UPDATE,
    payload: discovery
  }
}
