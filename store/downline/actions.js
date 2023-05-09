export async function getDownlineMember(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    role: undefined,
    search: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/user/members/`, {
        params: {
          page: params.page,
          limit: params.limit,
          role: params.role,
          search: params.search,
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
        amount: params.amount,
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
        amount: params.amount,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function checkCreditByuser({ commit }, targetUser) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/credit/balance/${targetUser}`)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getDownlineMemberByUser(
  { commit },
  params = {
    username: undefined,
    page: undefined,
    limit: undefined,
    role: undefined,
    search: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/user/members/${params.username}/down-line`, {
        params: {
          page: params.page,
          limit: params.limit,
          role: params.role,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getHistoryCredit(
  { commit },
  params = {
    username: undefined,
    page: undefined,
    limit: undefined,
    type: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/credit/history/${params.username}`, {
        params: {
          page: params.page,
          limit: params.limit,
          type: params.type,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function changePasswordByuser({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/v1alpha/user/members/${body.username}/reset-password`, {
        password: body.password,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function configSystem({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://all-setting-qlws7pv5wa-as.a.run.app/api/Setting/createSettingAndToken`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
