export async function load({ commit }, params = { isEnable: true }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/provider/', {
        params: {
          ...params,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
