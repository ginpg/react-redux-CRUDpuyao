// Cada reducer es como una pieza de la aplicacion (cliente, producto,...) y posee un state

import  {combineReducers}  from "redux";
import employeesReducer  from "./employeesReducer";
import prospectsReducer from "./prospectsReducer";
import disincorporatedReducer from './disincorporatedReducer';
import cargosReducer from './cargosReducer';
import dtosReducer from "./dtosReducer";
import activosReducer from './activosReducer'

export default combineReducers({
    employees: employeesReducer,
    prospects: prospectsReducer,
    disincorporated: disincorporatedReducer,
    cargos: cargosReducer,
    departamentos: dtosReducer,
    activos: activosReducer,
});