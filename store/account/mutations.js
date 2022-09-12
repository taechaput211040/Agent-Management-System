export function set_profile(state, payload) {
  state.profile = payload.profile
  state.isClone = payload.profile.isClone
  state.groups = payload.profile.groups
  localStorage.setItem('profile', JSON.stringify(payload.profile))
}
export function set_credit(state, payload) {
  state.credit = payload.data.amount
}

export function clear_account(state) {
  state.profile = null
  state.credit = null
}

export function setPallete(state, payload) {
  for (const [key, v] of Object.entries(payload.palette)) {
    // console.log(key, v, 'jetmea')
    if (typeof v === 'object') {
      for (const [k, val] of Object.entries(v)) {
        for (const [valIn, valpay] of Object.entries(val)) {
          if (valpay.type == 'color') {
            document.documentElement.style.setProperty(`--${key}_${k}_${valIn}`, valpay.value)
          } else if (valpay.type == 'linear') {
            document.documentElement.style.setProperty(`--${key}_${k}_${valIn}`, valpay.value)
          } else if (valpay.type == 'image') {
            document.documentElement.style.setProperty(`--${key}_${k}_${valIn}`, `url(${valpay.value})`)
          }
        }
      }
    }
  }
  state.webPalette = payload

  // localStorage.setItem('presetPallete', JSON.stringify(payload))
}
