export async function getMemberList(
  { commit },
  params = {
    company: undefined,
    agent: undefined,
    page: 1,
    take: 15,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(params, 'params')
      let response = await this.$axios.get(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/${params.company}/${params.agent}?page=${params.page}&take=${params.take}`
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function createMember({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function editMember({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function creditBalance({ commit }, username) {
  return new Promise(async (resolve, reject) => {
    console.log(username)
    try {
      let response = await this.$axios.get(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/Credit/${username}`
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function topUpCredit({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/deposit`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function searchByUsername({ commit }, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/Search/${username}`
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
