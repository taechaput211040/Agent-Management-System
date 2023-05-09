export function set_dataDashboard(state, payload) {
  state.dashboardData = payload.data
}

export function setdata_logout(state) {
  state.dashboardData = null
}
