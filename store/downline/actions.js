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

export async function depositCredit(
  { commit },
  params = {
    username: undefined,
    amount: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/v1alpha/credit/deposit/${params.username}`, {
        params: {
          amount: params.amount,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function withdrawCredit(
  { commit },
  params = {
    username: undefined,
    amount: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/v1alpha/credit/withdraw/${params.username}`, {
        params: {
          amount: params.amount,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
