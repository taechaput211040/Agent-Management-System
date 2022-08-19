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

export function setPallete(state, payload) {
  for (const [key, v] of Object.entries(payload.palette)) {
    // console.log(key, v, 'jetmea')
    if (typeof v === 'object') {
      for (const [k, val] of Object.entries(v)) {
        for (const [valIn, valpay] of Object.entries(val)) {
          if (valpay.type == 'color') {
            document.documentElement.style.setProperty(`--${key}_${k}_${valIn}`, valpay.value)
            console.log(`--${key}_${k}_${valIn}`)
          } else if (valpay.type == 'linear') {
            document.documentElement.style.setProperty(`--${key}_${val.name}`, valpay.value)
          } else if (valpay.type == 'image') {
            document.documentElement.style.setProperty(`--${key}_${val.name}`, `url(${valpay.value})`)
          }
        }
      }
    }
  }
  state.webPalette = payload
  console.log('set_success')
  // localStorage.setItem('presetPallete', JSON.stringify(payload))
}
