export async function getAllByDashboard(
  { commit, state },
  params = {
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/report-transaction/', {
        params: {
          ...params,
        },
      })
      commit('set_dataDashboard', response)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getAllReport(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: 'undefined',
    end: 'undefined',
    provider: undefined,
    typeCode: undefined,
    isStaff: false,
  }
) {
  return new Promise(async (resolve, reject) => {
    let url = ''
    if (params.isStaff) {
      url = '/v1alpha/report-transaction/'
    } else {
      url = '/v1alpha/report-transaction/owner'
    }
    try {
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getOwnerByIdV2(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    let url = ''
    if (params.role == 2) {
      url = `/v1alpha/report-transaction/owner`
    } else {
      url = `/v1alpha/report-transaction/owner/${params.id}`
    }
    try {
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getSharebyOwner(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role == 3) {
        url = `/v1alpha/report-transaction/share/`
      } else {
        url = `/v1alpha/report-transaction/owner/${params.id}/share/`
      }
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getSeniorByShare(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    senior_user: undefined,
    role: undefined,
    username: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role == 3) {
        url = `/v1alpha/report-transaction/share/${params.senior_user}/senior`
      } else if (params.role <= 2) {
        url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/senior`
      } else if (params.role == 4) {
        url = `/v1alpha/report-transaction/senior`
      }
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          username: params.username,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getAgentByShare(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    senior_user: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role == 3 && params.senior_user && !params.id) {
        url = `/v1alpha/report-transaction/share/${params.senior_user}/agent`
      } else if (params.role == 4 || params.role == 5) {
        url = `/v1alpha/report-transaction/agent`
      } else {
        url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/agent`
      }

      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getUserByAgent(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    senior_user: undefined,
    agent_user: undefined,
    role: undefined,
    username: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role <= 2) {
        if (params.id && params.senior_user && params.agent_user) {
          url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/agent/${params.agent_user}`
        }
      } else if (params.role == 3) {
        if (params.senior_user && params.agent_user) {
          url = `/v1alpha/report-transaction/share/${params.senior_user}/agent/${params.agent_user}`
        }
      } else if (params.role == 4) {
        if (params.agent_user) {
          url = `/v1alpha/report-transaction/agent/${params.agent_user}`
        }
      } else if (params.role == 5) {
        url = `/v1alpha/report-transaction/agent/${params.agent_user}`
      }
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
          username: params.username,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getRoundBySenior(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    senior_user: undefined,
    username: undefined,
    agent_user: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role <= 2) {
        if (params.senior_user && !params.agent_user) {
          url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/senior/${params.username}/round`
        } else if (params.agent_user && params.senior_user) {
          url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/agent/${params.agent_user}/round/${params.username}`
        }
      }
      if (params.role == 3) {
        if (params.senior_user && params.username && !params.agent_user) {
          url = `/v1alpha/report-transaction/share/${params.senior_user}/senior/${params.username}/round`
        } else {
          url = `/v1alpha/report-transaction/share/${params.senior_user}/agent/${params.agent_user}/round/${params.username}`
        }
      }
      if (params.role == 4 || params.role == 5) {
        if (params.senior_user && params.username && !params.agent_user) {
          url = `/v1alpha/report-transaction/senior/${params.username}/round`
        } else {
          url = `/v1alpha/report-transaction/agent/${params.agent_user}/round/${params.username}`
        }
      } else if (params.role == 6) {
        url = `/v1alpha/report-transaction/user/${localStorage.getItem('username')}/round`
      }
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getTransactionByRound(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
    start: undefined,
    end: undefined,
    provider: undefined,
    typeCode: undefined,
    id: undefined,
    search: undefined,
    senior_user: undefined,
    agent_user: undefined,
    username: undefined,
    roundId: undefined,
    role: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ''
      if (params.role <= 2) {
        if (!params.agent_user) {
          url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/senior/${params.username}/round/${params.roundId}`
        } else {
          url = `/v1alpha/report-transaction/owner/${params.id}/share/${params.senior_user}/agent/${params.agent_user}/round/${params.username}/transaction/${params.roundId}`
        }
      }
      if (params.role == 3) {
        if (!params.agent_user) {
          url = `/v1alpha/report-transaction/share/${params.senior_user}/senior/${params.username}/round/${params.roundId}`
        } else {
          url = `/v1alpha/report-transaction/share/${params.senior_user}/agent/${params.agent_user}/round/${params.username}/transaction/${params.roundId}`
        }
      }
      if (params.role == 4 || params.role == 5) {
        if (!params.agent_user) {
          url = `/v1alpha/report-transaction/senior/${params.username}/round/${params.roundId}`
        } else {
          url = `/v1alpha/report-transaction/agent/${params.agent_user}/round/${params.username}/transaction/${params.roundId}`
        }
      }
      let response = await this.$axios.get(url, {
        params: {
          page: params.page,
          limit: params.limit,
          start: params.start,
          end: params.end,
          provider: params.provider,
          typeCode: params.typeCode,
          search: params.search,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function getProviderReport(
  { commit, state },
  params = {
    start: undefined,
    end: undefined,
    limit: undefined,
    page: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/report-transaction/provider/', {
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
