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
