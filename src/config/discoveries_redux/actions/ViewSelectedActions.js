import DiscoveriesConstants from '../constants/DiscoveriesConstants'

export function goActive(history) {
  console.log('Go Active')
  history.push(`/gestion-operaciones/discoveries/activos`)
  return {
    type: DiscoveriesConstants.ACTIVE_SELECTED
  }
}
export function goPending(history) {
  console.log('Go Pending')
  history.push(`/gestion-operaciones/discoveries/pendientes`)
  return {
    type: DiscoveriesConstants.PENDING_SELECTED
  }
}
export function goCanceled(history) {
  console.log('Go Canceled')
  history.push(`/gestion-operaciones/discoveries/cancelados`)
  return {
    type: DiscoveriesConstants.CANCEL_SELECTED
  }
}
