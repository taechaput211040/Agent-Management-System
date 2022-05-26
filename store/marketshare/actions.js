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
