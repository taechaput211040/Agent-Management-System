export async function load_list(
  { commit },
  pagination = {
    page: 1,
    page_limit: 15
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = this.$axios.get("/api/v2/group", {
        params: {
          ...pagination
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function load_clone_template_list(
  { commit },
  pagination = {
    page: 1,
    page_limit: 15
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get("/api/v2/member-group", {
        params: {
          ...pagination
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function load_clone_by_member_id(
  { commit },
  id,
  params = {
    page: 1,
    page_limit: 15
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/api/v2/member-group/${id}`, {
        params: {
          ...params
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function clone({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/api/v2/member-group/${id}/clone`);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function load({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get("/api/v2/group/" + id);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function add({ commit }, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post("/api/v2/group", data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function update({ commit, rootState }, { id, data }) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = "/api/v2/group/" + id;
      if (rootState.auth.role > 2) {
        url += "/display";
      }
      let response = await this.$axios.put(url, data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function remove({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete("/api/v2/group/" + id);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function load_provider(
  { commit },
  {
    id,
    pagination = {
      page: 1,
      page_limit: 10
    }
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        "/api/v2/group/" + id + "/provider",
        {
          params: {
            ...pagination
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function add_provider({ commit }, { id, provider_id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/api/v2/group/${id}/provider`, {
        provider: provider_id
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function update_provider(
  { commit },
  { group_id, provider_id, data }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(
        `/api/v2/group/${group_id}/provider/${provider_id}`,
        {
          ...data
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function delete_provider({ commit }, { id, provider_id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/api/v2/group/${id}/provider/${provider_id}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function arrange_provider(
  { commit },
  { id, provider_id, position }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(
        `/api/v2/group/${id}/provider/${provider_id}/arrange`,
        {
          position
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function load_type(
  { commit },
  {
    id,
    pagination = {
      page: 1,
      page_limit: 10
    }
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get("/api/v2/group/" + id + "/type", {
        params: {
          ...pagination
        }
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function add_type({ commit }, { id, type_id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(`/api/v2/group/${id}/type`, {
        type: type_id
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function delete_type({ commit }, { id, type_id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/api/v2/group/${id}/type/${type_id}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
