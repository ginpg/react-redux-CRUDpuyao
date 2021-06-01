//-- Import all reducers
import authenticationReducer from './authenticationReducer'

import employeesReducer from '../../../g-redux/reducers/employeesReducer'
import prospectsReducer from '../../../g-redux/reducers/prospectsReducer'
import disincorporatedReducer from '../../../g-redux/reducers/disincorporatedReducer'
import cargosReducer from '../../../g-redux/reducers/cargosReducer'
import dtosReducer from '../../../g-redux/reducers/dtosReducer'

// Reducers for Discoveries
import ViewSelectedReducer from '../../discoveries_redux/reducers/ViewSelectedReducer'
//import UpdateReducer from '../../discoveries_redux/reducers/UpdateReducer'
import ManageDiscoveryReducer from '../../discoveries_redux/reducers/ManageDiscoveryReducer'

//-- Combine reducers
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import activosReducer from 'g-redux/reducers/activosReducer'
import pausadosReducer from 'g-redux/reducers/pausadosReducer'
import canceladosReducer from 'g-redux/reducers/canceladosReducer'


//console.log('index/reducer')

export default history =>
  combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,

    // Gestion empleados
    employees: employeesReducer,
    prospects: prospectsReducer,
    disincorporated: disincorporatedReducer,
    cargos: cargosReducer,
    departamentos: dtosReducer,

    // Discoveries
    viewSelected: ViewSelectedReducer,
    manageDiscovery: ManageDiscoveryReducer,

    // Proyectos
    activos: activosReducer,
    pausados: pausadosReducer,
    cancelados: canceladosReducer
  })
