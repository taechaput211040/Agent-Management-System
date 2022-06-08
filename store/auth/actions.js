export function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post('/v1alpha/auth/login', {
        username,
        password,
      })
      context.commit('set_login', response.data)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export function logout(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post('/api/v1/authenticate/logout', data)
      context.commit('set_logout', response.data)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export function change_password(context, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put('/v1alpha/user/reset-password/', {
        password: data,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
