export async function getProvider({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/provider/')
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function get_profile({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.profile) {
      try {
        let response = await this.$axios.get('/v1alpha/user/profile/')
        console.log(response, 'res')
        commit('set_profile', response.data.result)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    }
  })
}

export async function get_creditBalance({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    if (!state.credit) {
      try {
        let data = await this.$axios.get('/v1alpha/credit/balance')
        commit('set_credit', data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
  })
}

export async function create_SubAccont({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.post('/v1alpha/user/register', body)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
