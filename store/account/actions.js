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
export async function get_profile(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/user/profile/')
      context.commit('set_profile', response.data.result)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function get_creditBalance({ commit, state }) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.get('/v1alpha/credit/balance')
      commit('set_credit', data)
      resolve(data)
    } catch (error) {
      reject(error)
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
export async function createGroups({ commit }, payout) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.patch(`/v1alpha/user/members/${payout.username}/group`, {
        groups: payout.groups,
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export async function deleteSubaccount({ commit }, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.delete(`/v1alpha/user/sub-account/${username}/remove`)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
export async function editGroups({ commit }, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.get(`/v1alpha/user/members/${username}`)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export async function subaccontList(
  { commit },
  params = {
    search: undefined,
    limit: undefined,
    page: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.get('/v1alpha/user/sub-account/', {
        params: {
          search: params.search,
          limit: params.limit,
          page: params.page,
        },
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export async function checkPrefixAgent(
  { commit },
  params = {
    search: undefined,
    limit: undefined,
    page: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.get('/v1alpha/user/prefix/agent', {
        params: {
          search: params.search,
          limit: params.limit,
          page: params.page,
        },
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}
export async function checkPrefixOwner(
  { commit },
  params = {
    search: undefined,
    limit: undefined,
    page: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await this.$axios.get('/v1alpha/user/prefix/owner', {
        params: {
          search: params.search,
          limit: params.limit,
          page: params.page,
        },
      })
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getPalletePreset({ commit, state, rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(`https://static-template-api-qlws7pv5wa-as.a.run.app/css/preset/agent`)
      commit('setPallete', data)
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export function updatePalette(
  { commit },
  params = {
    web_id: undefined,
    presetId: undefined,
    detail: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://static-template-api-qlws7pv5wa-as.a.run.app/css/preset/agent/${params.web_id}/${params.presetId}`,
        {
          palette: params.detail,
        }
      )
      commit('setPallete', response.data)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export function CreateOrganizePalette({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://static-template-api-qlws7pv5wa-as.a.run.app/css/organization/agent`,
        body
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export function CreatePreset(
  { commit },
  params = {
    id: undefined,
    detail: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://static-template-api-qlws7pv5wa-as.a.run.app/css/preset/agent/${params.id}`,
        {
          palette: params.detail,
        }
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
