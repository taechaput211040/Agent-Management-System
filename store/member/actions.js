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
      let response = await this.$axios.get(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/SubScribe/${params.company}/${params.agent}?page=${params.page}&take=${params.take}`
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
    try {
      let response = await this.$axios.get(
        `/v1alpha/credit-tranfer/balance/${username}`
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

export async function depositCredit({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`/v1alpha/credit-tranfer/deposit/`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function withdrawCredit({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(`/v1alpha/credit-tranfer/withdraw/`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


export async function searchByUsername({ commit }, param) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/Search/${param.company}/${param.agent}/${param.username}`
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
export async function lockstatus({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(`https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/Status`, body)
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

export async function changePasswordByuser({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://all-member-ehhif4jpyq-as.a.run.app/api/Member/Agent/Password`,
        body
      )
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}
