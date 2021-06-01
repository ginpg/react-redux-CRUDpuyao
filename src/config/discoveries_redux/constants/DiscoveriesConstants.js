import keyMirror from 'keymirror'

export default keyMirror({
  // Pestaña activa y redireccion
  ACTIVE_SELECTED: null,
  PENDING_SELECTED: null,
  CANCEL_SELECTED: null,

  // Creacion de un discovery
  CREATE_DISCOVERY: null,
  CREATE_DISCOVERY_SUCCESS: null,
  CREATE_DISCOVERY_ERROR: null,

  // Update de un discovery
  UPDATE_DISCOVERY: null,
  UPDATE_DISCOVERY_SUCCESS: null,
  UPDATE_DISCOVERY_ERROR: null,

  // Update status de discovery
  UPDATE_STATUS: null,
  UPDATE_STATUS_SUCESS: null,
  UPDATE_STATUS_ERROR: null,

  // Get discovery data
  GET_DISCOVERY_DATA: null,
  GET_DISCOVERY_DATA_SUCCESS: null,
  GET_DISCOVERY_DATA_ERROR: null,

  // Move beetween pages
  MOVE_PAGE: null,
  MOVE_PAGE_SUCCESS: null,
  MOVE_PAGE_ERROR: null,

  GET_LAST_PAGE: null,
  GET_LAST_PAGE_SUCCESS: null,
  GET_LAST_PAGE_ERROR: null,

  // Select a discovery to update
  SELECT_TO_UPDATE: null
})
