export function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post("/v1alpha/auth/login", {
        username,
        password
      });
      context.commit("set_login", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}


export function logout(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        "/api/v1/authenticate/logout",
        data
      );
      context.commit("set_logout", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function changePassword(context, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        "/api/v1/authenticate/reset-password",
        data
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
