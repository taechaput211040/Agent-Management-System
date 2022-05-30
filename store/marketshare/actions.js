// getall
export async function getMemberMarketShare(
  { commit },
  params = {
    page: undefined,
    limit: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get('/v1alpha/market-share/user/members', {
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

export async function getRevenueProviderByUser(
  { commit },
  params = {
    username: undefined,
    page: undefined,
    limit: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/v1alpha/market-share/revenue/providers/${params.username}`, {
        params: {
          page: params.page,
          limit: params.limit,
        },
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function updateMarketsharebyProvider(
  { commit },
  params = {
    code: undefined,
    username: undefined,
    percent: undefined,
    commission: undefined,
    option: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`/v1alpha/market-share/revenue/update`, {
        code: params.code,
        username: params.username,
        percent: params.percent,
        commission: params.commission,
        option: params.option,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
