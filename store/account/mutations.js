export function set_profile(state, payload) {
  state.profile = payload.profile
  localStorage.setItem('profile', JSON.stringify(payload.profile))
}
export function set_credit(state, payload) {
  state.credit = payload.data.amount
}

export function clear_account(state) {
  state.profile = null
  state.credit = null
}
