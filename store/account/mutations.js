export function set_profile(state, payload) {
  state.profile = payload
}
export function set_credit(state, payload) {
  state.credit = payload.data.amount
}
