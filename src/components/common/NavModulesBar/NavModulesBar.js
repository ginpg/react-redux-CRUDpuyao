import React, { useReducer, useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'

// useReducer to display or collapse items inside navbar
import { initialBarState, CollapseLogic } from './CollapseLogic'
import DisplayConstant from './DisplayConstant'

// Buttons of the nav bar
import ButtonDashboard from './buttons/ButtonDashboard'
import ButtonGestion from './buttons/ButtonGestion'
import ButtonSeguridad from './buttons/ButtonSeguridad'
import ButtonComercial from './buttons/ButtonComercial'
import ButtonOperaciones from './buttons/ButtonOperaciones'

import './NavModulesBar.css'

import { PermisosUsuarios } from '../../../testData/permisos'

// Used to format data to a array
function permisosFormarter(data) {
  const dataformated = data.map(object => object.idSubModulo)
  return dataformated
}

const NavModulesBar = () => {
  const [state, dispatch] = useReducer(CollapseLogic, initialBarState)

  // This array is going to be formated
  const [permisosArray, setPermisosArray] = useState([])

  useEffect(() => {
    // Make a get request to fetch data about permits

    // Format the data
    const dataformated = permisosFormarter(PermisosUsuarios)

    // Set the data
    setPermisosArray(dataformated)
  }, [])

  return (
    <>
      <Nav className="flex-column  p-3 bg-white sidebar">
        <ButtonDashboard
          ariaState={state.dash}
          collapseState={state.collapseShowdash}
          collapseDispatch={() => dispatch({ type: DisplayConstant.DASHBOARD })}
          showModule={permisosArray}
        />

        <ButtonGestion
          ariaState={state.gest}
          collapseState={state.collapseShowgest}
          collapseDispatch={() => dispatch({ type: DisplayConstant.GESTION })}
          showModule={permisosArray}
        />

        <ButtonComercial
          ariaState={state.com}
          collapseState={state.collapseShowcom}
          collapseDispatch={() => dispatch({ type: DisplayConstant.COMERCIAL })}
          showModule={permisosArray}
        />

        <ButtonOperaciones
          ariaState={state.ope}
          collapseState={state.collapseShowope}
          collapseDispatch={() => dispatch({ type: DisplayConstant.OPERACIONES })}
          showModule={permisosArray}
        />

        <ButtonSeguridad
          ariaState={state.seg}
          collapseState={state.collapseShowseg}
          collapseDispatch={() => dispatch({ type: DisplayConstant.SEGURIDAD })}
          showModule={permisosArray}
        />
      </Nav>
    </>
  )
}
export default NavModulesBar
