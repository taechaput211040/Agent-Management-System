export async function getDownlineMember(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/user/members/`, {
        params: {
          page: params.page,
          limit: params.limit,
          role: params.role,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
