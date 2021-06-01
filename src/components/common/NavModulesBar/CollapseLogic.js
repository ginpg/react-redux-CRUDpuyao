const initialBarState = {
  dash: false,
  gest: false,
  seg: false,
  com: false,
  ope: false,
  collapseShowdash: 'collapse',
  collapseShowgest: 'collapse',
  collapseShowseg: 'collapse',
  collapseShowcom: 'collapse',
  collapseShowope: 'collapse'
}

// Manage state to what module is open
function CollapseLogic(state, action) {
  switch (action.type) {
    case 'DASHBOARD':
      return {
        // This is for aria state
        dash: !state.dash,
        gest: false,
        seg: false,
        com: false,
        ope: false,
        //This is for content that is collapsed
        collapseShowdash: !state.dash ? 'collapse show' : 'collapse',
        collapseShowgest: 'collapse',
        collapseShowseg: 'collapse',
        collapseShowcom: 'collapse',
        collapseShowope: 'collapse'
      }
    case 'GESTION':
      return {
        // This is for aria state
        dash: false,
        gest: !state.gest,
        seg: false,
        com: false,
        ope: false,
        //This is for content that is collapsed
        collapseShowdash: 'collapse',
        collapseShowgest: !state.gest ? 'collapse show' : 'collapse',
        collapseShowseg: 'collapse',
        collapseShowcom: 'collapse',
        collapseShowope: 'collapse'
      }
    case 'SEGURIDAD':
      return {
        // This is for aria state
        dash: false,
        gest: false,
        seg: !state.seg,
        com: false,
        ope: false,
        //This is for content that is collapsed
        collapseShowdash: 'collapse',
        collapseShowgest: 'collapse',
        collapseShowseg: !state.seg ? 'collapse show' : 'collapse',
        collapseShowcom: 'collapse',
        collapseShowope: 'collapse'
      }
    case 'COMERCIAL':
      return {
        // This is for aria state
        dash: false,
        gest: false,
        seg: false,
        com: !state.com,
        ope: false,
        //This is for content that is collapsed
        collapseShowdash: 'collapse',
        collapseShowgest: 'collapse',
        collapseShowseg: 'collapse',
        collapseShowcom: !state.com ? 'collapse show' : 'collapse',
        collapseShowope: 'collapse'
      }
    case 'OPERACIONES':
      return {
        // This is for aria state
        dash: false,
        gest: false,
        seg: false,
        com: false,
        ope: !state.ope,
        //This is for content that is collapsed
        collapseShowdash: 'collapse',
        collapseShowgest: 'collapse',
        collapseShowseg: 'collapse',
        collapseShowcom: 'collapse',
        collapseShowope: !state.ope ? 'collapse show' : 'collapse'
      }
    default:
      console.log('None of the above')
      return
  }
}

export { initialBarState, CollapseLogic }
